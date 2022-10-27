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

userShcema.static.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username: username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

module.exports = mongoose.model('User', userShcema);