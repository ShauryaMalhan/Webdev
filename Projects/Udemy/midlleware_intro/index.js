const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log("Loading 1");
    return next();
})

app.use('/dogs' ,(req, res, next) => {
    console.log("I love dog!");
    next();
});

// app.use((req, res, next) => {
//     console.log("Loading 2");
//     return next();
// })

app.get('/', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send('Home page');
});

app.get('/dogs', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send('Woof Woof!!!');
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => {
    console.log('listening on Port 3000');
});