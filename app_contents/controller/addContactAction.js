import {getManager} from "typeorm";
import {Contact} from "../../entity/Contact";

export async function addContactAction(request, response) {
    const contactRepository = getManager().getRepository(Contact);

    if(!request.body.userId) {
        response.status(400);
        response.send({error: "You must provide a user id."});
        return;
    }
    if(!request.body.contactId) {
        response.status(400);
        response.send({error: "You must provide a contact id."});
        return;
    }

    let contact = new Contact();
    contact.user_id = request.body.userId;
    contact.contact_id = request.body.contactId;

    let potentiallyStoredContact = await contactRepository.findOne({
        user_id: request.body.userId,
        contact_id: request.body.contactId
    });

    if(potentiallyStoredContact) {
        response.status(400);
        response.send({error: "Contact is already added."});
    } else {
        contactRepository.save(contact)
            .then(entity => {
                response.send(contact);
            });
    }
}
