const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.reply("You dont have permission!");
  if(args[0] == "help"){
    message.reply("Usage: !kick <user> <reason>");
    return;
  }
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser) return message.channel.reply("<@${member.author}>, Couldn't find the user.");
  let kReason = args.join(" ").slice(22);
  if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.reply("That user can't be kicked!");

  let kickEmbed = new Discord.RichEmbed()
  .setDescription("Kick")
  .setColor("#ff0000")
  .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
  .addField("Kicked By", `<@${message.author.id}> with ID: ${message.author.id}`)
  .addField("Kicked In", message.channel)
  .addField("Time", message.createdAt)
  .addField("Reason", kReason)

  let indecents = message.guild.channels.find(`name`, `indecents`);
  if(!indecents) return message.channel.send("Couldn't find indecents channel.")

  message.guild.member(kUser).kick(kReason);
  indecents.send(kickEmbed);
}

module.exports.help = {
  name: "kick"
}
