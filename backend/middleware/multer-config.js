// Importer multer
const multer = require('multer');

const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// Création d'un objet de configuration pour multer
const storage = multer.diskStorage({ // Enregistrement sur le disque
  destination: (req, file, callback) => { // Destination pour l'enregistrement dans le dossier
    callback(null, 'images');
  },
  filename: (req, file, callback) => { // Nom de fichier utiliser pour éviter les problèmes de doublons
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');