import {getManager} from "typeorm";
import {User} from "../../entity/User";

export async function registerUserAction(request, response) {

    console.log(request.body);

    if(!request.body.nickname) {
        response.status(400);
        response.send({error: "You must provide a nickname."});
        return;
    }
    if(!request.body.password) {
        response.status(400);
        response.send({error: "You must provide a password."});
        return;
    }
    if(!request.body.firstName) {
        response.status(400);
        response.send({error: "You must provide a first name."});
        return;
    }
    if(!request.body.lastName) {
        response.status(400);
        response.send({error: "You must provide a last name."});
        return;
    }
    if(!request.body.email) {
        response.status(400);
        response.send({error: "You must provide an email."});
        return;
    }

    const userRepository = getManager().getRepository(User);

    let newUser = new User();
    newUser.nickname = request.body.nickname;
    newUser.password = request.body.password;
    newUser.first_name = request.body.firstName;
    newUser.last_name = request.body.lastName;
    newUser.email = request.body.email;

    userRepository
        .save(newUser)
        .then(entity => {
            console.log("Entity stored: " + JSON.stringify(entity));
            response.send(entity);
        })
        .catch(error => {
            response.status(401);
            response.send({error: error.sqlMessage});
        });
}
