const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');

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


app.post('/register', async (req, res) => {
    res.send(req.body);
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