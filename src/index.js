const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const MySQLStore = require('express-mysql-session');
const passport = require('passport');
var bodyParser = require("body-parser");

//para web sockets
const http = require('http');
const socketio = require('socket.io');

//parametros de la base de datos
const {database} = require('./keys');


//inicializaciones

const app = express();
//socket io 
const server = http.createServer(app);
const io = socketio.listen(server);

require('./lib/passport');

require('./lib/socket')(io);




//configuraciones

app.set('port',process.env.PORT || 4000); // este será el puerto de escucha en caso no haya definido uno en el servidor
app.set('views',path.join(__dirname,'views')); //aqui irán todas las vistas de la aplicacion

app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),             //configuracion del motor para usar express-handlebars
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')                       
}));
app.set('view engine','.hbs');


//middlewares
app.use(session({
    secret:'mysqlsession',
    resave: false,
    saveUninitialized: false,
    store:  new MySQLStore(database)
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req,res,next)=>{
  app.locals.success = req.flash('success');
  app.locals.message = req.flash('message');
  app.locals.user = req.user;

  next();

});


//routes
app.use(require('./routes'));
app.use(require('./routes/authentication'));
app.use('/users',require('./routes/users'));
app.use('/chat',require('./routes/chats'));
app.use('/info',require('./routes/info'));
app.use('/schedule', require('./routes/schedules'));

//carpeta publica
app.use(express.static(path.join(__dirname,'public')));

//starting server
server.listen(app.get('port'),() => {
     console.log('Server listen on port', app.get('port'));
});




