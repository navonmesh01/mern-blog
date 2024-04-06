import mongoose from 'mongoose';
import { type } from 'os';

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:true,
        unique:trusted,
    },
    email:{
        type: String,
        required:true,
        unique:trusted,
    },
    password:{
        type: String,
        required:true,
    },
},{timestamps:true}
);

const User = moongoose.model('User',userSchema);
export default User;