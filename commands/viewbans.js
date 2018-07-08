const Discord = require('discord.js');
const table = require('table');
const send = require("quick.hook");

module.exports.run = async (bot, message, args) => {

    let ban = await message.guild.fetchBans().catch(error => {
        return message.channel.send('You dont have permission!');
    });

    ban = ban.array();
    let users = message.guild.fetchBans().id;

    let possiblebans = [
        ['']
    ];
    ban.forEach(function(ban) {
        possiblebans.push(["- " + ban.username + `\n`]);
    })

    const embed = new Discord.RichEmbed()
    .setColor("#ff0000")
    .addField('Bans', `${possiblebans}`);
    send(message.channel, embed, {
        name: 'Project KillMe'
    });
};

module.exports.help = {
    name: "viewbans"
}
