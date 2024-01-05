const express = require('express');
const app = express();
const path = require('path');
const redditdata = require('./data.json');

app.use(express.static(path.join(__dirname, '/public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/views'));

app.get('/', (req, res) => {
    res.render('home');
});

app.get('/cats', (req, res) => {
    const cats = [
        'blue', 'green', 'yellow', 'orange', 'red'
    ]
    res.render('cats', { cats });
});

app.get('/r/:subreddit', (req, res) => {
    const subreddit = req.params.subreddit;
    const data = redditdata[subreddit];
    if(data){
        res.render('subreddit', { data });
    }else{
        res.render('notfound');
    }
});

app.get('/rand', (req, res) => {
    const rand = Math.floor(Math.random() * 10) + 1;
    res.render('random', {rand: rand});
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});

