const {Router} = require('express');
const apiController = require('../controllers/apiController');
const {validaCampos, mostrarError} = require('../helpers/valida-campos');

const router = Router();

router.get('/',
    validaCampos('registro'),
    mostrarError,
    apiController.getPrueba
);

module.exports = router;