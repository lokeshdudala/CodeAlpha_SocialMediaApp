const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            message: "Registration Successful",
            userId: user._id
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const isMatch =
            await bcrypt.compare(
                password,
                user.password
            );

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid Email or Password"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        res.status(200).json({
            token,
            userId: user._id,
            name: user.name,
            email: user.email,
            message: "Login Successful"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getUserById = async (req, res) => {

    try {

        const user =
            await User.findById(req.params.id)
            .select("-password");

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        res.status(200).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};
const getAllUsers = async (req, res) => {

    try {

        const users =
            await User.find()
            .select("-password");

        res.status(200).json(users);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};
const followUser = async (req, res) => {

    try {

        const { currentUserId, targetUserId } =
            req.body;

        const currentUser =
            await User.findById(currentUserId);

        const targetUser =
            await User.findById(targetUserId);

        if (!currentUser || !targetUser) {
            return res.status(404).json({
                message: "User Not Found"
            });
        }

        if (
            !currentUser.following.includes(
                targetUserId
            )
        ) {

            currentUser.following.push(
                targetUserId
            );

            targetUser.followers.push(
                currentUserId
            );

            await currentUser.save();

            await targetUser.save();
        }

        res.status(200).json({
            message: "User Followed"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {

    try {

        const { name, bio, profilePic } =
            req.body;

        const user =
            await User.findByIdAndUpdate(
                req.params.id,
                {
                    name,
                    bio,
                    profilePic
                },
                { new: true }
            );

        res.status(200).json({
            message: "Profile Updated",
            user
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};
module.exports = {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers,
    followUser,
    updateProfile
};