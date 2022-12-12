const bcrypt = require('bcrypt');
const User = require('../modules/user.module');


module.exports._clearUsersCollection = function() {
    user.deleteMany({});
}