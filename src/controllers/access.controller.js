const bcrypt = require('bcrypt');
const User = require('../modules/user.module');

module.exports.createUser = async function(userObj) {
    try {
        if (!userObj || !userObj.username || !userObj.email || !userObj.password)
            throw new Error('Cannot create new user with invalid fields');

        let {
            username,
            email,
            password
        } = userObj;

        const passwordObj = await this.generatePasswordObj(password);
        if (!passwordObj)
            throw new Error('Program was unable to generate password');


        const user = new User({
            username,
            email,
            password: {
                salt: passwordObj.salt,
                hash: passwordObj.hash
            },
            expire: {},
            personals: {}
        });

        return Promise.resolve(user.save());
    } catch (err) {
        return Promise.reject(err);
    }
}

module.exports.generatePasswordObj = async function(password) {
    try {
        if (!password)
            throw new Error('Must provide password to generate object');
        if (typeof password != 'string')
            throw new Error('Password must be a string');

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);

        return {salt, hash};
    } catch (err) {
       throw new Error(err);
    }
}

module.exports._clearUsersCollection = function() {
    user.deleteMany({});
}