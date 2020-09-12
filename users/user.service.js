const jwt = require('jsonwebtoken');
const db = require("../models");
const { user } = require('../models');
const {dbUsername, dbPassword, clusterAdress, dbName, secret} = require('../config.json');
const User = db.user;

// users hardcoded for simplicity, store in a db for production applications
const users = [{ id: 1, username: 'test', password: 'test', firstName: 'Test', lastName: 'User' }];

module.exports = {
    authenticate,
    register,
    getAll
};

async function authenticate({ username, password }) {
    const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
}

async function register({ username, email, password }) {
    /*const user = users.find(u => u.username === username && u.password === password);

    if (!user) throw 'Username or password is incorrect';

    // create a jwt token that is valid for 7 days
    const token = jwt.sign({ sub: user.id }, config.secret, { expiresIn: '7d' });

    return {
        ...omitPassword(user),
        token
    };
    */

    /*const user = body;
     
    if (users.find(x => x.username === user.username)) {
        return error(`Username  ${user.username} is already taken`);
    }
 
    // assign user id and a few other properties then save
    user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
 
    return ok();*/

    try {
        await db.mongoose
            .connect(
                `mongodb+srv://${dbUsername}:${dbPassword}@${clusterAdress}/${dbName}?retryWrites=true&w=majority`, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            console.log("Successfully connect to MongoDB.");
    } catch (err) {
        console.error("error, failed connect to db", err);
    }

    const user = new User({
        username,
        email,
        password
    });
    try{
        return user.save();
    }
    catch(err){
        throw err;
    }
}

async function getAll() {
    return users.map(u => omitPassword(u));
}

// helper functions

function omitPassword(user) {
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
}

function adduser(userParam) {
    const user = new User({
        username: userParam['username'],
        email: userParam.email,
        password: userParam.password
    }
    );

    user.save(err => {
        if (err) {
            console.log("error", err);
        }
        else
            console.log("added new user to user collection");
    });
}



module.export = adduser