import {getManager} from "typeorm";
import {User} from "../entity/User";

export async function loginUserAction(request, response) {

    const userRepository = getManager().getRepository(User);
    let user = await userRepository.findOne({nickname: request.body.nickname});
    if(!user) {
        response.status(404);
        response.end();
        return;
    }

    if(user.password === request.body.password) {
        response.send("authenticated");
    } else {
        response.status(401);
        response.end();
        return;
    }
}
