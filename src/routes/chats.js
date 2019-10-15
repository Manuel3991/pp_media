const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const FBMessenger = require('fb-messenger');

const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');


//variables aborrar

// const accountSid = 'AC6eb17f60b737691239dc2991e8ad5b9e';
// const authToken = 'ce752adef08ecda7036c365eeeb85cf6';

// const client = require('twilio')(accountSid,authToken);



router.get('/wa', isLoggedIn, (req,res)=>{
  res.render('chats/whatsapp');
});




router.get('/fb',isLoggedIn,(req,res)=> {

  res.render('chats/facebook');

});

 router.get('/send',isLoggedIn,(req,res)=>{
    
  
  // client.messages
  // .create({
  //    from: 'whatsapp:+14155238886',
  //    body: 'Hello there pf!',
  //    to: 'whatsapp:+50376537653'
  //  })
  // .then(message => console.log(message.sid));


 res.send('Send');
 });




module.exports = router;