const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const bcrypt = require('bcrypt');

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

app.get('/', (req, res) => {
    res.send('Hi')
})

app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hash = await bcrypt.hash(password, 12);
    const user = new User({
        username: username,
        password: hash,
    })
    await user.save();
    res.redirect('/');
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
        res.send('Login success');
    }
    else {
        res.redirect('/login');
    }

})

app.get('/login', (req, res) => {
    res.render('login');
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.get('/secret', (req, res) => {
    res.send('This is secret! you can not see me');
})

app.listen(3000, () => {
    console.log('LITENING ON PORT 3000!!')
})