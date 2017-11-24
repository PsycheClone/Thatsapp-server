import {getManager} from "typeorm";
import {User} from "../../entity/User";

export async function registerUserAction(request, response) {

    console.log(request.body);
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
            response.send("An error happened!" + error);
        });
}
