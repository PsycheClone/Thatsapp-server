require('dotenv').config();
require("babel-core/register");
require("babel-polyfill");
import "reflect-metadata";
import {createConnection} from "typeorm";

import {userConnection} from "./app_contents/services/userConnection";
import {AppRoutes} from "./routes";

const app = require('express')();
const bodyParser = require('body-parser');

const WebSocket = require('ws');
const server = new WebSocket.Server({port: 8001});
const path = require('path');
const appDir = path.dirname(require.main.filename);
const jwtDecode = require('jwt-decode');

process.on('unhandledRejection', error => {
    console.log(error.message);
});

createConnection({
        type: "mysql",
        host: process.env.DB_HOST,
        port: 3307,
        username: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: "thatsapp",
        entities: [
            appDir + "/entity/User.js",
            appDir + "/entity/Contact.js"
        ],
        synchronize: true,
        logging: true
    }).then(connection => {

    app.use(bodyParser.json());
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Authorization, Origin, X-Requested-With, Content-Type, Accept");
        next()
    });

    AppRoutes.forEach(route => {
        app[route.method](route.path, (request, response) => {
            route.action(request, response);
        });
    });

    server.on('connection', connection => {
        connection.on('message', message => {
            let parsedMessage = JSON.parse(message);
            console.log('got message: ' + JSON.stringify(parsedMessage));
            if(parsedMessage.connect) {
                let user = jwtDecode(parsedMessage.connect);
                user.status = "online";
                console.log(JSON.stringify(user));
                userConnection.register(connection, user.nickname);
            }
        });
    });

    app.listen(3000, () => console.log('express running on 3000...'));



}).catch(error => console.log("Cannot connect because of: " + error));
