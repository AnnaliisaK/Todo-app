const jwt = require('jsonwebtoken');

const whitelistedRoutes = [
    '/',
    '/api/login',
    '/login.html',
    '/css/style.css',
    '/js/index.js',
    '/register.html',
    '/api/register',
    '/main.html'

]

const JWT_SECRET = 'saswqi9x#¤&""/Lödoad'

module.exports =  function(req, res, next) {
    if (!whitelistedRoutes.includes(req._parsedUrl.pathname)) {
        const token = req.session.token;
        if (!token) return res.status(401).send('Access Denied');

        try {
            const verified = jwt.verify(token, JWT_SECRET);
            req.user = verified;
            next();
        } catch (err) {
            res.status(400).send('Invalid token');
        }
    } else {
        next();
    }
    
};