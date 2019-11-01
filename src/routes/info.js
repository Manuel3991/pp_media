const express = require('express');

const router = express.Router();
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');


router.get('/status',isLoggedIn, (req,res)=>{

    res.render('info/status');

});


router.get('/privacy', (req,res)=>{

res.render('info/privacy');
    
});




module.exports = router;