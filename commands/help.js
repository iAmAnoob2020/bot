const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  let helpembed = new Discord.RichEmbed()
  .setDescription("Public Commands")
  .setColor("#ff0000")
  .addField("help", "Lists all commands available for the user.")
  .addField("serverInfo", "Lists information about the Server.")
  .addField("botInfo", "Lists information about the Bot.")
  .addField("report", "Allows users to report another user. Help: !report help")
  .addField("balance", "Shows the user the amount of money they've collected!")
  .addField("store", "Allows the user to see what's purchasable")
  .addField("buy", "Allows the user to buy an item!")
  .addField("sell", "Allows the user to sell an item!")
  .addField("8ball", "Allows the user to ask a question and have a random answer generated!")
  .addField("guilds", "Shows the servers the Bot is on.")
  .addField("sexjoke", "Shows a sexual joke in the channel.")
  .addField("dadjoke", "Shows a dad joke in the channel");

  message.channel.send(helpembed);

  if(message.member.hasPermission("MANAGE_MESSAGES")){
  let modembed = new Discord.RichEmbed()
  .setDescription("Private Commands")
  .setColor("#ff0000")
  .addField("addrole", "Gives the user a specified role. Help: !addrole help")
  .addField("removerole", "Removes a specified role from a user. Help: !removerole help")
  .addField("kick", "Kicks the user from the server. Help: !kick help")
  .addField("warn", "Warns the user in the server. Help: !warn help")
  .addField("warnlevel", "Shows the amount of warnings the user has. Help: !warnlevel help")
  .addField("ban", "Bans the user from the server. Help: !ban help")
  .addField("prefix", "Allows the user to set a desighed Prefix. Help: !prefix")
  .addField("say", "Allows the user to tell the bot to say something of their choice. Help: !say help")
  .addField("clear", "Allows the user to clear a certain amount of messages. Help: !clear help")
  .addField("payday", "Allows the user to give another user a £1000 payday!")
  .addField("payfine", "Allows the user to make another user pay a fine of £500!")
  .addField("viewbans", "Allows the user to see all bans on the server!")
  .addField("restart", "Allows the user to restart the Bot!")
  .addField("kill", "Allows the user to kill the bot!")
  .addField("start", "Allows the user to start the bot!")
  .addField("activity", "Allows the user to change the activity of the Bot!")
  .addField("status", "Allows the user to change the status of the Bot!");

  try{
    await message.author.send(modembed);
    message.react("👊");
  }catch(e){
    message.reply("Your DMs are locked. I cannot send you the mod commands.");
  }
}
}


module.exports.help = {
  name: "help"
}
