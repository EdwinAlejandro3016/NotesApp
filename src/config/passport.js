
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
},async(email,password,done)=>{ 

    const user = await User.findOne({email});

    if(!user){
        return done(null,false,{message: 'not user found'});
    }else{
        const match = await user.matchPassword(password);
        if(match){
            return done(null,user);
        }else{
            return done(null,false,{message: 'incorrect Password'});
        }
    }
}));

//serialization

passport.serializeUser((User,done)=>{
    done(null,User.id);
});

//deserialization

passport.deserializeUser((id,done)=>{
    User.findById(id,(err,User)=>{
        done(err,User);
    })
})
