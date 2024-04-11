import mongoose from "mongoose";
//nomComplet, pseudo,password,confirmPassword,genre
const userSchema = new mongoose.Schema({
    nomComplet:{
        type:String,
        required:true
    },
    pseudo:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlenght:6
    },
    genre:{
        type:String,
        required:true,
        enum:["homme","femme"]
    },
    photo:{
        type:String,
        default:""
    },

},{timestamps:true})

const User = mongoose.model("User", userSchema) //le nom de la "table" sera user (sa depend de notr eprojet en realité)

export default User