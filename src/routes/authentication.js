const express = require('express');
const router = express.Router();
const passport = require('passport');

const { isLoggedIn, isNotLoggedIn} = require('../lib/auth');



router.get('/signin',isNotLoggedIn,(req,res)=>{
  //res.send('Loggin');
  res.render('auth/signin',{layout: false});
});

router.post('/signin',isNotLoggedIn,(req,res,next) =>{
   passport.authenticate('local.signin',{
     successRedirect:'/profile',
     failureRedirect:'/signin',
     failureFlash: true 
   })(req,res,next);
});

router.get('/profile',isLoggedIn,(req,res)=>{

 res.render('profile');

});

router.get('/logout',isLoggedIn,(req,res)=>{

   req.logOut();
   res.redirect('/signin');

});





module.exports = router;