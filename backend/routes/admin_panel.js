import express from 'express'
const admin_panel=express.Router()

import csvtojson from 'csvtojson'
import { service_info } from '../models/service_provider.model.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import multer from 'multer'

import { storage } from '../config/multer.js'
const upload = multer({ storage })


admin_panel.post('/uploadExcelFile',upload.single('uploadfile'),(req,res)=>{
    console.log(__dirname)
    importFile('../public/server_upload/' + req.file.filename);

    function importFile(filePath) {
        console.log(filePath)
        //  Read Excel File to Json Data
        var arrayToInsert = [];
        csvtojson().fromFile(filePath).then(source => {

            for (var i = 0; i < source.length; i++) {
                const isAvailable = source[i]["availability"] === 'TRUE' || source[i]["availability"] === '1';
                console.log(source[i]["name"])

                var singleRow = {
                    name: source[i]["name"],
                    email: source[i]["email"],
                    role: source[i]["role"],
                    is_available: isAvailable,
                    pincode: source[i]['pincode']
                };
                arrayToInsert.push(singleRow);
            }
            service_info.insertMany(arrayToInsert)

            console.log(arrayToInsert)
            res.send(arrayToInsert)

        });
        // console.log(arrayToInsert)
    }
})

export{admin_panel}