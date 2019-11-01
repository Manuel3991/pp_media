const express = require('express');

const router = express.Router();
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth')

router.get('/',isNotLoggedIn,(req,res)=>{
  
   //res.render('index');
   res.render('auth/signin',{layout: false});
});














module.exports = router;