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

  let sChannel = channel.guild.channels.find(`name`, "log");
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

  let xp = require("./xp.json");
  let xpAdd = Math.floor(Math.random() * 7) + 8;

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1,
      prestige: 0
    };

  }

  let nxtLvl = xp[message.author.id].level * 300;
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let prestige = xp[message.author.id].prestige;
  let difference = nxtLvl - curxp;

  xp[message.author.id].xp = curxp + xpAdd;

  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    xp[message.author.id].prestige = prestige + 1;

    if(xp[message.author.id].level === 100){
      xp[message.author.id].prestige + 1;
      let presEmbed = new Discord.RichEmbed()
      .setAuthor(message.author.username)
      .setColor("#ff0000")
      .addField("Level", curlvl + 1,true)
      .addField("XP", curxp,true)
      .addField("Prestige", prestige + 1,true)
      .setFooter(`${difference} XP till next level up!`, message.author.displayAvatarURL);

      message.channel.send(presEmbed).then(msg => {msg.delete(5000)});
    }
  }

  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });

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
