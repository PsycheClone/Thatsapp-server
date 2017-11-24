require('dotenv').config();
require("babel-core/register");
require("babel-polyfill");
import "reflect-metadata";
import {createConnection} from "typeorm";

import {UserConnection} from "./app_contents/services/userConnection";
import {AppRoutes} from "./routes";

const app = require('express')();
const bodyParser = require('body-parser');

const WebSocket = require('ws');
const server = new WebSocket.Server({port: 8001});
const userConnection = new UserConnection();
const path = require('path');
const appDir = path.dirname(require.main.filename);

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
            appDir + "/entity/User.js"
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
            let userName;
            if (userName = parsedMessage.newUser) {
                //This will be replaced by a login service, establishing a connection when authenticated
                userConnection.register(connection, userName);
            }
        });
    });

    app.listen(3000, () => console.log('express running on 3000...'));



}).catch(error => console.log("Cannot connect because of: " + error));
