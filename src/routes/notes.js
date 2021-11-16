const router = require('express').Router();

const Note = require('../models/Note');

const { isAuthenticated } = require('../helpers/auth')

    router.get('/',isAuthenticated,async(req,res)=>{
        const notes = await Note.find({user: req.user.id }).sort({date: 'desc'}).lean();
        res.render('notes/notes',{notes});
    })

   
    router.get('/add',isAuthenticated,(req,res)=>{
        res.render('notes/new-note');
    })

    router.post('/new-note',isAuthenticated,async(req,res)=>{
        const { title, description} = req.body;
        const errors = [];
        if(!title){
            errors.push({
                text: "Please Write a Title"
            })
        }
        if(!description){
            errors.push({
                text: "Please Write a Description"
            })
        }
        if(errors.length > 0){
            res.render('notes/new-note',{ 
                errors,
                title,
                description
            })
        }else{
            const newNote = new Note({title, description});
            newNote.user = req.user.id;
            await newNote.save();
            req.flash('success_msg', ' Note Added Successfully');
            res.redirect('/notes');
        }
    })

    router.get('/edit/:id',isAuthenticated,async(req,res)=>{
        const id = req.params.id;
        const note = await Note.findById(id).lean();
        res.render('notes/edit-note', { note });
    })

    router.put('/edit-note/:id',isAuthenticated,async(req,res)=>{
        const id = req.params.id;
        const body = req.body;
        const note = await Note.findByIdAndUpdate(id,body);
        req.flash('success_msg', 'Note Updated Successfully');
        res.redirect('/notes');
    })

    router.delete('/delete/:id',isAuthenticated,async (req,res)=>{
        const id = req.params.id; 
        const note = await Note.findByIdAndDelete(id);
        req.flash('success_msg',' Note Deleted Succesfully');
        res.redirect('/notes'); 
    })
    

module.exports = router; 