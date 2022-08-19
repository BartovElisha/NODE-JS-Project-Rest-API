const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if(!token) {
        return res.status(401).send('Access denied. No token provided.');
    } 
 
    try {
        const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
        if (!decoded || !("id" in decoded) || !("biz" in decoded)) {
            console.log(decoded);
            return res.status(401).send('Token is invalid or expired.'); 
        }
        req.uid = decoded.id;
        req.biz = decoded.biz;
        req.admin = decoded.admin;
        next();
    }
    catch (error) {
        res.status(400).send('Invalid token.');
    }
}