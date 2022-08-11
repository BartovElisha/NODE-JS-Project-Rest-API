const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {

  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  } 
 
  try {
    const decoded = jwt.verify(token, process.env.JWT_PASSWORD);
    if(!decoded || !decoded.id || !decoded.biz) {   
        return res.status(401).send('Token is invalid or expired.') };
        req.uid = decoded.id;
        req.biz = decoded.biz;
        next();
  }
  catch (error) {
    res.status(400).send('Invalid token.');
  }
}