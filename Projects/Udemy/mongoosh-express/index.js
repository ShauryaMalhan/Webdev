const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('mongodb connected successfully');
    })
    .catch(err => {
        console.log('Error!!!');
        console.log(err);
    });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));

const catagory = ['fruit', 'vegetable', 'dairy'];

app.get('/products', async (req, res) => {
    const category = req.query.category;
    if(category){
        const products = await Product.find({category});
        res.render('products/index', { products , category});
    }else{
        const products = await Product.find({});
        res.render('products/index', { products , category : 'All'});
    }
});

app.post('/products', async (req, res) => {
    const newProduct = new Product(req.body);
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct.id}`);
});

app.get('/products/new', (req, res) => {
    res.render('products/new', { catagory });
});
app.get('/products/:id/edit', async (req, res) => {
    const product = await Product.findById(req.params.id);
    res.render('products/edit', { product , catagory});
});

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    const product = await Product.findById(id);
    res.render('products/show', { product });
})

app.delete('/products/:id', async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.redirect('/products');
});

app.put('/products/:id', async (req, res)=>{
    const id = req.params.id;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true });
    res.redirect(`/products/${product._id}`);
});

app.listen('3000', () =>{
    console.log('listening on port 3000');
});