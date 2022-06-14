const mongoose = require('mongoose');


const AppointmentSchema = new mongoose.Schema({ 
    date:{
        type:Date,
        requried:true
    },
    startTime:{
        type:String,
        required:true
    },
    slotTime:{
        type:Number,
        required:true
    },
    did:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    bookedBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        default:null,
    },
    booked:{
        type:Boolean,
        default:false
    },
    
}, { timestamps: true })


const Appointment = mongoose.model('Appointment', AppointmentSchema)
module.exports = Appointment;