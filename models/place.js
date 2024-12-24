const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const placeSchema = new Schema({
  title: { type: String, required: true },
  descrption: { type: String, required: true },
  imageURL: { type: String, required: true },
  address: { type: String, required: true },
  location: {
    lat: { type: String, required: true },
    long: { type: String, required: true },
  },
  creator: { type: String, required: true },
});

module.exports = mongoose.model('Place', placeSchema);
