import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();
let mongoUrl:string|undefined = process.env.MONGO_URI;
const connectDb = async ()=> {
    try{
        if (!mongoUrl) {
            throw new Error("MongoDB URI not found in environment variables.");
        }
        const mongoConnection = await mongoose.connect(mongoUrl);
        console.log("database connected")
    }
    catch(err){
        console.log(`Database connection error ${err}`);
        process.exit(1);
    }
}
export default connectDb;