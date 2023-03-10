const crypto = require('crypto');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    memberid: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    fname: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    lname: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    email: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    role: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    isActive: {
        type: mongoose.SchemaTypes.String,
        required: true,
    },
    teamid: {
        type: mongoose.SchemaTypes.Number,
        required: true,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now 
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: crypto.randomBytes(5).toString('hex'),
    }
});

module.exports = mongoose.model('members', UserSchema);

