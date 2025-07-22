import mongoose , { Document, Schema } from 'mongoose';




export interface Message extends Document {
    content: string;
    createdAt: Date;
}


const MessageSchema:Schema<Message> = new Schema({
    content:{
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})



export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpires: Date;
    isVerified: boolean;
    isAcceptingMessage: boolean;
    messages: Message[];
}



const UserSchema:Schema<User> = new Schema({
    username:{
        type: String,
        required: [true, "Username is required"],
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
        
        default: Date.now
    },
    password:{
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verification code is required"],
        trim: true
    },
    verifyCodeExpires: {
        type: Date,
        required: [true, "Verification code expiration date is required"],
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessage: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})