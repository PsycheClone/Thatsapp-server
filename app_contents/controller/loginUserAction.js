import {getManager} from "typeorm";
import {User} from "../../entity/User";

export async function loginUserAction(request, response) {
    var uuid = require('uuid');
    var nJwt = require('njwt');

    console.log(request.body);
    const userRepository = getManager().getRepository(User);
    let user = await userRepository.findOne({nickname: request.body.nickname});
    console.log(user);
    if(!user) {
        console.log("not found");
        response.status(404);
        response.end();
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

    console.log("found");
    if(user.password === request.body.password) {
        response.send({
            access_token: token});
    } else {
        response.status(401);
        response.end();
        return;
    }
}
