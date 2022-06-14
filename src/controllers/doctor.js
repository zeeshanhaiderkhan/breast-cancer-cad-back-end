const User = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId
//function to get all doctors

const role='doctor';

const getAllDoctors = (req,res)=>{
    User.find({role:role},function(err,data){
        console.log(data);
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(304).json({message:"No Doctor exists!"});
        }
    })
}

//function get specific doctor
const getDoctor=(req,res)=>{
    try{
    User.findOne({role:role,_id:ObjectId(req.params.id)},function(err,doctor){
        if(doctor){
            res.status(200).json(doctor);
        }
        else{
            res.status(304).json({message:"Doctor with id: "+req.params.id+" not found!"});
        }
    })
    }
    catch(err){
        res.status(304).json({message:"Invalid doctor id!"})
    }
}


const deleteDoctor=(req,res)=>{
    try{
        User.findOneAndDelete({role:role,_id:ObjectId(req.params.id)},function(err,doctor){
            if(doctor == null){
                res.status(304).json({message:"Error deleting doctor"})
            }
            else{
                doctor.succes=true;
                res.status(200).json(doctor)
            }
        })
    }
    catch(err){
        res.status(304).json({message:"unable to delete doctor!"})
    }
}

const updateDoctor=(req,res)=>{
    try{
    User.findOneAndUpdate({_id:ObjectId(req.params.id),role:role},req.body,{new:true},function(err,doctor){
        if(!doctor){
            res.status(304).json({message:"unable to make changes to doctor! with id: "+req.params.id})
        }
        else{
            res.status(200).json(doctor);
        }
    })
    }
    catch(err){
        res.status(304).json({message:"unable to make changes to doctor! with id: "+req.params.id})
    }
}

function assignPatient(req,res){
    var did = req.params.id;
    var pid = req.body.id;
    console.log(req.body);
    try{
        User.findOne({role:role,_id:ObjectId(did)},function(err,doctor){
            if(doctor){
                console.log(doctor.assignedPatients )
               if(doctor.assignedPatients.find((id)=>id==pid) == undefined){//not found then assign
                    User.findOneAndUpdate({_id:ObjectId(did),role:role},
                    {$push:{assignedPatients: ObjectId(pid)}},
                    function(err,doctor){
                        if(err){
                            res.status(500).json({message:"unable to assign patient to doctor"})
                        }
                        else{
                            User.findOneAndUpdate({_id:ObjectId(pid),role:"patient"},
                            {assignedDoctor:ObjectId(did)},
                            function(err,patient){
                                if(err){
                                    res.status(500).json({message:"Unable to assign doctor to patient"})
                                }
                                else{
                                    res.status(200).json({message:"successfully assigned",patient:patient,doctor:doctor})
                                }
                            }
                            )
                        }
                    }
                    )
               }
               else{
                   res.status(500).json({message:"Patient is already assigned"});
               }
            }
            else{
                res.status(304).json({message:"Doctor with id: "+req.params.id+" not found!"});
            }
        })
        }
        catch(err){
            res.status(304).json({message:"unable to make changes to doctor! with id: "+req.params.id})
        }
}

function getPatientsAssigned(req,res){
    var did = req.params.id;

    User.findOne({_id:ObjectId(did),role:'doctor'}).populate('assignedPatients').exec(function(err,doctor){
        if(err) {
            res.status(404).json({message:"Unable to find doctor"})
        }
        else{
            res.status(200).json(doctor.assignedPatients);   
        }
    })
}

module.exports = {getAllDoctors,getDoctor,updateDoctor,deleteDoctor,assignPatient,getPatientsAssigned};