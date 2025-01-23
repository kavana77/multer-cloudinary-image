import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
function generateToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET);
}

const payload = { lesson: 'cloudinaryUpload' };
const token = generateToken(payload);
console.log('Generated Token:', token);

const authenticateJWT = (req, res, next) => {
    const token = req.header("Authorization").split(' ')[1]
  
    if (!token) {
      return res.status(403).json({ message: "No token provided, authorization denied." });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
     
    } catch (error) {
      return res.status(401).json({ message: "Invalid token, authorization denied." });
    }
  };
  

export default authenticateJWT;
