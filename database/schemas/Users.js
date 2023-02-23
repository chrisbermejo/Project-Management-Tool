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
        type: mongoose.SchemaTypes.Date,
        required: true,
        default: new Date(),
    }
});

module.exports = mongoose.model('members', UserSchema);

