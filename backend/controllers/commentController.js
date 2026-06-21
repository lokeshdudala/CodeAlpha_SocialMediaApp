const Comment = require("../models/Comment");

const createComment = async (req, res) => {

    try {

        const { post, user, text } = req.body;

        const comment = await Comment.create({
            post,
            user,
            text
        });

        res.status(201).json({
            message: "Comment Added",
            comment
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getComments = async (req, res) => {

    try {

        const comments = await Comment.find({
            post: req.params.postId
        })
        .populate("user", "name")
        .sort({ createdAt: -1 });

        res.status(200).json(comments);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    createComment,
    getComments
};