import {getManager} from "typeorm";
import {User} from "../entity/User";

export function registerUserAction(request, response) {

    const userRepository = getManager().getRepository(User);

    let newUser = new User();
    newUser.nickname = request.body.nickname;
    newUser.password = request.body.password;
    newUser.first_name = request.body.first_name;
    newUser.last_name = request.body.last_name;
    newUser.email = request.body.email;

    userRepository
        .save(newUser)
        .then(entity => {
            console.log("Entity stored: " + JSON.stringify(entity));
            response.send(entity);
        })
        .catch(error => {
            response.send("An error happened!" + error);
        });
}
