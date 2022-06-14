const Report = require('../models/report');
const upload = require('../middleware/upload')
const router = require('express').Router();
const mongoose = require('mongoose')
var path =require('path');
const fs= require('fs');
var FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
//for file upload
router.post('/:id',upload,(req,res)=>{
    
     const report_data = {
         title:req.body.title,
         filePath:'/uploads/'+req.file.filename,
         uploadedTo:mongoose.Types.ObjectId(req.params.id),
         uploadedBy:req.body.uploadedBy,
     }
     console.log(report_data)
   try{
    Report.create(report_data).then(
        (data)=>{
            console.log("upload: "+req.file.filename);
             res.status(200).json(data)
        }
    )
}
 catch(err){
     res.status(404).json({message:'Report not created!'})
 }
    
    //res.status(200).json({filepath:'/uploads/1650721418284_winrar-x64-611.exe'});
    
})

//all reports by patien id
router.get('/all/:pid',(req,res)=>{
    Report.find({uploadedTo:mongoose.Types.ObjectId(req.params.pid)},function(err,reports){
        if(err) res.status(500).json([])
        else{
            res.status(200).json(reports.reverse());
        }
    })
})

//by file id
router.get('/:id',(req,res)=>{
    var options = {
        root: path.join('uploads')
    };

    Report.findById(req.params.id,(err,report)=>{
        if(err) res.status(500).json({message:"no such files"});
        else{
            try{
            var fileName = report.filePath.substring(8);
           
            res.sendFile(fileName, options, function (err) {
                if (err) {
                    //next(err);
                    console.log(err);
                    res.status(304)
                } else {
                    console.log('Sent:', fileName);
                    //next();
                }
            });
        }
        catch(err){
            res.status(500)
        }
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

router.get('/all-reports',(req,res)=>{
    console.log('getting all dietplans')
 
     Report.find({},function(err,appointments){
         if(err) res.status(500).json([])
         else{
             console.log(appointments)
             res.status(200).json(appointments);
             
         }
     })
 });



//for mammogram upload to api
router.post('/mammogram/:id',upload,async (req,res)=>{
        //http://192.168.100.12:5000/predict-tumor //file

        var fileName = path.join('uploads',req.file.filename);

        const filePath = fileName;
        const form = new FormData();
        
        const fileStream = fs.createReadStream(filePath);
        form.append('file',fileStream);

        const options = {
            method: 'POST',
            body: form
        };
       console.log('here')
       const response = await fetch('http://192.168.100.12:5000/report',{...options} );
       const data = await  response.json()
       res.status(200).json(data);

   
   //res.status(200).json({filepath:'/uploads/1650721418284_winrar-x64-611.exe'});
   
})

//router.get('/all/:id',)



/*
router.get('/:id',upload,(req,res)=>{
    
    var options = {
        root: path.join('uploads')
    };
    var fileName = 'FastingOnTheDayOfAshura.pdf';
    res.sendFile(fileName, options, function (err) {
        if (err) {
            //next(err);
            console.log(err);
            res.status(304)
        } else {
            console.log('Sent:', fileName);
            //next();
        }
    });
    
    //res.status(200).json({filepath:'/uploads/1650721418284_winrar-x64-611.exe'});
    
})
*/
module.exports = router;