const mongoose = require('mongoose');
const Scum = require('./scum.module');

const projectSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 40
    },
    owner: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    tasks: {
        type: [mongoose.Types.ObjectId],
        default: []
    },
    active: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

module.exports = mongoose.model('project', projectSchema);