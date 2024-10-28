import express from 'express'
const router=express.Router()
import multer from 'multer'

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../public/server_upload')
    },
    filename: function (req, file, cb) {
        // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.originalname)
    }
})

export{storage}