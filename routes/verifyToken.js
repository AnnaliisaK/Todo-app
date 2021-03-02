const jwt = require('jsonwebtoken');

const whitelistedRoutes = [
  '/',
  '/api/login',
  '/login.html',
  '/css/style.css',
  '/js/index.js',
  '/register.html',
  '/api/register',
  '/main.html',
];

module.exports = function (req, res, next) {
  if (whitelistedRoutes.includes(req._parsedUrl.pathname)) {
    next();
  } else {
    const token = req.session.token;
    if (!token) return res.status(401).send('Access Denied');

    try {
      req.user = jwt.verify(token, process.env.JWT_SECRET);
      next();
    } catch (err) {
      res.status(400).send('Invalid token');
    }
  }
};
