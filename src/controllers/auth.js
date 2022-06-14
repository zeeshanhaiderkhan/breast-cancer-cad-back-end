const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user')
const saltRounds = 10;





function authorize_user(req,res){

    console.log(req.body);
    User.findOne({email:req.body.email},function(err,data){
        if(data != null){
            bcrypt.compare(req.body.password,data.password,function(err,isMatch){
                if(err){
                    res.status(304).json({message:"Error password validation!"})
                }
                else if(!isMatch){
                    res.status(304).json({message:"Password doesn't match!"})
                }
                else{
                    jwt.sign({data},process.env.JWT_SECRET,(err,token)=>{
                        res.cookie('token', token, {
                            expires: new Date(Date.now() + '1d'), // time until expiration
                            secure: false, // set to true if you're using https
                            httpOnly: true,
                          });
                        
                
                        return res.json({
                           data
                        })
                    })
                }
            })
            
        }
        else if(err){
            return reset.status(404).json({message:"Error Finding User!"});
        }
        else{
            console.log("User Not Found!");
            res.status(404).json({message:"User Not Found!"});
        }
    })
    
}

function create_new_user(req,res){
    
    User.findOne({email:req.body.email},function(err,data){
        if(data!=null){
            res.status(304).json({message:"User with email: "+req.body.email+" already exists"})
        }
        else{
          bcrypt.genSalt(saltRounds,function(saltError,salt){
              if(saltError){
                  res.status(304).json({message:"Error while Salting!"})
              }
              else{
                  bcrypt.hash(req.body.password,salt,function(hashError,hash){
                    if(hashError){
                        res.status(304).json({message:"Error while Hashing!"});
                        
                    }
                    else{
                        req.body.password=hash;
                        User.create(req.body).then(
                            (data)=>{
                                 res.status(200).json(data)
                            }
                        )
                    }
                  })
              }
          })
        }
    })
}

function deauthorize_user(req,res){
    res.status(202).clearCookie('token').send('cookie cleared');
}

module.exports = {authorize_user,create_new_user,deauthorize_user}