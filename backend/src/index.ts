import express,{Request,Response} from "express";
import dotenv from 'dotenv';
import cors from 'cors'
import cookieParser from"cookie-parser";
import connectDb from "./config/db";
dotenv.config();
const app = express();
const port =  process.env.PORT
app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDb();
app.use(express.urlencoded({extended:false}))
app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
  });
  

app.listen(port,()=> {
    console.log(` Server is running on port ${port}`)
})