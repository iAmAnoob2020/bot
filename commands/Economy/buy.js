const Discord = require('discord.js');
const economy = require('discord-eco');
const fs = require('fs');

module.exports.run = async (bot, message, args) => {

  const items = JSON.parse(fs.readFileSync('items.json', 'utf8'));

        // Item Info
        let itemName = '';
        let itemPrice = 0;
        let itemDesc = '';

        for (var i in items) { // Make sure you have the correct syntax for this.
            if (args.join(" ").trim().toUpperCase() === items[i].name.toUpperCase()) { // If item is found, run this...
                itemName = items[i].name;
                itemPrice = items[i].price;
                itemDesc = items[i].desc;
            }
        }

        // If the item wasn't found, itemName won't be defined
        if (itemName === '') {
            return message.channel.send(`Item ${args.join(" ").trim()} not found.`)
        }

        // Now, lets check if they have enough money.
        economy.fetchBalance(message.author.id).then((i) => { // Lets fix a few errors - If you use the unique guild thing, do this.
            if (i.money <= itemPrice) { // It's supposed to be like this instead...

                return message.channel.send(`You don't have enough money for this item.`);
            }

            // The broken item can be placed here

            // Variables - You want to set these up
            let breakChance = 15; // This is a precentage out of 100
            let refundAmount = 50; // This is a precentage out of 99 - You can't give a full refund because of the way the money is handled.
            let breakMessage = 'Your item was broken during transport!';

            // These generate the scenario
            let broken = Math.floor(Math.random() * (100 - 1 + 1) + 1); // This generates a random number between 1 - 100

            if (broken <= breakChance) { // Run this if the item was broken...

                    economy.updateBalance(message.author.id, parseInt(`+${itemPrice}`) * `0.${refundAmount}`).then((i) => {  // This takes the item, multiples it by the refund amount percentage. So if an items was $100, 100 * .50 is 50.

                        // Send a message that their item was broken.
                        message.channel.send(breakMessage);
                        let embed = new Discord.RichEmbed()
                        .setDescription("Damage Report")
                        .setColor("#ff0000")
                        .addField("Item Price", `${itemPrice}`)
                        .addField("Refund Amount", `${itemPrice / 2}`)

                        return message.channel.send({
                            embed
                        });

                    });

                    return; // Make sure we return when this is all over.

            }


            economy.updateBalance(message.author.id, parseInt(`-${itemPrice}`)).then((i) => {

                // You can have IF statements here to run something when they buy an item.
                if (itemName === 'Owner') {
                  let oRole = message.guild.roles.find(`name`, "Owner");
                  if(!message.member.roles.has(oRole.id)){
                    economy.updateBalance(message.author.id, parseInt(`-${itemPrice}`));
                    return message.reply("They already have that role.");
                  }else
                    (message.member.addRole(oRole.id));
                    return message.channel.send(`You bought ${itemName}!`);
                  }

                  if (itemName === 'Developer') {
                    let dRole = message.guild.roles.find(`name`, "Developer");
                    if(!message.member.roles.has(dRole.id)){
                      economy.updateBalance(message.author.id, parseInt(`-${itemPrice}`));
                      return message.reply("They already have that role.");
                    }else
                      (message.member.addRole(dRole.id));
                      return message.channel.send(`You bought ${itemName}!`);
                    }

            })

        })

    }

module.exports.help = {
  name: "buy"
}
