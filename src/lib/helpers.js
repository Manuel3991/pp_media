const bcrypt = require('bcryptjs');
const helpers = {};


helpers.ifCond = (v1, v2, options)=>{
    if(v1 === v2){
        return options.fn(this);
    }
    return options.inverse(this);
};


helpers.matchPassword = async (password,savedPassword) =>{
    
    try{
         if(password == savedPassword){
             return true;
         }
         else{
             return false;
         }
        
        //return await bcrypt.compare(password,savedPassword);

    }catch(e){
        console.log(e);
    }
};



module.exports = helpers;