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

app.set('port', process.env.PORT || 3000); // on doit préciser a express sur quel port l'appli va tourner
const server = http.createServer(app);

//le serveur doit écouter et attendre : variable environnement : si la plateforme de déploiement propose un port par défaut
server.listen(process.env.PORT || 3000)


