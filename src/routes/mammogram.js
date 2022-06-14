const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const User = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId
const upload = require('../middleware/upload')
const router = require('express').Router();
var path =require('path');
const fs= require('fs');
var FormData = require('form-data');
const model_api_url='http://192.168.100.27:5000';//'http://192.168.100.27:5000';

const Mammogram = require('../models/mammogram');

router.post('/:id',upload, (req,res)=>{
        User.findOne({role:'patient',_id:ObjectId(req.params.id)}).populate('assignedDoctor').exec(async function(err,patient){
            if(err) {
                res.status(404).json({message:'Patient Not Found!'})
            }
            else{
                try{
                //http://192.168.100.12:5000/predict-tumor //file

                var fileName = path.join('uploads',req.file.filename);
                
                const filePath = fileName;
                const form = new FormData();
                
                const fileStream = fs.createReadStream(filePath);
                form.append('file',fileStream);
                form.append('name',patient.name);
                form.append('email',patient.email);
                console.log('imahere')
                form.append('pid',JSON.stringify(patient._id));
                form.append('doctor_name',patient.assignedDoctor.name);

                const options = {
                    method: 'POST',
                    body: form
                };
            console.log('here')
            const response = await fetch(model_api_url+'/report',{...options} );
            const data = await  response.json()
            const mam = {
                uploadedTo:ObjectId(req.params.id),
                filePath:filePath,
                reportFile:data.file,
                tumor:data.tumor,
                tumorType:data.type,
                uploadedBy:ObjectId(req.body.uploadedBy),
                title:req.body.title,
            }
            console.log(data);
            Mammogram.create(mam).then(
                (d)=>{
                     res.status(200).json(d)
                }
            )
        }
        catch(err){
            res.status(404).json({message:"eror while making reports check api"})
        }
            }
        })})


router.get('/all-mammograms',(req,res)=>{
            console.log('getting all dietplans')
         
             Mammogram.find({},function(err,appointments){
                 if(err) res.status(500).json([])
                 else{
                     console.log(appointments)
                     res.status(200).json(appointments);
                     
                 }
             })
         });
//all reports by patient id
router.get('/all/:pid',(req,res)=>{
    console.log('Getting all mammograms!');
    Mammogram.find({uploadedTo:ObjectId(req.params.pid)},function(err,reports){
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
    Mammogram.findOneAndDelete({_id:mongoose.Types.ObjectId(req.params.id)},function(err,report){
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
    Mammogram.deleteMany({
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


module.exports=router