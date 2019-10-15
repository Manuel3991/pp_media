module.exports = function(io) {

    io.on('connection', socket =>{
        console.log('new user connected');

        socket.on('send message',function(data){
            //console.log(data);
            io.sockets.emit('new message',data);
        });
       });
}