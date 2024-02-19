const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const sendEmail = require("../utills/sendEmail");




const contactUs = asyncHandler(async (req,res) => {
    const {subject,message} = req.body
    const user = await User.findById(req.user._id)
    if (!user) {
        res.status(404)
        throw new Error("User not Found , Please signup")
    }
   


    // Validation

    if(!subject|| !message){
        res.status(400)
        throw new Error("Please add subject and message")
    }

    const reply_to = user.email;
    const send_to =process.env.EMAIL_USER;
    const send_from= process.env.EMAIL_USER;
    try {
        await sendEmail(subject, message,send_to,send_from,reply_to)
        res.status(200).json({
            success: true,
            message: " Email Sent"
        })
    } catch (error) {
        res.status(500)
        throw new Error ("Email not send, Please try again")
    }







})

module.exports = {
    contactUs,
}