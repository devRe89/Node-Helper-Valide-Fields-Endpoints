const express = require('express');
require('dotenv').config();


class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.app.use(express.json());

        this.routes();
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