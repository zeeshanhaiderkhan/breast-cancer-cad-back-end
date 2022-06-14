const mongoose = require('mongoose');


const FeedbackSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:70
    },
    
    comments:{
        type:String,
    },
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
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


const Feedback =mongoose.model('Feedback',FeedbackSchema);
module.exports = Feedback;