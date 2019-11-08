const express = require('express');
const router = express.Router();
const pool = require('../database');
const helpers = require('../lib/helpers');
const FBMessenger = require('fb-messenger');
const request = require("request");

const { isLoggedIn,isNotLoggedIn } = require('../lib/auth');





router.get('/wa', isLoggedIn, (req,res)=>{
  res.render('chats/whatsrouter');
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




 // Facebook Webhook

// Usados para la verificacion
router.get("/webhook", (req, res)=> {
  // Verificar la coincidendia del token
  if (req.query["hub.verify_token"] === process.env.VERIFICATION_TOKEN) {
      // Mensaje de exito y envio del token requerido
      console.log("webhook verificado!");
      res.status(200).send(req.query["hub.challenge"]);
  } else {
      // Mensaje de fallo
      console.error("La verificacion ha fallado, porque los tokens no coinciden");
      res.sendStatus(403);
  }
});

router.post("/webhook", (req, res) => {
  // Verificar si el vento proviene del pagina asociada
  if (req.body.object == "page") {
      // Si existe multiples entradas entraas
      req.body.entry.forEach(function(entry) {
          // Iterara todos lo eventos capturados
          entry.messaging.forEach(function(event) {
              if (event.message) {
                  process_event(event);
                  console.log(req.body.entry);
              }
          });
      });
      res.sendStatus(200);
  }
});


// Funcion donde se procesara el evento
function process_event(event){
  // Capturamos los datos del que genera el evento y el mensaje 
  var senderID = event.sender.id;
  var message = event.message;
  
  // Si en el evento existe un mensaje de tipo texto
  if(message.text){
      // Crear un payload para un simple mensaje de texto
      console.log(senderID);
      var response = {
          "text": 'Va que esto dijiste: ' + message.text
          
      }
  }
  
  // Enviamos el mensaje mediante SendAPI
  enviar_texto(senderID, response);
}

// Funcion donde el chat respondera usando SendAPI
function enviar_texto(senderID, response){
  // Construcicon del cuerpo del mensaje
  let request_body = {
      "recipient": {
        "id": senderID
      },
      "message": response
  }
  
  // Enviar el requisito HTTP a la plataforma de messenger
  request({
      "uri": "https://graph.facebook.com/v4.0/me/messages", //https://graph.facebook.com/v4.0/me/messages
      "qs": { "access_token": process.env.PAGE_ACCESS_TOKEN },
      "method": "POST",
      "json": request_body
  }, (err, res, body) => {
      if (!err) {
        console.log('Mensaje enviado!')
      } else {
        console.error("No se puedo enviar el mensaje:" + err);
      }
  }); 
}











module.exports = router;