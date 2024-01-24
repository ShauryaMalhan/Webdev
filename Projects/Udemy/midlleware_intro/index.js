const express = require('express');
const morgan = require('morgan');
const app = express();

app.use(morgan('common'));
app.use((req, res, next) => {
    req.requestTime = Date.now();
    console.log("Loading 1");
    return next();
})

const verifyPassword = (req, res, next) => {
    const { password } = req.query;
    if(password === 'swasti'){
        next();
    }
    throw new Error('Password required!!');
};

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

app.get('/secrets', verifyPassword, (req, res) => {
    res.send('Home page');
});

app.get('/dogs', (req, res) => {
    console.log(`Request Date: ${req.requestTime}`);
    res.send('Woof Woof!!!');
});

app.get('/error', (req, res) => {
    chicken.fly();
});

app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(3000, () => {
    console.log('listening on Port 3000');
});