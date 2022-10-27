const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const session = require('express-session');

const app = express();

main()
    .then(() => { console.log('MONGOOSE CONECT!!') })
    .catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/authDemo');
}

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'notagoodsecret',
    resave: false,
    saveUninitialized: true,

}))

const requireLogin = (req, res, next) => {
    if (!req.session.user_id) {
        return res.redirect('/login');
    }
    next();
}

app.get('/', (req, res) => {
    res.send('Hi')
})

// TODO: POST REGISTER
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const user = new User({ username: username, password: password, });
    const itUser = await User.findOne({ username: username });
    if (itUser) {
        res.send('agin username')
    }
    else {
        await user.save();
        console.log(user.password)
        req.session.user_id = user._id;
        res.redirect('/login');
    }
})

// TODO: POST LOGIN
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const foundUser = await User.findAndValidate(username, password);
    if (foundUser) {
        req.session.user_id = foundUser._id;
        res.redirect('/secret');
    }
    else {
        res.redirect('/login');
    }
})

// TODO: POST LOGOUT
app.post('/logout', (req, res) => {
    // req.session.user_id = null;
    req.session.destroy();
    res.redirect('/login');
})

// TODO: GET LOGIN
app.get('/login', (req, res) => {
    res.render('login');
})

// TODO: GET REGISTER
app.get('/register', (req, res) => {
    res.render('register')
})

// TODO: GET SECRET
app.get('/secret', requireLogin, (req, res) => {
    res.render('secret');
})

app.all((req, res, next) => {
    res.send('err');
})

// TODO: LISTEN
app.listen(3000, () => {
    console.log('LITENING ON PORT 3000!!')
})