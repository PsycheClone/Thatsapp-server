import {getManager} from "typeorm";
import {User} from "../../entity/User";

export async function loginUserAction(request, response) {
    var uuid = require('uuid');
    var nJwt = require('njwt');

    const userRepository = getManager().getRepository(User);
    let user = await userRepository.findOne({nickname: request.body.nickname});
    if(!user) {
        response.status(404);
        response.send({error: "User with nickname " + request.body.nickname + " not found!"});
        return;
    }

    var claims = {
        user_id: user.user_id,
        nickname: user.nickname,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        last_active: user.last_active
    }

    var jwt = nJwt.create(claims,"secret","HS256");
    var token = jwt.compact();

    if(user.password === request.body.password) {
        response.send({
            access_token: token});
    } else {
        response.status(401);
        response.send({error: "Nickname and password do not match!"});
        return;
    }
}
