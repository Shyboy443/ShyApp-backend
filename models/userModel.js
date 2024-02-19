const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const UserSchema = mongoose.Schema({
    name:{
        type: String ,
        required:[true,"Please add a name"]
    },
    email: {
        type: String ,
        required:[true,"Please add an email"],
        unique: true,
        trim: true,
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please Enter a valid Email"
        ]
    },
    password: {
        type: String ,
        required:[true,"Please add a password"],
        minLength:[6,"Password must be up to 6 characters"],
      //  maxLength:[23,"Password must not be more that 23 characters"]


    },
    photo: {
        type: String ,
        required:[true,"Please add a photo"],
        default: "https://res.cloudinary.com/dtsnjgmkq/image/upload/v1705905353/ShyApp1/f8lbg9anknnui0xiahsx.png"
    },
    phone: {
        type: String ,
        default: "+94"
    },
    bio: {
        type: String ,
        maxLength:[200,"Bio too long"],
        default: "bio"
    }



}, {
    timestamps: true,
})

// Encrypt password before saving to DB 
UserSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        return next();
    }
    //Hash password

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(this.password,salt);
    this.password= hashedpassword
    next()

})

const User = mongoose.model("User",UserSchema)
module.exports = User