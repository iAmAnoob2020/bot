const Discord = require("discord.js");
const ms = require("ms");

module.exports.run = async (bot,message,args) => {

  if(args[0] == "help"){
    message.reply("Usage: !mute <user> <length: 1s/m/h/d>");
    return;
  }
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("You dont have permission!");
  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.reply("Couldn't find user.");
  if(tomute.hasPermission("ADMINISTRATOR")) return message.reply("Can't mute them!");
  let reason = args.slice(2).join(" ");
  if(!reason) return message.reply("Please specify your reason!")
  console.log("Reason:", reason)
  let muterole = message.guild.roles.find(`name`, "muted");
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "muted",
        color: "ff0000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  let mutetime = args[1];
  if(!mutetime) return message.reply("You didn't specify a time period!");

  message.delete().catch(O_o=>{});

  try{
    await tomute.send("Hi! You've been muted for ${mutetime}. Sorry!");
  }catch(e){
    message.channel.send(`A user has been muted and their DMs are locked! They're muted for ${mutetime}.`)
  }

  let muteembed = new Discord.RichEmbed()
  .setDescription(`Muted by ${message.author}`)
  .setColor("#ff0000")
  .addField("Muted User", tomute)
  .addField("Muted in", message.channel)
  .addField("Muted at", message.createdAt)
  .addField("Muted for", mutetime)
  .addField("Reason", reason)

  let indecents = message.guild.channels.find(`name`, "indecents");
  if(!indecents) return message.reply("Couldn't find the indecents channel.");
  indecents.send(muteembed);

  await(tomute.addRole(muterole.id));

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    message.channel.send(`<@${tomute.id}> has been unmuted!`)
  }, ms(mutetime));

}

module.exports.help = {
  name: "mute"
}
