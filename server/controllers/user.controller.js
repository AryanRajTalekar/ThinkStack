//bussiness logic for user registration
import {User} from '../models/user.model.js';
import bcrypt, { compareSync } from 'bcryptjs';
import { generateAuthToken } from '../utils/generateToken.js';


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
        generateAuthToken(res,user,`welcome back ${user.name}`);



        

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Failed to login user",
            error:error.message
        })
    }

}