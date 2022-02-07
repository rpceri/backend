/** node server pour lancer 
 * pour tester:  Postman ou thunder client
 * npm install -g nodemon puis on lance du coup nodemon server <= pourne pas avoir a relancer le serveur a chaque modif
 * npm install express
*/


//Node utilise le système de module CommonJS, donc pour importer le contenu d'un module JavaScript, on utilise le mot-clé require plutôt que le mot-clé import .
const http = require('http'); // objet  qui perme  de créer un server 
const app = require('./app');

// arg : fct qui sera appelé en parame : la requeteet la rep
/*const server = http.createServer((req, res) => {
    res.end('Voilaaaaa') // methode end de l'objet reponse
});
*/
const port = process.env.PORT || '3000';  //variable environnement : si la plateforme de déploiement propose un port par défaut
app.set('port', port); // on doit préciser a express sur quel port l'appli va tourner



//la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;
const errorHandler = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
    const address = server.address();
    const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
    switch (error.code) {
      case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
const server = http.createServer(app); // on passe l'express, fonction qui réagira aux requetes entrantes

server.on('error', errorHandler);


//un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

// fin  écouteur d'évènements

//le serveur doit écouter et attendre
server.listen(port)


