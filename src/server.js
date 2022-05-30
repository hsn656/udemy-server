const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');

const { setup } = require('./di-setup');
setup();

const router = require('./routes');
const apiErrorHandler = require('./error/api-error-handler');

class Server {
    constructor() {
        this.app = express();
        this.setup();
    }

    setup() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use('/', router);
        this.app.use(apiErrorHandler);
    }

    run(port) {
        mongoose
        .connect(process.env.DB_URL)
        .then(() => {
            this.server = this.app.listen(port || 5000, () => {
                console.log(`server running on port ${port}`);
            });
        })
        .catch((err) => {
            console.log(err);
        });     
    }

    stop(done) {
        this.server.close(done);
    }
}

module.exports = Server;

