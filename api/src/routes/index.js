const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const breeds = require("./breeds.js");
const temperament = require('./temperament.js')
const PostBreed = require('./postBreed.js')




const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.use('/dogs', breeds);

router.use('/createBreed', PostBreed);

router.use('/temperaments', temperament);

module.exports = router;
