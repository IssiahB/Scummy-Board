const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const LocalMongooseStrategy = require('passport-local-mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    reset: {
        resetId: String,
        resetUri: String,
        expire: Date
    },
    personals: {
        name: [String],
        phoneNr: {
            type: String,
            match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/
        },
        gender: Boolean, // True is male False is female
        birth: Date
    }
});

// Config strategy
userSchema.plugin(LocalMongooseStrategy, {
    usernameUnique: true,
    limitAttempts: true,
    maxAttempts: 5,
    usernameQueryFields: ['email', 'username']
});
const User = mongoose.model('user', userSchema);

// use static authenticate method of model in LocalStrategy
passport.use(new LocalStrategy(User.authenticate()));

// use static serialize and deserialize of model for passport session support
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

module.exports = User;