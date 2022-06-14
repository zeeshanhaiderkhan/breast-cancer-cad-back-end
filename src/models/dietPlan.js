const mongoose = require('mongoose');


const PrescriptionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:70
    },
    filePath:{
        type:String,
    },
    comments:{
       type:String
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    uploadedTo:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    uploadDate:{
        type:Date,
        default:Date.now()
    }
});


const DietPlan =mongoose.model('Dietplan',PrescriptionSchema);
module.exports = DietPlan;