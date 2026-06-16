const express = require('express');
const router = express.Router();

const authController = require('./auth.controller');
const authMiddleware = require('../../middleware/auth.middleware');

router.post('/register', (req, res) => authController.register(req, res));
router.post('/login', (req, res) => authController.login(req, res));



router.get('/me', authMiddleware, (req, res) => {
    return res.json({
      success: true,
      user: req.user,
    });
  });

module.exports = router;