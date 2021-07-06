const mongoose = require("mongoose");
const Discord = require("discord.js");
const client = new Discord.Client();

const Animes = require("../Models/Animes");

module.exports.home = (req, res) => {
  res.send("Server Online!");
};

// module.exports.create = (req, res) => {
//   const re = /[\s,']+/;

//   docs.forEach((ele) => {
//     let genre = ele.genre;
//     var res = genre.split(re);
//     res.splice(0, 1);
//     res.splice(res.length - 1, res.length);
//     ele.genre = res;

//     Animes.create(ele)
//       .then((result) => {})
//       .catch((err) => {});
//   });

// };

module.exports.recomendRandom = (msg) => {
  let val = Math.floor(Math.random() * 19310);
  Animes.find()
    .limit(1)
    .skip(val)
    .then((result) => {
      // res.send(result);
      const embed = new Discord.MessageEmbed()
        .setColor(`#FFC0CB`)
        .setTitle(result[0].title)
        .setURL(result[0].link)
        .setImage(result[0].img_url)
        .setDescription(`${result[0].synopsis}\n`)
        .addFields(
          { name: "Genre", value: result[0].genre },
          { name: "Aired", value: result[0].aired },
          { name: "No of Episodes", value: result[0].episodes, inline: true },
          { name: "Rating", value: result[0].score, inline: true }
        )
        .setTimestamp()
        .setFooter("Type in !help for more commands");

      msg.reply(embed);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.byName = (msg, name) => {
  name = name.charAt(0).toUpperCase() + name.slice(1);
  let regex = new RegExp(name);
  Animes.find({ title: regex })
    .sort({ score: -1 })
    .limit(25)
    .then((result) => {
      if (result.length != 0) {
        let titles = [];
        result.forEach((ele) => {
          titles.push({ name: ele.title, link: ele.link });
        });
        const embed = new Discord.MessageEmbed()
          .setColor(`#FFC0CB`)
          .setTitle(`List Of Animes matching the name : ${name}`);
        titles.forEach((ele) => {
          embed.addFields({ name: ele.name, value: ele.link });
        });

        msg.reply(embed);
      } else {
        msg.reply(`Sorry! I did not find any anime by the name ${name}`);
      }
    })

    .catch((err) => {
      console.log(err);
    });
};

module.exports.numberOfEpisodes = (msg, number) => {
  Animes.find({ episodes: number })
    .limit(25)
    .sort({ score: -1 })
    .then((result) => {
      if (result.length != 0) {
        let titles = [];
        result.forEach((ele) => {
          titles.push({ name: ele.title, link: ele.link });
        });

        const embed = new Discord.MessageEmbed()
          .setColor(`#FFC0CB`)
          .setTitle(`List Of Animes with ${number} episodes`);
        titles.forEach((ele) => {
          embed.addFields({ name: ele.name, value: ele.link });
        });

        msg.reply(embed);
      } else {
        msg.reply(`Sorry! I did not find any anime`);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.byGenre = (msg, arr) => {
  // let searchArray = arr.splice(0, 0);
  arr.splice(0, 1);
  Animes.find({ genre: { $all: arr } })
    .limit(25)
    .sort({ score: -1 })
    .then((result) => {
      if (result.length != 0) {
        let titles = [];
        result.forEach((ele) => {
          titles.push({ name: ele.title, link: ele.link });
        });

        const embed = new Discord.MessageEmbed()
          .setColor(`#FFC0CB`)
          .setTitle(`List Of Animes with ${arr} as their genres`);
        titles.forEach((ele) => {
          embed.addFields({ name: ele.name, value: ele.link });
        });

        msg.reply(embed);
      } else {
        msg.reply("Sry ! I couldnt find anything");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports.getHelp = (msg) => {
  const embed = new Discord.MessageEmbed()
    .setColor(`#FFC0CB`)
    .setTitle(`Commands`)
    .addFields(
      {
        name: "Random Anime",
        value: "!rnd",
      },
      { name: "Search Anime by Name", value: "!name <name of the anime>" },
      {
        name: "Search Anime by Number Of Episodes",
        value: "!epi <number of episodes>",
      },
      {
        name: "Search Anime by Genre",
        value: "!genre <genre1> <genre2> and so on",
      }
    );

  msg.reply(embed);
};
