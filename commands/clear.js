const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You don't have permission!");
  if(args[0] == "help"){
    message.reply("Usage: !clear <message amount>");
    return;
  }
  if(!args[0]) return message.channel.send("Please specify the amount of messages to be cleared!");
  message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages.`).then(msg => msg.delete(5000));
  });
}

module.exports.help = {
  name: "clear"
}
