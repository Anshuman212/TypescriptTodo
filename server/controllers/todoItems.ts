import express, { Request, Response, Application } from 'express';
const router = express.Router();
import todoItemsModel from '../models/todoItems';


router.post('/api/item', async (req:Request,res:Response)=>{
    try {
        const newItem = new todoItemsModel({
            task:req.body.task
        });
        //saving item to the database
        const saveItem = await newItem.save();
        res.status(200).json(saveItem);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.get('/api/item', async (req: Request,res:Response)=>{
    try {
        const allItems = await todoItemsModel.find({});
        res.status(200).json(allItems);
    } catch (error) {
        res.status(500).json(error);
    }
})

router.put('/api/item/:id',async (req:Request,res:Response)=>{
    try {
        const getItem = await todoItemsModel.findByIdAndUpdate(req.params.id,{$set:req.body});
        res.status(200).json(getItem)
    } catch (error) {
        res.status(500).json(error);
    }
})

router.delete('/api/item/:id', async (req:Request,res:Response)=>{
    try {
        const delteItem = await todoItemsModel.findByIdAndDelete(req.params.id);
        res.status(200).json({msg:"success"});
    } catch (error) {
        res.status(500).json(error);
    }
})


export= router;