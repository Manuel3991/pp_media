const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');


router.get('/add',isLoggedIn, (req, res) => {

  //res.send('Add user');

  res.render('users/add');
});

router.post('/add',isLoggedIn, async (req, res) => {
  const { fullname, username, password, idrole } = req.body;
  const newUser = {
    fullname, 
    username, 
    password, 
    idrole
  };
   console.log(newUser);
  await pool.query('INSERT INTO user set ?',[newUser]);
  res.redirect('/users');
  //res.send('Received');

});

router.get('/edit/:iduser',isLoggedIn, async (req,res)=>{
  const { iduser } = req.params;
  const users = await pool.query('SELECT iduser,fullname,username,password,idrole FROM user WHERE iduser = ?',[iduser]);
  res.render('users/edit',{users: users[0]});
 //console.log(users);
// res.send('Received');
});
router.post('/edit/:iduser',isLoggedIn, async(req,res)=>{
   const { iduser } = req.params;
   const { fullname, username, password } = req.body;

   const newUser = {
     fullname,
     username,
     password
   };
  
   await pool.query('UPDATE user SET ? WHERE iduser = ?',[newUser,iduser]);
   req.flash('success','User updated successfully');
   res.redirect('/users');
  
});

router.get('/delete/:iduser',isLoggedIn, async(req,res)=>{
         
       const { iduser } = req.params; 
       
       await pool.query('DELETE FROM user WHERE iduser = ? AND idrole NOT IN(1,2)',[iduser]);
       res.redirect('/users');             
});






router.get('/',isLoggedIn, async (req, res) => {

  // const users = await pool.query('SELECT user.iduser,user.fullname,user.username,user.password,role.role FROM user INNER JOIN role ON user.idrole=role.idrole');
 
  const users = await pool.query('SELECT user.iduser AS iduser,user.fullname AS fullname,user.username AS username,role.role AS rolename FROM user INNER JOIN role using(idrole)');
  console.log(users);
  res.render('users/list',{users});
 // res.render('users/list');
});




module.exports = router;