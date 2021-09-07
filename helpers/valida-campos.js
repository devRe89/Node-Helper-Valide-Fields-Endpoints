const {check, validationResult} = require('express-validator');

const validaCampos = endpoint => {
    switch(endpoint){
        case 'registro':
            return [
                check('email', 'El Mail no es valido').isEmail(),
                check('nombre', 'El nombre es requerio').not().isEmpty(),
                check('edad', 'La edad es un campo numerico').isNumeric(),
                check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({min:6})
            ]
        case 'sesion': 
            return[
                check('email', 'El Mail no es valido').isEmail(),
                check('password', 'La contraseña debe tener un minimo de 6 caracteres').isLength({min:6})
            ]
        default:
            return;
    }
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
    mostrarError
}