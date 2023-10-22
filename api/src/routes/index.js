const { Router } = require('express');
// Importar todos los routers;
const getDogs = require('../controllers/getDogs')
const getDogById = require('../controllers/getDogById')
const getByName = require('../controllers/getByName')
const getTemperament = require('../controllers/getTemperaments')
const postDog = require('../controllers/postDog')
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
router.get('/dogs/name', getByName)
router.get('/dogs',getDogs)
router.get('/dogs/:id', getDogById)
router.get('/temperament', getTemperament)

router.post('/dogs', postDog)
// Ejemplo: router.use('/auth', authRouter);


module.exports = router;
