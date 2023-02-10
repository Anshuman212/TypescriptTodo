import mongoose from "mongoose";

let todoSchema = new mongoose.Schema({
    task:{
        type:String,
        required: true
    }
})

export= mongoose.model('todo',todoSchema);