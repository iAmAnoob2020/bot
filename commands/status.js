const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You dont have permission!");
  if(args[0] === "help"){
    message.channel.send("Usage: !status <status>\nStatus: Online | Idle | Invisible | DNS");
    return;
  }

  if(!args[0]){
    message.channel.send("Please specify a Status!");
    return;
  }

  message.channel.send(`Bot Status set to ${args[0]}!`);
  if(args[0] === "Online"){
    bot.user.setStatus("Online");
  }
  if(args[0] === "Idle"){
    bot.user.setStatus("Idle");
  }
  if(args[0] === "Invisible"){
    bot.user.setStatus("Invisible");
  }
  if(args[0] === "DNS"){
    bot.user.setStatus("dns");
  }

}

module.exports.help = {
  name: "status"
}
