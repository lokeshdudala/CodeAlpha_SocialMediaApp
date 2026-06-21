const express = require('express');
const { getProfile, followUser } = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.use(authMiddleware);
router.get('/:id?', getProfile);
router.put('/:id/follow', followUser);

module.exports = router;
