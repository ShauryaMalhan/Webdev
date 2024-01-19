const mongoose = require('mongoose');
const product = require('./models/product');
const Product = require('./models/product');

mongoose.connect('mongodb://localhost:27017/farmStand')
    .then(() => {
        console.log('mongodb connected successfully');
    })
    .catch(err => {
        console.log('Error!!!');
        console.log(err);
    });

// const p = new Product({
//     name: 'Ruby Grapefruit',
//     price: 1.99,
//     category: 'fruit'
// })
// p.save()
//     .then(() => {
//         console.log(p);
//     })
//     .catch(err => {
//         console.log(err);
//     });

const seedProduct = [
    {
        name: "Apple", 
        category: "fruit", 
        price: 1.50
    },
    {
        name: "Banana", 
        category: "fruit", 
        price: 0.75
    },
    {
        name: "Carrot",
        category: "vegetable", 
        price: 1.20
    },
    {
        name: "Broccoli",
        category: "vegetable", 
        price: 2.00
    },
    {
        name: "Milk", 
        category: "dairy", 
        price: 2.50
    },
    {
        name: "Cheese",
        category: "Dairy", 
        price: 3.00
    }          
]

Product.insertMany(seedProduct)
    .then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    });