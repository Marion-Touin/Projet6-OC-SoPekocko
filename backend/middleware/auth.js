// Importer token d'authentification
const jwt = require('jsonwebtoken');

// Créer un middleware d'authentification 
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Récupération du token
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // Décoder le token
    const userId = decodedToken.userId; // Récupération du userID
    if (req.body.userId && req.body.userId !== userId) { // Vérifier si userID correspond au token
      throw 'l\'utilisateur n\'es pas valable';
    } else {
      next(); 
    }
  } catch {
    res.status(401).json({
      error: new Error('La requête n\'est pas valide!')
    });
  }
};