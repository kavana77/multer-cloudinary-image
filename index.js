import  express from "express"
import  fs from "fs"
import { fileRouter } from "./src/router/fileRouter.js"
import { fileURLToPath } from "url"
import  path from"path"
import  cors from "cors"

const app = express()
app.use(cors({ origin: 'http://localhost:3000' }));


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const uploadDir = path.join(__dirname,"uploads")
if(!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir)
}
app.use("/src/uploads",express.static("src/uploads"))
app.use("/files", fileRouter)
app.use("/",(req,res)=>{
    res.send("Welcome to file/image upload")
})
const PORT = process.env.PORT || 4040
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})