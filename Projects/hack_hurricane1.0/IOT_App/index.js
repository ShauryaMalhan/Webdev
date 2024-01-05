const express = require('express');
const app = express();
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('login.ejs');
});

app.get('/register', (req, res) => {
    res.render('register.ejs');
});

app.get('/', (req, res) => {
    res.render('login.ejs');
});

app.get('/database', (req, res) => {
    res.render("database");
});

app.listen(8080, () => {
    console.log('listening on port 8080');
});