const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
dotenv.config();

const SECRET = process.env.JWT_SECRET

const userAuth = async (req, res, next) => {
    const token = req.cookies.token;
    console.log("TOKEN IS", token)
  
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }
  
    try {
      const decoded = jwt.verify(token, SECRET);
      req.userId = decoded.userId; 
      next();
    } catch (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
  };

module.exports = {userAuth}