const Report = require('../models/feedback');
const upload = require('../middleware/upload')
const router = require('express').Router();
const mongoose = require('mongoose')
var path =require('path');
const fs= require('fs');
var FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

//for file upload
router.post('/',(req,res)=>{
   try{
       console.log(req.body)
    Report.create(req.body).then(
        (data)=>{
             res.status(200).json(data)
        }
    )
}
 catch(err){
     res.status(404).json({message:'Feeback not created!'})
 }
      
})

//all feedbacks received to id
router.get('/all/received/:pid',(req,res)=>{
    Report.find({uploadedTo:mongoose.Types.ObjectId(req.params.pid)}).populate('uploadedBy').exec(function(err,reports){
        if(err) res.status(500).json([])
        else{
            res.status(200).json(reports.reverse());
        }
    })
})


//all feedbacks sent to id
router.get('/all/sent/:pid',(req,res)=>{
    Report.find({uploadedBy:mongoose.Types.ObjectId(req.params.pid)}).populate('uploadedBy').exec(function(err,reports){
        if(err) res.status(500).json([])
        else{
            res.status(200).json(reports.reverse());
        }
    })
})




//delete report by id
router.delete("/:id",(req,res)=>{
    Report.findOneAndDelete({_id:mongoose.Types.ObjectId(req.params.id)},function(err,report){
        if(err) res.status(500).json({})
        else{
            res.status(200).json(report);
        }
    })
});

router.delete("/delete/many",(req,res)=>{
    console.log("here");
    try{
    console.log(req.body);
    Report.deleteMany({
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