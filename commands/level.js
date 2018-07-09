const Discord = require("discord.js");
const config = require("../config.json");

module.exports.run = async (bot, message, args) => {

  let xp = require("../xp.json");

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1,
      prestige: 0
  };
}

let curxp = xp[message.author.id].xp;
let curlvl = xp[message.author.id].level;
let curpres = xp[message.author.id].prestige;
let nxtLvlXp = curlvl * 300;
let difference = nxtLvlXp - curxp;

let lvlEmbed = new Discord.RichEmbed()
.setAuthor(message.author.username + `You leveled up!`)
.setColor("#ff0000")
.addField("Level", curlvl,true)
.addField("XP", curxp,true)
.addField("Prestige", curpres,true)
.setFooter(`${difference} XP till next level up!`, message.author.displayAvatarURL);

message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}

module.exports.help = {
  name: "level"
}
