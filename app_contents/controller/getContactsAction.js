import {getManager} from "typeorm";
import {Contact} from "../../entity/Contact";
import {User} from "../../entity/User";
import {userConnection} from "../services/userConnection";

export async function getContactAction(request, response) {
    const contactRepository = getManager().getRepository(Contact);
    const userRepository = getManager().getRepository(User);

    let status = function (nickname) {
        if (userConnection.get(nickname)) {
            return 'online';
        }
        return 'offline';
    };

    if(request.params.userId) {
        let contacts = await contactRepository.find({
            user_id: request.params.userId
        });

        console.log(contacts);
        let users = [];
        if (contacts.length > 0) {
            users = await userRepository.findByIds(contacts.map(contact => contact.contact_id));
        }
        console.log(users);
        response.send(JSON.stringify(users.map(function (user) {
                return {userId: user.user_id, nickname: user.nickname, status: status(user.nickname)}
            }
        )));

    } else {
        let users = await userRepository.find();
        response.send(JSON.stringify(users.map(function (user) {
            return {user_id: user.user_id, nickname: user.nickname, status: status(user.nickname)}
        })));
    }
}
