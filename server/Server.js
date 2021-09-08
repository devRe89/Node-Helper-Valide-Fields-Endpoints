const express = require('express');
require('dotenv').config();
const fileUpload = require('express-fileupload');


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.app.use(express.json());

        this.middlewares();

        this.routes();

    }

    middlewares(){
        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }))
    }

    routes(){
        this.app.use('/api', require('../routes/api'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Server funcionando en puerto ${this.port}`);
        });
    }
}

module.exports = Server;