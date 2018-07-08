const Discord = require("discord.js");
const Economy = require("discord-eco");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permission!");

  resetBot(message.channel);
       function resetBot(channel) {
           message.react('✅')
               .then(message => bot.destroy())
               .then(() => bot.login("NDYyNjcxMjQxMTUzNjA5NzMw.DhlPtg.7t9tzaiVRCvArn0DF8No2XSQGDM"));
  }

}

module.exports.help = {
  name: "restart"
}
