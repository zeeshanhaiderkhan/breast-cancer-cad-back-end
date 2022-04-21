const router = require('express').Router();
const {authorize_user,create_new_user,deauthorize_user} = require('../controllers/auth')

require('dotenv').config();

router.post('/auth',authorize_user)
router.post('/new',create_new_user)
router.post('/deauth',deauthorize_user)
   

/*
//TESTING MIDDLEWARE FOR AUTHORIZATION
router.get('/',verifyToken,function(req,res){
    jwt.verify(req.cookies.token,process.env.JWT_SECRET,(err,authData)=>{
        if(err) {
            res.sendStatus(403);
        }
        else{
            res.json({
                message:'Post Created...',
                authData,
                
            });
        }
    })
})
*/

module.exports = router;
