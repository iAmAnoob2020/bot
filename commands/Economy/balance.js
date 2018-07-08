const Discord = require("discord.js");
const Economy = require("discord-eco");

module.exports.run = async (bot, message, args) => {

  Economy.fetchBalance(message.author.id).then((i) => {

    const embed = new Discord.RichEmbed()
    .setDescription(`💰${message.guild.name} Bank💰`)
    .setColor("#ff0000") // You can set any HEX color if you put 0x before it.
    .addField('Account Holder',message.author.username,true) // The TRUE makes the embed inline. Account Holder is the title, and message.author is the value
    .addField('Account Balance',i.money,true)

    return message.channel.send({embed})
  });

}

module.exports.help = {
  name: "balance"
}
