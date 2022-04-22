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


//role is given as array
//this function will verify token and then it will verify role -- a 2in1 combo function
  const verifyRole = role=> { return ((req,res,next)=>{
    try{
        
        let token = req.cookies.token || '';
        if (!token) {
            return res.status(304).send("A token is required for authentication");
          }
          var decoded;
          try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("DECODED: "+decoded.data.role);
          
            
          } catch (err) {
            return res.status(401).send("Invalid Token");
          }
         
          if(role.includes(decoded.data.role)){
            //req.userData = decoded;
            next();
          }else{
              return res.status(304).send("Not authorized role!");
          }
      
        
    }catch(er){
        console.log("here error here")
        return res.status(401).json({"message": "Not authorized"});
    }
})}

module.exports = {verifyToken,verifyRole};