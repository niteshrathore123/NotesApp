const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const app=express();
const cors=require('cors')
const notesRoutes=require('./Routes/Notes');
dotenv.config();


mongoose.connect(process.env.DB_URL,{
    useNewUrlParser:true,
    
})
.then(()=>{
    console.log("DB connected");
})
.catch((err)=>{
    console.log(err);
});

app.use(cors());
app.use(bodyParser.json());
app.use(notesRoutes);




app.listen(3000,(req,res)=>{
    console.log('Server is listening on port 3000');
})