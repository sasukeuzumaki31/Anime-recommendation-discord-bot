const mongoose = require("mongoose");
var animeSchema = mongoose.Schema({
  uid: {
    type: Number,
  },
  title: {
    type: String,
  },
  synopsis: {
    type: String,
  },
  genre: {
    type: Array,
  },
  aired: {
    type: String,
  },
  episodes: {
    type: Number,
  },
  members: {
    type: Number,
  },
  popularity: {
    type: Number,
  },
  ranked: {
    type: Number,
  },
  score: {
    type: String,
  },
  img_url: {
    type: String,
  },
  link: {
    type: String,
  },
});
var Animes = mongoose.model("Animes", animeSchema);
module.exports = Animes;
