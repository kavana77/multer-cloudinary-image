import  multer from "multer";
import  { Router } from  "express";
import  upload from "../middleware/fileUpload.js";
import  {UNEXPECTED_FILE_TYPE} from "../constants/file.js"
import  {fileController} from  "../controllers/fileController.js"
import  { imageResize } from "../middleware/imageResize.js";
import { isFilePresent } from "../middleware/validators/isFilePresent.js";
import authenticateJWT from "../middleware/authentication.js";
export const fileRouter = Router()

fileRouter.post("/upload", 
    authenticateJWT,
    function(req,res,next){
    upload(req,res,function (err){
        if(err instanceof multer.MulterError){
            if(err.code === UNEXPECTED_FILE_TYPE.code){
                return res.status(400).json({error:{description:err.field}})
            }
        }else{
            return res.status(500).json({error:{description:err.message}})
        }
    })
  
},
fileController,
imageResize,
isFilePresent
)