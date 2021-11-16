const router = require('express').Router();
const user = require('../models/user');

const passport = require('passport');

router.get('/',(req,res)=>{
    res.send('users');
})

router.get('/signin',(req,res)=>{
    res.render('users/sigin');
})

router.post('/signin', passport.authenticate('local',{
    successRedirect: '/notes',
    failureRedirect: '/users/signin',
    failureFlash: true
}))

router.get('/signup',(req,res)=>{
    res.render('users/signup');

})

router.post('/signup',async(req,res)=>{
    const {name,email,password,confirm_password} = req.body;
    const errors = [];
    
    if(!name){
        errors.push({
            text: 'Write a name'
        })
    }
    if(!email){
        errors.push({
            text: 'Write a email'
        })
    }
    if (!password) {
        errors.push({
            text: 'Write a password'
        });
    }
    if(!confirm_password && password===true){
        errors.push({
            text: 'Please confirm your password'
        })
    }

    if (password === confirm_password) {
        if (password.length < 4) {
            errors.push({
                text: 'password must be at least 4 characters'
            })
        }
    }else{
        errors.push({
            text: "Password do note math" 
        })
    }

    if(errors.length > 0){
        res.render('users/signup',{ errors , name, email, password, confirm_password});
    }else{
        const emailUser = await user.findOne({email});
        if(emailUser){
            req.flash('error_msg', 'The email is already in use');
            res.redirect('/users/signup');
        }else{
            const newUser = new user({ name,email,password});
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash('success_msg', 'You are registered!');
            res.redirect('/users/signin');
        }

    }


})

router.get('/logout',(req,res)=>{
    req.logOut();
    res.redirect('/');
})

module.exports = router;