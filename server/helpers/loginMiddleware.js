const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET;

function loginMiddleware(req, res, next) {
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, jwtSecret);
            req.userId = decoded.userId;
            res.locals.isAuthentified = true;
        } catch (error) {
            res.locals.isAuthentified = false;
        }
    } else {
        res.locals.isAuthentified = false;
    }
    next();
}

module.exports = loginMiddleware;