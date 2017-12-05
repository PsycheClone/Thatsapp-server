class UserConnection {

    constructor() {
      this.users = new Map();
    }

    register(connection, userName) {
        let dateformat = require('dateformat');
        let newUser = new UserData(connection, userName, new Date());
        console.log(userName + ' connected.');
        this.users.set(userName, newUser);

        this.notifyUserOnline();

        connection.addEventListener('message', message => {
            let parsedMessage = JSON.parse(message.data);
            let addressee = this.users.get(parsedMessage.addressee);
            let sender = this.users.get(parsedMessage.sender);
            let newMessage = {
                nickname: parsedMessage.sender,
                message: parsedMessage.message,
                timestamp: dateformat(new Date(), "dddd, mmmm dS, yyyy, HH:MM:ss TT"),
                error: "none"
            };
            if(addressee && addressee.connection) {
                sender.connection.send(JSON.stringify(newMessage));
                addressee.connection.send(JSON.stringify(newMessage));
            } else {
                newMessage.error = "Message was not delivered.";
                sender.connection.send(JSON.stringify(newMessage));
            }
        });

        connection.addEventListener('close', () => {
            this.remove(userName);
            console.log(userName + ' disconnected.');
        });
    }

    notifyUserOnline() {
        let usernames = Array.from(this.users.values()).map(e => {
            return e.userdata;
        });
        this.users.forEach(function (user, name, map) {
            user.connection.send(JSON.stringify({"clientNames": usernames}));
        });
    }

    get(userName) {
        console.log("get" + userName);
        return this.users.get(userName);
    }

    remove(userName) {
        this.users.delete(userName);
    }

    amount() {
        return this.users.size;
    }
}

export let userConnection = new UserConnection();

class UserData {

    constructor(connection, name, lastActive) {
        this.connection = connection;
        this.userdata = {
            nickname: name,
            status: 'online',
            lastActive: lastActive
        };
    }
}
