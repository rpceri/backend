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

const Thing = require('./models/thing.js');

mongoose.connect('mongodb+srv://raphMongo:07gm5VzfqPMNJMK9@cluster0.26zw1.mongodb.net/Cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use(express.json());  //met les données post posté à l'api à dispo dans req.body  (rend les données du corps de la requête exploitables comme pouvait le faire body-parser avant)

//headers permettant de lever l'erreur causées par le CORS  « Cross Origin Resource Sharing » (le serveur et le client ne partagent pas la même origine) et donc :
//d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
//d'ajouter les headers mentionnés aux requêtes envoyées vers notre API
  app.use((req, res, next) => { // la fonction  next()  existe uniquement à l'intérieur d'une application Express
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); // la fct next permet de passer l'exécution au prochain middleware de la chaîne
  });

  app.post('/api/stuff', (req, res, next) => {
   /* console.log(req.body);
    res.status(201).json({
      message: 'Objet créé !'
    });*/

    delete req.body._id; // suppression de l'id créé automatiquement par le front end (vu sa cronstruction) inutil car va etre généré automatiquement par mongodb
    const thing = new Thing({
      ...req.body // grace au spread operateur on repasse tout ce qu'il y a dans le body au lieu de faire title: req.body.title etc...
    });
    thing.save() // enregistrement dans la bd, La base de données MongoDB est fractionnée en collections : le nom de la collection est défini par défaut sur le pluriel du nom du modèle. Ici, ce sera Things
      .then(() => res.status(201).json({ message: 'Objet enregistré !'})) // renvoie une réponse
      .catch(error => res.status(400).json({ error })); // error est un raccrourci javascript de error: error

  });

  //route pour récuperer un thing spécifique
  app.get('/api/stuff/:id', (req, res, next) => {
    Thing.findOne({ _id: req.params.id }) //findOne() retourne un seul Thing basé sur la fonction de comparaison qu'on lui passe (souvent pour récupérer un Thing par son identifiant unique).
      .then(thing => res.status(200).json(thing))
      .catch(error => res.status(404).json({ error }));
  });
  
  //route pour mettre à jour /modifier un thing
  app.put('/api/stuff/:id', (req, res, next) => {
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // updateOne pour modifier, 1er arg: objet de comparaison, on remet l'id comme ca on est sur que ce sera le bon
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  });
  
  //app.put()  et  app.delete()  attribuent des middlewares aux requêtes de type PUT et de type DELETE.
  app.delete('/api/stuff/:id', (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  });

  //app.usee permet de tout intercepter (het post etc..) au lieu de ce on peut utiliser app.get
  app.get('/api/stuff', (req, res, next) => {
    /*const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff);*/

    Thing.find() //nous utilisons la méthode find() dans notre modèle Mongoose afin de renvoyer un tableau contenant tous les Things 
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
  });
  
/*  app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});
*/

module.exports = app; // pour y accéder depuis note serveur node