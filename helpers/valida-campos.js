const {check, validationResult} = require('express-validator');
const mongoose = require('mongoose');


const validaCampos = endpoint => {
    switch(endpoint){
        case 'registro':
            return [
                check('email', 'El Mail no es valido').isEmail(),
                check('nickname', 'El campo nickname es requerido').not().isEmpty(),
                check('nombre', 'El nombre es requerio').not().isEmpty(),
                check('edad', 'La edad es un campo numerico').isNumeric(),
                check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({min:6})
            ]
        case 'sesion': 
            return[
                check('email', 'El Mail no es valido').isEmail(),
                check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({min:6})
            ]
        case 'crear-libro': 
            return[
                check('nombre', 'El nombre del libro es requerido').not().isEmpty(),
                check('descripcion', 'La descripción en requerida').not().isEmpty(),
                check('creador').custom((creador) => validarId(creador))
            ]
        default:
            return;
    }
}

const validarId = async id => {
    const idValid = await mongoose.Types.ObjectId.isValid(id);
    if (!idValid){
        throw new Error(`EL id de creador no es valido`);
    }
}

const validateFile = (req, res, next) => {

    if ( req.files.libro === undefined || req.files.portada === undefined){
        return res.status(500).json({
            msg: 'La portada y el libro son requeridos'
        });
    }

    const extensions = ['jpg', 'png', 'jpeg', "pdf"];

    const libroExtension = req.files.libro.mimetype.split('/').pop();
    const portadaExtension = req.files.portada.mimetype.split('/').pop();

    if(!extensions.includes(libroExtension)){
        return res.status(500).json({
            msg: `La extensión ${libroExtension} no es correcta, debe ser formato pdf`,
        });
    }

    if(!extensions.includes(portadaExtension)){
        return res.status(500).json({
            msg: `La extensión ${portadaExtension} no es correcta.`,
        });
    }

    next();
}

const mostrarError = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next();
    }

    const arrayError = [];
    errors.array().map(err => arrayError.push({ [err.param]:err.msg }));
    
    return res.status(500).json({
        errores: arrayError,
    });
}

module.exports = {
    validaCampos,
    mostrarError,
    validateFile
}