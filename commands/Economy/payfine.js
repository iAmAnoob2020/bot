const Discord = require("discord.js");
const Economy = require("discord-eco");

module.exports.run = async (bot, message, args) => {


  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You don't have permission!");
  if(args[0] == "help"){
    message.reply("Usage: !pay <amount> <user>");
    return;
  }
  let pfMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if(!pfMember) return message.reply("Couldn't find that user.");
  Economy.updateBalance(pfMember.id, -500).then((i) => {

    const embed = new Discord.RichEmbed()
    .setDescription(`💰${message.guild.name} Bank💰`)
    .setColor("#ff0000")
    .addField('Account Holder',`${pfMember}`,true)
    .addField(`Fine cost`,`£500`,true)
    .addField('New Account Balance',i.money,true)

    return message.channel.send({embed})
  });

}

module.exports.help = {
  name: "payfine"
}
