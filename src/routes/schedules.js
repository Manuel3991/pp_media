const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');


router.get('/', async (req,res)=>{
    
      const schedule = await pool.query('SELECT idschedule, schedule_name, start_hour, close_hour, comment, active FROM schedule');  
     res.render('settings/schedules/list',{schedule});
});

router.get('/add',(req,res)=>{
   
      res.render('settings/schedules/add');
});

router.get('/edit/:id', async (req,res)=>{    
      const { id } = req.params;
      const schedules = await pool.query('SELECT * FROM schedule WHERE idschedule = ?',[id]);
      res.render('settings/schedules/edit',{schedules: schedules[0]}); 
});

router.post('/add', async(req,res)=>{
      const { schedule_name, start_hour, close_hour, comment, active } = req.body;
      const newSchedule = {
        schedule_name, 
        start_hour, 
        close_hour, 
        comment,
        active: 1
      };
       console.log(newSchedule);
      await pool.query('INSERT INTO schedule set ?',[newSchedule]);
      res.redirect('/schedule');
      //res.send('Received');
});

router.post('/edit/:id', async(req,res)=>{

      const { id } = req.params;
      const { schedule_name, start_hour, close_hour, comment, active } = req.body;
      
      const newSchedule = {
            schedule_name,
            start_hour,
            close_hour,
            comment,
            active
      };
      
      await pool.query('UPDATE schedule SET ? WHERE idschedule = ?',[newSchedule,id]);
     // req.flash('success','Schedule updated successfully');
      res.redirect('/schedule');
});


module.exports = router;