export class UserConnection {

    constructor() {
      this.users = new Map();
    }

    register(connection, userName) {
        let newUser = new User(connection, userName, new Date());
        console.log(userName + ' connected.');
        this.users.set(userName, newUser);

        this.notifyUserOnline();

        connection.addEventListener('message', message => {
            this.users.forEach(function (user, name, map) {
                console.log('Broadcast: ' + message.data);
                user.connection.send(message.data);
            });
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
        return this.users.get(userName);
    }

    remove(userName) {
        this.users.delete(userName);
    }

    amount() {
        return this.users.size;
    }
}

class User {

    constructor(connection, name, lastActive) {
        this.connection = connection;
        this.userdata = {
            name: name,
            lastActive: lastActive
        };
    }
}
