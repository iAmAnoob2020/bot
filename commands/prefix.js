const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (bot, message, args) => {

  if(!message.member.hasPermission("MANAGE_SERVER")) return message.reply("You don't have permission!");
  if(!args[0] || args[0 == "help"]) return message.reply("Usage: !prefix <desired prefix>");

  let prefixes = JSON.parse(fs.readFileSync("./json/prefixes.json", "utf8"));

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./json/prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#ff0000")
  .setTitle("Prefix Set!")
  .setDescription(`Prefix set to ${args[0]}`);

  message.channel.send(sEmbed);

}

module.exports.help = {
  name: "prefix"
}
