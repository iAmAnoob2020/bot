const discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You dont have permission!");
  if(args[0] === "help"){
    message.channel.send("Usage: !activity <text>");
    return;
  }
  if(args[0] === "default"){
    bot.user.setActivity(`${bot.guilds.size} servers!`, {type: "WATCHING"});
    message.channel.send("Activity set to Default!");
    return;
  }
  let activity = args.slice(0).join(" ");
  bot.user.setActivity(`${activity}`);
  message.channel.send(`Activity set to: ${activity}`);
  }

module.exports.help = {
  name: "activity"
}
