const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20 + 10);
    const camp = new Campground({
      author: "67076930085279960788dd84",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi animi id nesciunt voluptate itaque aliquid tempore iste, commodi quaerat voluptatibus aut totam in autem eligendi consectetur! Itaque quas minus soluta?",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      image: [
        {
          url: "https://res.cloudinary.com/dgvwmhkrr/image/upload/v1729046671/YelpCamp/ntqshrvxzokfgkhcf2db.png",
          filename: "YelpCamp/ntqshrvxzokfgkhcf2db",
        },
        {
          url: "https://res.cloudinary.com/dgvwmhkrr/image/upload/v1729046672/YelpCamp/g86jlba0dle0wq0pdwck.png",
          filename: "YelpCamp/g86jlba0dle0wq0pdwck",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
