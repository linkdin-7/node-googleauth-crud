const express = require('express')
const passport = require('passport')
const router=express.Router()


//Get request Google auth
router.get('/google',passport.authenticate('google',{scope:['profile']}))

//Google   auth call back
router.get('/google/callback',passport.authenticate('google',{failureRedirect:
'/'
}),(req,res)=>{
    // If everything is gorrect redirect to dashboard
    res.redirect('/dashboard')
})
module.exports= router