import express, { Request, Response, Application } from 'express';
import mongoose from "mongoose";
import "dotenv/config";
import cors from 'cors';
const app: Application = express();
const PORT = process.env.PORT || 5000;//defining the port
//importing the routes
import todoItemRoute from '../controllers/todoItems';
app.use(express.json()); // to parse the request body into json get data in json format
app.use(cors());
//connect to the database
mongoose.connect(`${process.env.MONGO_URI}`).then(():void=>{
console.log('connected to database..');
}).catch((error):void=>{
    console.log(error);
})
app.use('/',todoItemRoute);
// app.get('/', (req: Request, res: Response): void => {
//   res.send('let the game begin');
// });
// my routes
//
app.listen(PORT, (): void => {
  console.log(`listening to ${PORT}..`);
});
