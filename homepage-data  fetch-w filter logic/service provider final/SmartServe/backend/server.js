import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer'
// import csvtojson from 'csvtojson'
import { service_info } from './models/service_provider.model.js';
import mongoose from 'mongoose';
import {connection} from './config/database.js'
connection()

import { storage } from './config/multer.js'
const upload = multer({ storage })


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()

app.use(express.static('../public'))

app.get('/', (req, res) => {
    res.send('hello')
})

app.get('/form', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
})

import {service_router} from './routes/service_provider.js'
import {admin_panel} from './routes/admin_panel.js'
app.use(service_router)
app.use(admin_panel)



app.listen(3000, () => {
    console.log("server soli asa")
})

/*
app.post('/uploadExcelFile', upload.single('uploadfile'), (req, res) => {
    console.log(req.file.filename)
    // res.sendFile(path.join(__dirname, '../public/simple_form.html'))
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
*/
