const express = require('express');
const app = express();

// app.use((req, res) => {
//     console.log('We got a new request');
//     res.send("<h1>hello we got your response</h1>");
// })  
    
app.get('/', (req, res) => {
    res.send('<h1>hello we got your response!!!</h1>');
});

app.get('/r/:subreddit', (req, res) => {
    const subreddit = req.params.subreddit;
    res.send(`<h1>This is a ${subreddit}</h1>`);
});

app.get('/r/:subreddit/:postid', (req, res) => {
    const { subreddit , postid } = req.params;
    res.send(`<h1>This is a ${subreddit} which shows post ID ${postid}</h1>`);
});

app.get('/search', (req, res) => {
    const {q} = req.query;
    if(!q) {
        res.send('Please stop');
    }
    res.send(`<h1>Hi!</h1>`);
});

app.post('/cats', (req, res) => {
    res.send('<h1>This is a post request</h1>');
});

app.get('/cats', (req, res) => {
    res.send('<h1>MEAU</h1>');
});

app.get('/dogs', (req, res) => {
    res.send('<h1>Woof</h1>');
})

app.get('*', (req, res) => {
    res.send('<h1>I dont know the path</h1>')
})

app.listen(3000, ()=>{
    console.log('listening on port 3000!');
})  