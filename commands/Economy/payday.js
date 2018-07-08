const Discord = require("discord.js");
const Economy = require("discord-eco");

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have permission!");
  if(args[0] == "help"){
    message.reply("Usage: !payday <user>");
    return;
  }
  let pdMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!pdMember) return message.reply("Couldn't find that user.");
  Economy.updateBalance(pdMember.id, 1000).then((i) => {

    const embed = new Discord.RichEmbed()
    .setDescription(`💰${message.guild.name} Bank💰`)
    .setColor("#ff0000")
    .addField('Account Holder',`${pdMember}`,true)
    .addField(`Amount Paid`,`£1000`,true)
    .addField('New Account Balance',`£${i.money}`,true)

    return message.channel.send({embed})
  });

}

module.exports.help = {
  name: "payday"
}
