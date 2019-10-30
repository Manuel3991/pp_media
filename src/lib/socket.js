const pool = require('../database');


module.exports = function(io) {

    io.on('connection', socket =>{

        socket.on('new', status => {
            addMessage(status, res => {
                if(res){
                    io.emit('refresh',status);
                    
                }
                else{
                    io.emit('error');
                }
            });
        });
        
        console.log('new user connected');

    //     socket.on('send message',function(data){
    //         //console.log(data);
    //         io.sockets.emit('new message',data);
    //     });
    //    });
    });
    var addMessage = async (status,cb) => {
                        
         await pool.query(("INSERT INTO `message` (`message`) VALUES ('"+status+"')"), (err,rows)=>{
             if(!err){
                 cb(true);
             }
             else{
                 cb(false);
                 return;
             }
         });

    };









}