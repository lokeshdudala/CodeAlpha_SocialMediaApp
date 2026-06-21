const User = require('../models/User');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.params.id || req.user._id)
      .select('-password')
      .populate('followers', 'username avatarUrl')
      .populate('following', 'username avatarUrl');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.followUser = async (req, res) => {
  try {
    const targetUser = await User.findById(req.params.id);
    if (!targetUser) return res.status(404).json({ message: 'User not found' });
    if (targetUser._id.equals(req.user._id)) return res.status(400).json({ message: 'Cannot follow yourself' });

    const isFollowing = targetUser.followers.includes(req.user._id);
    if (isFollowing) {
      targetUser.followers.pull(req.user._id);
      req.user.following.pull(targetUser._id);
    } else {
      targetUser.followers.push(req.user._id);
      req.user.following.push(targetUser._id);
    }

    await targetUser.save();
    await req.user.save();

    res.json({ following: !isFollowing });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
