const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


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

// It is if true: foundUser, if false: false
// This function is findAndValidate();
userShcema.statics.findAndValidate = async function (username, password) {
    const foundUser = await this.findOne({ username: username });
    const isValid = await bcrypt.compare(password, foundUser.password);
    return isValid ? foundUser : false;
}

// If you saved username and password
// It is hashed every time you saved save();
userShcema.pre('save', async function (next) {
    // if isModified
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 12);
    next();
})

module.exports = mongoose.model('User', userShcema);