const User = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId
//function to get all patients

const role='patient';

const getAllPatients = (req,res)=>{
    User.find({role:role},function(err,data){
        console.log(data);
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(304).json({message:"No patient exists!"});
        }
    })
}

//function get specific patient
const getPatient=(req,res)=>{
    try{
    User.findOne({role:role,_id:ObjectId(req.params.id)},function(err,patient){
        if(patient){
            res.status(200).json(patient);
        }
        else{
            res.status(304).json({message:"patient with id: "+req.params.id+" not found!"});
        }
    })
    }
    catch(err){
        res.status(304).json({message:"Invalid patient id!"})
    }
}


const deletePatient=(req,res)=>{
    try{
        User.findOneAndDelete({role:role,_id:ObjectId(req.params.id)},function(err,patient){
            if(patient == null){
                res.status(304).json({message:"Error deleting patient"})
            }
            else{
                patient.succes=true;
                res.status(200).json(patient)
            }
        })
    }
    catch(err){
        res.status(304).json({message:"unable to delete patient!"})
    }
}

const updatePatient=(req,res)=>{
    try{
    User.findOneAndUpdate({_id:ObjectId(req.params.id),role:role},req.body,{new:true},function(err,patient){
        if(!patient){
            res.status(304).json({message:"unable to make changes to patient! with id: "+req.params.id})
        }
        else{
            res.status(200).json(patient);
        }
    })
    }
    catch(err){
        res.status(304).json({message:"unable to make changes to patient! with id: "+req.params.id})
    }
}

module.exports = {getAllPatients,getPatient,updatePatient,deletePatient};