const mongoose = require('mongoose');


const MammogramSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:70
    },
    filePath:{
        type:String,
        required:true
    },
    reportFile:{
        type:String,
        required:true
    },
    tumor:{
        type:String,
    },
    tumorType:{
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


const Mammogram =mongoose.model('Mammogram',MammogramSchema);
module.exports = Mammogram;