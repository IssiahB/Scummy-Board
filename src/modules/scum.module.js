const mongoose = require('mongoose');
const User = require('./user.module');

const scumSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 100
    },
    desc: {
        type: String,
        default: 'No Description',
        maxlength: 400
    },
    status: {
        type: String,
        default: 'to do',
        enum: ['to do', 'in progress', 'done']
    },
    tags: {
        type: [String],
        maxlength: 5,
        default: []
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true,
        validate: {
            validator: function(value) {
                // Checks if there is a user in database with given id
                User.findById(value, null, null, (err, user) => {
                    if (err) {return false}
                    return (user ? true : false);
                })
            },
            message: 'Could not find scum owner'
        }
    },
    parentProject: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    subtasks: [this]
}, {timestamps: true});

module.exports = mongoose.model('scum', scumSchema);