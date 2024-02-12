import mongoose from "mongoose";

const incomeSchema = new mongoose.Schema({
    title: {
        type:String,
        required: true,
        trim: true
    },
    amount : {
        type: Number,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    }
},{timestamps:true})

export default   mongoose.model("income",incomeSchema)
