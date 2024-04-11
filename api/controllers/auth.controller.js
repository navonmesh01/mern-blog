import User from "../models/user.model.js";
import bycryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';

export const signup = async (req,res,next) =>{
    // console.log(req.body);
    const {username,email,password} = req.body;

    if(!username || !email || !password || username==='' || email==='' || password===''){
        // return res.status(400).json({message:'All fields are required'});
        next(errorHandler(400,'All fields are required'));
    }

    const hashedpassword = bycryptjs.hashSync(password,10);

    const newUser = new User({
        username,
        email,
        password:hashedpassword,
    });

    try{
       await newUser.save();
    res.json('Signup Successful'); 
    } catch(error){
        // res.status(500).json({message:error.message});
        next(error);
    }
};

export const signin = async (req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password || email==='' || password===''){
        next(errorHandler(400,'All fields are required')); 
    }

    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(404,'User not found')); //we should write wrong credentials instead but for simplicity we are writing this
        }
        const validPassword = bycryptjs.compareSync(password,validUser.password);
        if(!validPassword){
            return next(errorHandler(400,'Invalid Password')); //we should write wrong credentials instead
        }

        const token = jwt.sign({id:validUser._id}, process.env.JWT_SECRET); // after process.env.JWT_SECRET, ;we can add expiresIn:'id' to expire the session fr now our session will expire when the user closes the browser

        const {password:pass, ...rest} = validUser._doc; // soo that password is not sent
        res.status(200).cookie('access_token',token, {
            httpOnly: true}).json(rest); // inside json instead of validUser, we pass rest
    } catch (error) {
        next(error);
    }
}

export const google = async (req,res,next) => {
    const {email,name,googlePhotoUrl} = req.body;
    try {
        const user = await User.findOne({email});
        if(user){
            const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);
            const {password, ...rest} = user._doc;
            res.status(200).cookie('access_token',token,{
                httpOnly: true,
            }).json(rest);
        }
        else{
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8) ;
            const hashedPassword = bycryptjs.hashSync(generatedPassword,10);
            const newUser = new User({
                username: name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4),
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl,
            });
            await newUser.save();
            const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET);
            const { password, ...rest} = newUser._doc;
            res
               .status(200)
               .cookie('access_token',token,{
                httpOnly: true,
               })
               .json(rest);

        }
    } catch (error) {
        next(error);
    }
}