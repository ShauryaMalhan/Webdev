const express = require('express');
const app = express();
const path = require('path');
const methodOveride = require('method-override');
const { v4: uuid} = require('uuid');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOveride('_method'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

let comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'Lol that is so funny'
    },
    {
        id: uuid(),
        username: 'skyler',
        comment: 'i like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'sk8erBoi',
        comment: 'plz delete your account todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

app.get('/comments', (req, res) => {
    res.render('index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('new');
});

app.get('/comments/:id', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id === id);
    res.render('show', { comment });
});

app.patch('/comments/:id', (req, res) => {
    const id = req.params.id;
    const newtext = req.body.comment;
    const comment = comments.find(c => c.id === id);
    comment.comment = newtext;
    res.redirect('/comments');
});

app.delete('/comments/:id', (req, res) => {
    const id = req.params.id;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.get('/comments/:id/edit', (req, res) => {
    const id = req.params.id;
    const comment = comments.find(c => c.id === id);
    res.render('edit', { comment });
});

app.post('/comments', (req, res) => {
    const { username, comment} = req.body;
    comments.push({ username, comment, id: uuid()});
    res.redirect('/comments');
});

app.listen(3000, ()=>{
    console.log('listening on port 3000');
})