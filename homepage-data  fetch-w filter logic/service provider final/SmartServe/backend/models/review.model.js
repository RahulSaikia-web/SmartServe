import mongoose from "mongoose";
import { service_info } from "./service_provider.model.js";
import {connection} from '../config/database.js'
connection()

const review=new mongoose.Schema({
    reviewed_by:{
        type:String
    },
    review_to:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service_provider'
    },
    review_description:{
        type:String
    }
})