const mongoose = require('mongoose');

const userShcema = new mongoose.Schema ({
    username: {
        type: String,
        required: [true, 'Username can not be blank'],
    },
    password: {
        type: String,
        required: [true, 'Password can not be blank'],
    }
})

module.exports = mongoose.model('User', userShcema);