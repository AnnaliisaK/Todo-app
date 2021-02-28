const jwt = require('jsonwebtoken');
const { getUserById } = require('../../models');

const verifyTokenAndUser = async (req, res, next) => {
  const token = req.cookies['jwt_token'];
  let isAuthenticated = false;
  let authFailedMessage = 'Authentication failed, please log in!';

  try {
    if (token) {
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
      const { userId } = decodedToken;
      const user = await getUserById(userId);
      if (user) {
        req.user = user;
        isAuthenticated = true;
      }
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      authFailedMessage = 'Session has expired, please log in!';
    }
    authFailedMessage = error.message;
  }
  next();
};

module.exports = verifyTokenAndUser;