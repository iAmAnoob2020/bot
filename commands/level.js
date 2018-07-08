const Discord = require("discord.js");
const config = require("../config");
let xp = require("../xp.json");

module.exports.run = async (bot, message, args) => {

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1,
      prestige: 0
  };
}

let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let nxtLvlXp = curlvl * 300;
let difference = nxtLvl - curxp;

let lvlEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username)
.setColor("#ff0000")
.addField("Level", curlvl,true)
.addField("XP", curxp,true)
.addFooter(`${difference} XP till next level up!`, message.author.displayAvatarURL);

message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "level"
}
