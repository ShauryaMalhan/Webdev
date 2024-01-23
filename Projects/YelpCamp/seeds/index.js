const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp')

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", () => {
    console.log("Connection is open")
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 100) + 10;
        const camp = new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://source.unsplash.com/collection/483251',
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veritatis deleniti quidem esse aut inventore aspernatur eos, distinctio, placeat eaque nulla provident voluptatibus eveniet impedit reprehenderit minus? Praesentium reprehenderit vel libero facilis odio, dolores debitis corrupti, quibusdam necessitatibus culpa eveniet rem fugiat, doloremque esse fugit dignissimos veniam deleniti nam saepe vitae ab. Tenetur, nam fugiat, vel aliquam molestias dolor.',
            price: price
        })
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
})