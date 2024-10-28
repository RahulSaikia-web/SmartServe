import mongoose from "mongoose";
import {connection} from '../config/database.js'
connection()
const service=new mongoose.Schema({
    name:{
        required: true,
        type:String,
    },
    email:{
        required: true,
        type:String,
    },
    role:{
        required: true,
        type:String,
    },
    is_available:{
        required: true,
        type: Boolean
    },
    pincode:{
        required:true,
        type:Number
    }
})

const service_info=mongoose.model('service_provider',service)
export{service_info}