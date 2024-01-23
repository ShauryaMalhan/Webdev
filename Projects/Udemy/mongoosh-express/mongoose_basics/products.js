const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/shopApp')
    .then(() => {
        console.log('Connected to Mongoose');
    })
    .catch((err) => {  
        console.log('Failed to connect to Mongoose');
        console.log(err);
    })

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'price must be positive']
    },
    onSale: {
        type: Boolean,
        required: false
    },
    catagory: [String],
    qty: {
        online: {
            type: Number,
            default: 0
        },
        inStore: {
            type: Number,
            default: 0
        }
    },
    size: {
        type: String,
        enum: ['S', 'M', 'L']
    }
});

productSchema.methods.greet = () => {
    console.log('greet, how are you');
};

const Product = new mongoose.model('Product', productSchema);

const findProduct = async () => {
    const foundProduct = await Product.findOne({name: 'Tire Pump'})
    foundProduct.greet();
};

productSchema.statics.fireSale = function () {
    return this.updateMany({}, {onSale: true, price: 0}).exec();
};

Product.fireSale().then(res => console.log('res'));

// const bike = new Product({name: 'Mountain bike', price: 599})
// const bike1 = new Product({name: 'Tire Pump', price: 599, onSale: true});

// Product.findOneAndUpdate({name: 'Tire Pump'}, {price: 100}, {new: true, runValidators: true})
//     .then((data) => {
//         console.log('It works');
//         console.log(data);
//     })
//     .catch((err) => {
//         console.log(err);
//     })