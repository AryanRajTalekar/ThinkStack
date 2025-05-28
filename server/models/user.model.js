import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        enum:["student","instructor"],
        default:"student"
    },enrolledCourses:[{
        type:mongoose.Schema.Types.ObjectId,
        //this is a foreign key and primary key concept
        //in mongoose we use ref to refer to another model
        ref:"Course"
        //learn this properly
    }],photoUrl:{
        type:String,
        default:""
    },
}, {timestamps:true})

export const User = mongoose.model("User", userSchema);