const express=require('express');
const Notes = require('../Model/notesModel');
const router=express.Router();

//create a notes
router.post('/api/notes',async(req,res)=>{
    const newNotes=new Notes(req.body);
    try{
        const savedNotes=await newNotes.save();
        res.status(200).json(savedNotes);
    }
    catch(err){
        res.status(500).json(err);
    }
});

//get all the notes
router.get('/api/notes',async(req,res)=>{
    try{
        const allNotes=await Notes.find({});
        res.json(allNotes);
    }
    catch(err){
        res.status(500).json(err);
    }
    
});

//delete the notes.
router.delete('/api/notes/:id',async(req,res)=>{
    try{
        await Notes.findByIdAndDelete(req.params.id);
        res.status(200).json("Your Notes has been deleted");
    }
    catch(err){
        res.status(500).json(err);
    }
})
module.exports=router;

