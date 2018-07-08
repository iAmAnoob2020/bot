const Discord = require("discord.js");
const Economy = require("discord-eco");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permission!");

  resetBot(message.channel);
       function resetBot(channel) {
           message.react('✅')
               .then(message => bot.destroy())
  }

}

module.exports.help = {
  name: "kill"
}
