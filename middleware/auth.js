const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    // dans l'entete du get de stuf, on a : 
    //Authorization : Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjAyMmFhOWYxZTcyOGY3NTg0YTNkNzAiLCJpYXQiOjE2NDQzMDkxNjEsImV4cCI6MTY0NDM5NTU2MX0.RjLwcSYbTxhxOAmoRR5UJqdo9OO2ZTtwXplz18d3zsw
    // du coup on splite pour recuperer le 1er indice qui contient le token sass Bearer
    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); /// ond ecode le token qui devient un object javascript classique, on va pouvoir recup le userId qu'il y a dedans
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) { // si il y a un user id dans le corp de la requete et que celui ci est différent de celui ci...
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      //error: new Error('Invalid request!')
      error: error | 'RequeTes non authnetifiée !'
    });
  }
};