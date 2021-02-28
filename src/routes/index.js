const express = require('express');

const verifyTokenAndUser = require('../middleware/verifyToken');

const {
  renderIndexPage,
  renderLoginPage,
  userLogin,
  renderRegistrationPage,
  registerUser,
  logout,
  renderDashboardPage,
} = require('../src/controllers');

const router = express.Router();

router.get('/', verifyTokenAndUser, renderIndexPage);

router.get('/login', verifyTokenAndUser, renderLoginPage);
router.post('/login', userLogin);

router.get('/register', verifyTokenAndUser, renderRegistrationPage);
router.post('/register', registerUser);

router.get('/dashboard', verifyTokenAndUser, renderDashboardPage);

router.get('/logout', logout);

module.exports = router;