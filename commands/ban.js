const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.reply("You dont have permission!");
  if(args[0] == "help"){
    message.reply("Usage: !ban <user> <reason>");
    return;
  }
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser) return message.reply("Couldn't find the user.");
  let bReason = args.join(" ").slice(22);
  if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.reply("That user can't be kicked!");

  let banEmbed = new Discord.RichEmbed()
  .setDescription("Ban")
  .setColor("#ff0000")
  .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Banned In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", bReason)

  let indecents = message.guild.channels.find(`name`, `indecents`);
  if(!indecents) return message.channel.send("Couldn't find indecents channel.")

  message.guild.member(bUser).ban(bReason);
  indecents.send(banEmbed);
}

module.exports.help = {
  name: "ban"
}
