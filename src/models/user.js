const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const UserSchema = new mongoose.Schema({ 
    name:{
        type:String,
        required: [true,'Name is required'],
        maxlength:50,
        trim:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: [true,'Email address is required'],
        validate: [validateEmail, 'Please fill a valid email address'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 80,
        trim: true,
    },
    role: { 
        type: String, 
        enum: ['admin', 'patient','doctor'],
        default:'patient' 
    },
    active:{
        type:Boolean,
        default:true
    },
    sex:{
        type:String,
        enum:['Male','Female']
    },
    cnic:{
        type:String,
        minlength:13,
        maxlength:13, //without dashes
    },
    phone:{
        type:String,
        required:true,
    },

    //for doctor
    assignedPatients:{
        type:[mongoose.Types.ObjectId],
        ref:"User"
    },

    //for patient
    assignedDoctor:{
        type:mongoose.Types.ObjectId,
        ref:"User"
    }

}, { timestamps: true })

//we can also hash password here
//for removing assignedPatients if the user is not doctor
UserSchema.pre('save',function(next){
    if(this.role != 'doctor'){
        this.assignedPatients = undefined;
    }
    next();
})

const User = mongoose.model('User', UserSchema)
module.exports = User; 