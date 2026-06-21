const express = require("express");

const {
    registerUser,
    loginUser,
    getUserById,
    getAllUsers,
    followUser,
    updateProfile
} = require("../controllers/authController");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.post("/follow", followUser);

router.get("/users", getAllUsers);

router.get("/user/:id", getUserById);

router.put("/user/:id", updateProfile);

module.exports = router;