const router = require('express').Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/verifyToken').verifyToken;
var path =require('path');

router.get('/:pid/:fid',verifyToken,function(req,res){
    if(req.user._id == req.params.pid){
        var options = {
            root: path.join('uploads')
        };
        var fileName = 'FastingOnTheDayOfAshura.pdf';
        try{
        res.sendFile(fileName, options, function (err) {
            if (err) {
               // console.log(err);
                res.status(304).json({message:"file not found!"})
            } else {
                console.log('Sent:', fileName);
                //next();
            }
        });
        }
        catch(err){
            res.status(304).json({message:"File not found!"});
        }   
    }
    
    else res.status(304);
    
})

module.exports = router;