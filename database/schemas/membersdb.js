const crypto = require('crypto');
const mongoose = require('mongoose');

const options = { month: '2-digit', day: '2-digit', year: 'numeric' };

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
    },
    password: {
        type: mongoose.SchemaTypes.String,
        required: true,
        default: function(){
            const length = 10;
            const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-={}[]|\\:;"<>,.?/';
            let password = '';
            for (let i = 0; i < length; i++) {
                password += charset[crypto.randomInt(charset.length)];
            }
            return password;
        }
    }
});

module.exports = mongoose.model('members', UserSchema);

