const User = require("../models/user");
const ObjectId = require("mongoose").Types.ObjectId
//function to get all admins

const role='admin';

const getAllAdmins = (req,res)=>{
    User.find({role:role},function(err,data){
        console.log(data);
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(304).json({message:"No admin exists!"});
        }
    })
}

//function get specific admin
const getAdmin=(req,res)=>{
    try{
    User.findOne({role:role,_id:ObjectId(req.params.id)},function(err,admin){
        if(admin){
            res.status(200).json(admin);
        }
        else{
            res.status(304).json({message:"admin with id: "+req.params.id+" not found!"});
        }
    })
    }
    catch(err){
        res.status(304).json({message:"Invalid admin id!"})
    }
}


const deleteAdmin=(req,res)=>{
    try{
        User.findOneAndDelete({role:role,_id:ObjectId(req.params.id)},function(err,admin){
            if(admin == null){
                res.status(304).json({message:"Error deleting admin"})
            }
            else{
                admin.succes=true;
                res.status(200).json(admin)
            }
        })
    }
    catch(err){
        res.status(304).json({message:"unable to delete admin!"})
    }
}

const updateAdmin=(req,res)=>{
    try{
    User.findOneAndUpdate({_id:ObjectId(req.params.id),role:role},req.body,{new:true},function(err,admin){
        if(!admin){
            res.status(304).json({message:"unable to make changes to admin! with id: "+req.params.id})
        }
        else{
            res.status(200).json(admin);
        }
    })
    }
    catch(err){
        res.status(304).json({message:"unable to make changes to admin! with id: "+req.params.id})
    }
}

module.exports = {getAllAdmins,getAdmin,updateAdmin,deleteAdmin};