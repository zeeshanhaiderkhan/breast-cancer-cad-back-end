/*
router.delete('/:aid') //delete appointment
router.put('/:aid')   //update appointment
*/
const Appointment = require('../models/appointment');
const mongoose = require('mongoose');

function add_new_appointment(req,res){
    slots = req.body.slots;
    //slots.did= mongoose.Types.ObjectId(slots.did);
    console.log(slots)
    Appointment.insertMany(slots).then(function(appointments){
        res.status(200).json(appointments);
    }).catch(function(err){
        res.status(500).send(err);
    })
}

function get_apppointments_by_date(req,res){
    var endDate = new Date(req.params.date);
    endDate.setDate(endDate.getDate()+1);
    console.log( new Date(req.params.date));

    Appointment.find({date:{
        $gte: new Date(req.params.date),
        $lte:endDate,
    },did:mongoose.Types.ObjectId(req.params.did)},function(err,appointments){
        if(err) res.status(500).json([])
        else{
            console.log(appointments)
            res.status(200).json(appointments);
            
        }
    })
}

function get_all_appointments(req,res){
   console.log('getting all appointments')

    Appointment.find({},function(err,appointments){
        if(err) res.status(500).json([])
        else{
            console.log(appointments)
            res.status(200).json(appointments);
            
        }
    })
}


function delete_appointment_by_id(req,res){
    Appointment.findOneAndDelete({_id:mongoose.Types.ObjectId(req.params.aid)},function(err,appointment){
        if(err) res.status(500).json({})
        else{
            res.status(200).json(appointment);
        }
    })
}

function delete_appointments_by_date(req,res){
    var endDate = new Date(req.body.date);
    endDate.setDate(endDate.getDate()+1);
    console.log( new Date(req.body.date));

    Appointment.remove({date:{
        $gte: new Date(req.params.date),
        $lte:endDate,
    },did:mongoose.Types.ObjectId(req.params.did)},function(err,appointments){
        if(err) res.status(500).json([])
        else{
            res.status(200).json(appointments);
        }
    })
}
function get_appointment_by_id(req,res){
    Appointment.findOne({_id:mongoose.Types.ObjectId(req.params.aid)},function(err,appointment){
        if(err) res.status(500).json({})
        else{
            res.status(200).json(appointment);
        }
    })
}

function get_appointments_by_pid(req,res){
    Appointment.find({bookedBy:mongoose.Types.ObjectId(req.params.pid)},function(err,appointments){
        if(err) res.status(500).json([])
        else{
            res.status(200).json(appointments);
        }
    })
}

function get_appointments_by_did(req,res){
    Appointment.find({did:mongoose.Types.ObjectId(req.params.did)},function(err,appointments){
        if(err) res.status(500).json([])
        else{
            res.status(200).json(appointments);
        }
    })
}

function get_appointments_booked_by_did(req,res){
    console.log('here');
    Appointment.find({did:mongoose.Types.ObjectId(req.params.did),booked:true}).populate('bookedBy').exec(function(err,appointments){
        if(err) {
            res.status(404).json({message:"No Appointments Booked!"})
        }
        else{
            res.status(200).json(appointments.reverse());   
        }
    })
}


//booking with appointment id
function book_appointment(req,res){
    Appointment.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.aid)},{booked:true,bookedBy:mongoose.Types.ObjectId(req.body.pid)},function(err,appointment){
        if(err) res.status(500).json({})
        else{
            res.status(200).json(appointment);
        }
    })
}

//cancelling a booking
function cancel_appointment(req,res){
    Appointment.findOneAndUpdate({_id:mongoose.Types.ObjectId(req.params.aid),booked:true},{booked:false,bookedBy:null},function(err,appointment){
        if(err) res.status(500).json({message:"unable to find appointment maybe it wasn't booked"})
        else{
            res.status(200).json(appointment);
        }
    })
}


module.exports ={add_new_appointment,get_apppointments_by_date,delete_appointment_by_id,
delete_appointments_by_date,get_appointment_by_id,get_appointments_by_pid,
get_appointments_by_did,
book_appointment,
cancel_appointment,
get_appointments_booked_by_did,
get_all_appointments
};