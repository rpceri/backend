/**
 * utilisation de middleware (app.put()  et  app.delete()  attribuent des middlewares aux requêtes de type PUT et de type DELETE.)
implémentation dans l'application Express, les routes CRUD qui exploitent votre modèle de données Mongoose, rendant ainsi votre application entièrement dynamique.
 * 
 * MongoDB Atlas permet d'héberger gratuitement une base de données MongoDB.
Le package Mongoose facilite les interactions entre votre application Express et votre base de données MongoDB (mongoose= pour créer un modèle de données afin de faciliter les opérations de la base de données.)

* MongoDB Atlas permet d'héberger gratuitement une base de données MongoDB.
Thing  permet d'exploiter mongoose
 * */
const express = require('express');
const mongoose = require('mongoose');

const stuffRoutes = require('./routes/stuff');
const userRoutes = require('./routes/user'); // pour authentification

mongoose.connect('mongodb+srv://raphMongo:07gm5VzfqPMNJMK9@cluster0.26zw1.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());  //met les données post posté à l'api à dispo dans req.body (rend les données du corps de la requête exploitables dans req.body comme pouvait le faire body-parser avant)

//headers permettant de lever l'erreur causées par le CORS  « Cross Origin Resource Sharing » (le serveur et le client ne partagent pas la même origine) et donc :
//d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  app.use((req, res, next) => { // la fonction  next()  existe uniquement à l'intérieur d'une application Express
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); // la fct next permet de passer l'exécution au prochain middleware de la chaîne
  });

  app.use('/api/stuff', stuffRoutes);
  app.use('/api/auth', userRoutes); // pour authentification

module.exports = app; // pour y accéder depuis note serveur node