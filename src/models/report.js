const mongoose = require('mongoose');


const ReportSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:70
    },
    filePath:{
        type:String,
        required:true
    },
    comments:{
       type:[{type:mongoose.Schema.Types.ObjectId}] 
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


const Report =mongoose.model('Report',ReportSchema);
module.exports = Report;