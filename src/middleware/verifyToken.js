const jwt = require('jsonwebtoken');
require('dotenv').config();


const verifyToken = async (req, res, next) => {
    console.log(req.cookies)
    const token = req.cookies.token || '';
    console.log(token);
    try {
      if (!token) {
        return res.status(401).json('You need to Login')
      }
      try{
        const decrypt = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            user: decrypt.user,
        };
        console.log(decrypt.user);
        next();
      }
      catch(err){
        return res.status(401).json('Invalid Token! You need to Login.')
      }
      
    } catch (err) {
      return res.status(500).json(err.toString());
    }
  };


module.exports = verifyToken;