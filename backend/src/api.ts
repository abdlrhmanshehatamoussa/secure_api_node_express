import express = require("express");
import { GeneralController, NotesController, PointsController, UsersController } from "./controllers/module";
const api = express();
const cors = require("cors");
const bodyParser = require('body-parser');

// api.disable('x-powered-by');
// api.disable('server');
api.use(cors());
api.options('*', cors());
api.use(bodyParser.json());

//Ping
api.get("/ping", GeneralController.instance.ping);

//Users
api.post("/users", UsersController.instance.post);
api.post("/users/login", UsersController.instance.login);

//Points
api.post("/points", PointsController.instance.post);
api.get("/points/:id", PointsController.instance.get);

//Notes
api.post("/notes", NotesController.instance.post);
api.get("/notes/:id", NotesController.instance.get);


//Error handling
api.use(function (err: any, req: any, res: any, next: any) {
    let code: number = 500;
    let retMsg: string = "Unknown error";
    if (err != null && err !== undefined && err.message !== null && err.message !== undefined && err.message.length > 0) {
        retMsg = err.message;
    }
    res.status(code).send(JSON.stringify({ error: retMsg }));
    next()
});
export default api;