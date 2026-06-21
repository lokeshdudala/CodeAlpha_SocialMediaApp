const Post = require("../models/Post");

const createPost = async (req, res) => {

    try {

        const { user, content } = req.body;

        const post = await Post.create({
            user,
            content
        });

        res.status(201).json({
            message: "Post Created Successfully",
            post
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getPosts = async (req, res) => {

    try {

        const posts = await Post.find()
            .populate("user", "name")
            .sort({ createdAt: -1 });

        res.status(200).json(posts);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const likePost = async (req, res) => {

    try {

        const { postId, userId } = req.body;

        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({
                message: "Post Not Found"
            });
        }

        const alreadyLiked =
            post.likes.includes(userId);

        if (alreadyLiked) {

            post.likes =
                post.likes.filter(
                    id => id.toString() !== userId
                );

        } else {

            post.likes.push(userId);
        }

        await post.save();

        res.status(200).json({
            message: alreadyLiked
                ? "Post Unliked"
                : "Post Liked"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createPost,
    getPosts,
    likePost
};