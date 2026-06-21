const express = require("express");

const {
    createPost,
    getPosts,
    likePost
} = require("../controllers/postController");

const router = express.Router();

router.post("/", createPost);

router.get("/", getPosts);

router.post("/like", likePost);

module.exports = router;