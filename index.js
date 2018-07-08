const config = require("./config.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disabledEveryone: true});
bot.commands = new Discord.Collection();


fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`)
    bot.commands.set(props.help.name, props);
  });

});

fs.readdir("./commands/Economy/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find Economy.");
    return;
  }

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/Economy/${f}`);
    console.log(`${f} loaded!`)
    bot.commands.set(props.help.name, props);
  });

});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity(`${bot.guilds.size} servers!`, {type: "WATCHING"});
  bot.user.setStatus("idle");
});

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} joined the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
  welcomechannel.send(`Watch out! ${member} has just joined!`);
});

bot.on("guildMemberRemove", async member => {

  console.log(`${member.id} left the server.`);

  let welcomechannel = member.guild.channels.find(`name`, "welcome_leave");
  welcomechannel.send(`Sad times! ${member.id} has just left!`);
});

bot.on("channelCreate", async channel => {

  console.log(`${channel.name} has been created.`);

  let sChannel = channel.guild.channel.find(`name`, "log");
  sChannel.send(`${channel} has been created.`)
});

bot.on("channelDelete", async channel => {

  console.log(`${channel.name} has been deleted.`);

  let sChannel = channel.guild.channels.find(`name`, "log");
  sChannel.send(`${channel.name} has been deleted.`)
})

bot.on("message", async message => {

  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: config.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if(message.content.startsWith("ping")){
    message.channel.send('Pong! Your ping is `' + `${Date.now() - message.createdTimestamp}` + ' ms`');
  }
});

bot.login(config.token);
