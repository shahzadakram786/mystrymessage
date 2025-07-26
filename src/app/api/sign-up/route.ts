import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import bcrypt from "bcryptjs";


import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import { messageSchema } from "@/schemas/messageSchema";

export async function POST(request: Request) {
    await dbConnect();

    try{
        const {username , email , password } = await request.json();
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username,
            isVerified: true
        })

        if(existingUserVerifiedByUsername) {

            return Response.json({
                success:false,
                message: "Username already exists"
            },{
                status: 400
            })
        }

        const exixtingUserByEmail = await UserModel.findOne({
            email,})

            const verifyCode = Math.floor(100000 + Math.random() * 900000).toString();

            if(exixtingUserByEmail) {
                true
            }else{
                 const hasedPassward = await bcrypt.hash(password, 10)
                const expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 1); 

                const newUser = new UserModel({
                    username,
                    email,
                    password: hasedPassward,
                    verifyCode,
                    verifyCodeExpiry: expiryDate,
                    isVerified: false,
                    isAcceptinigMessage: true,
                    messages:[]
                    
                })

                await newUser.save();

                }
                //send verificationemail

                const emailResponse = await sendVerificationEmail(
                    email,
                    username,
                    verifyCode
                )


                if( !emailResponse.success){
                    return Response.json({
                        success: false,
                        message: emailResponse.message || "Failed to send verification email"
                    }, {
                        status: 500
                    });

                }
                return Response.json({
                    success: true,
                    message: "User created successfully. Please check your email to verify your account." 
                }, {
                    status: 201
                });

                


    }catch(error){
            console.error("Error connecting to the database:", error);
            return Response.json({
                success: false,
                message: "Database connection error"
            },
        {
            status: 500
        })
    }
}