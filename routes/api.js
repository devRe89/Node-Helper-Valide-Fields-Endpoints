const {Router} = require('express');
const apiController = require('../controllers/apiController');
const {validaCampos, mostrarError, validateFile} = require('../helpers/valida-campos');

const router = Router();

router.post('/',
    // validaCampos('crear-libro'),
    // mostrarError,
    validateFile,
    apiController.getPrueba
);

module.exports = router;