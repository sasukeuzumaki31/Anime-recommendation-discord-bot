const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
var bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Discord = require("discord.js");
const client = new Discord.Client();

const findAnimeController = require("./Controllers/FindAnime");

app.use(express.json());

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (msg) => {
  let text = msg.content.split(" ");
  if (text[0] === "!rnd") {
    findAnimeController.recomendRandom(msg);
  }
  if (text[0] === "!name") {
    findAnimeController.byName(msg, text[1]);
  }
  if (text[0] === "!epi") {
    findAnimeController.numberOfEpisodes(msg, text[1]);
  }
  if (text[0] === "!genre") {
    findAnimeController.byGenre(msg, text);
  }
  if (text[0] === "!help") {
    findAnimeController.getHelp(msg);
  }
});

mongoose
  .connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then((msg) => {
    console.log("connected successfully");
    client.login(process.env.TOKEN);
  })
  .catch((err) => {
    console.log(err);
  });
