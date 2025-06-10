//bussiness logic for user registration
import {User} from '../models/user.model.js';
import bcrypt, { compareSync } from 'bcryptjs';
import { generateToken } from '../utils/generateToken.js';
import { deleteMedia, uploadMedia } from '../utils/cloudinary.js';


export const register  = async (req,res)=>{
    try{
        const {name,email,password} = req.body;
        // Validate input
        if(!name|| !email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        // Check if user already exists
        const existingUser = await User.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = await User.create({
            name,
            email,
            password:hashedPassword
            //key value pair
            // name:name is also correct but it doesnt make sense
            // as when we have same name as key and value we
            //  can just write name
        })
        return res.status(201).json({
            success:true,
            message:"User registered successfully",
            user
        })



    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Failed to register user",
            error:error.message
        })
    }
}


//bussiness logic for user login


export const login = async (req,res)=>{
    try {
        const {email,password} = req.body;
        // Validate input
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Please fill all the fields"
            })
        }
        // Check if user exists
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({
                success:false,
                message:"Wrong Credentials Entered"
                //never tell that email is wrong
                // it can be a security issue
            })  
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        //here password is the plain text password
        // and user.password is the hashed password from database
        if(!isPasswordValid){
            return res.status(400).json({
                success:false,
                message:"Wrong Credentials Entered"
                //never tell that password is wrong
                // it can be a security issue
            })
        }

        //token generation
        generateToken(res,user,`welcome back ${user.name}`);



        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to login user",
            error:error.message
        })
    }

}


export const logout= async (req,res)=>{
    try {
        return res.status(200).cookie("token","",{maxAge:0}).json({
            succes:true,
            message:"Logged out Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to LogOut",
            error:error.message
        })
    }
}


export const getUserProfile = async (req,res)=>{
    try {
        const userId = req.id;

        const user = await User.findById(userId).select("-password");
        if(!user) return res.status(404).json({
            message:"User Profile Not found",
            succes:false,
        })
        return res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to Load User",
            error:error.message
        })
    }
}

export const updateProfile = async (req,res)=>{
    try {
        const userId  = req.id;
        const {name} = req.body;
        const profilePhoto = req.file;

        const user =await  User.findById(userId);
        if(!user) return res.status(404).json({
            message:"user Not Found",
            success:false,
        })

        //extract the publicId of the old image from the url if it exists
        if(user.photoUrl){
            const publicId = user.photoUrl.split('/').pop().split('.')[0];
            deleteMedia(publicId);
        }

        //once we delete old photo upload new photo

        const cloudResponse = await uploadMedia(profilePhoto.path);
        const photoUrl = cloudResponse.secure_url;

        const updatedData = {name,photoUrl};

        const updatedUser = await User.findByIdAndUpdate(userId,updatedData,{new:true}).select("-password");

        return res.status(200).json({
            success:true,
            user:updatedUser,
            message:"Profile updated Succesfully"
        })
        
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to Update profile",
            error:error.message
        })
    }
}