const jwt = require('jsonwebtoken');
const { user } = require('../models');
const {dbUsername, dbPassword, clusterAdress, dbName, secret} = require('../config.json');
const db = require('_helpers/db');
const models = require("../models");
const bcrypt = require('bcryptjs');
const User = db.User;


module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const token = jwt.sign({ sub: user.id }, secret, { expiresIn: '7d' });
        return {
            ...user.toJSON(),
            token
        };
    }
    
}

async function create({ username, email, password }) {
    if (await User.findOne({ username: username })) {
        throw 'Username "' + username + '" is already taken';
    }
    if (await User.findOne({ email: email })) {
        throw 'Email "' + email + '" is already taken';
    }

    const user = new User({
        username,
        email
    });

    // hash password
    if (password) {
        user.hash = bcrypt.hashSync(password, 10);
    }

    // save user
    await user.save();

}
async function getAll() {
    return await User.find({role : 'user'});//.map(u => omitPassword(u));
}

const getAll2 = async() => users.map(omitPassword);

async function getById(id) {
    return await User.findById(id);
}



async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.username !== userParam.username && await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.hash = bcrypt.hashSync(userParam.password, 10);
    }


    // copy userParam properties to user
    Object.assign(user, userParam);

    
    console.log("user : ", user);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}
