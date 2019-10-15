const passport = require('passport');
const LocalStrategy =  require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField:'username',
    passwordField:'password',
    passReqToCallback: true
}, async(req,username,password, done)=>{
    const rows = await pool.query('SELECT iduser,username,password FROM user WHERE username = ?',[username]);
     if(rows.length > 0){
          
          const user = rows[0];
          const validPassword = await helpers.matchPassword(password, user.password);

          if(validPassword){
                 done(null,user);
          }
          else{
            done(null, false, req.flash('message', 'Incorrect Password'));
          }
          
     }
     else {
        return done(null,false, req.flash('message', 'The username does not exists'));
    }

}));

passport.serializeUser((user, done)=>{
    done(null,user.iduser);
});

passport.deserializeUser(async (iduser,done)=>{
   const rows = await pool.query('SELECT * FROM user WHERE iduser = ?',[iduser]);
   done(null,rows[0]);
 });