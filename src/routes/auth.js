const router = require('express').Router();
const {authorize_user,create_new_user,deauthorize_user} = require('../controllers/auth')
const upload = require("../middleware/upload");
const {verifyToken,verifRole} = require('../middleware/verifyToken');
require('dotenv').config();
const User = require('../models/user')

router.post('/auth',authorize_user)
router.post('/new',create_new_user)
router.post('/deauth',verifyToken,deauthorize_user)

router.delete("/delete/many",(req,res)=>{
    console.log("here");
    try{
    console.log(req.body);
    User.deleteMany({
        _id:{
            $in:req.body.ids
        }},
        function(err,result){
            if(err) res.status(404).json({message:"Unable to delete!"})
            else{
                res.status(200).json(result);
            }
        }
    )
    }
    catch(err){
        res.status(404).json({message:"unable to delete or get ids"});
    }
})


module.exports = router;
