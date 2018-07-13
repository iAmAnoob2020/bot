const Discord = module.require('discord.js');

var jokes = [
  "What’s the difference between a G-spot and a golf ball?\nA guy will actually search for a golf ball.",
  "What does the sign on an out-of-business brothel say?\nBeat it. We’re closed.",
  "Why was the guitar teacher arrested?\nFor fingering a minor.",
  "What’s the difference between a tire and 365 used condoms?\nOne’s a Goodyear. The other’s a great year.",
  "Why does Santa Claus have such a big sack?\nHe only comes once a year.",
  "What’s the difference between a hooker and a drug dealer?\nhooker can wash her crack and resell it.",
  "What do the Mafia and pussies have in common?\nOne slip of the tongue, and you’re in deep shit.",
  "What did the banana say to the vibrator?\nWhy are you shaking? She’s gonna eat me!",
  "Why does Dr. Pepper come in a bottle?\nBecause his wife died.",
  "What’s the best part about sex with 28-year-olds?\nThere are twenty of them.",
  "What’s the difference between a pregnant woman and a lightbulb?\nYou can unscrew a lightbulb.",
  "What do you call a lesbian dinosaur?\nLick-a-lotta-puss.",
  "What’s the difference between a Catholic priest and a zit?\nzit will wait until you’re twelve before it comes on your face.",
  "What do a penis and a Rubik’s Cubes have in common?\nThe more you play with it, the harder it gets.",
  "What does one saggy boob say to the other saggy boob?\nIf we don’t get some support, people will think we’re nuts.",
  "What’s the best part about gardening?\nGetting down and dirty with your hoes.",
  "How is a girlfriend like a laxative?\nThey both irritate the shit out of you.",
  "What do you call the useless piece of skin on a dick?\nThe man.",
  "Why do vegetarians give good head?\nBeause they’re used to eating nuts.",
  "What’s long and hard and full of semen?\nsubmarine.",
  "What’s the difference between your wife and your job?\nAfter five years, your job will still suck.",
  "Why do walruses love a tupperware party?\nThey’re always on the lookout for a tight seal.",
  "What’s the difference between your boyfriend and a condom?\nCondoms have evolved: They’re not so thick and insensitive anymore.",
  "Why did God give men penises?\nSo they’d have at least one way to shut a woman up.",
  "What’s the difference between anal and oral sex?\nOral sex makes your day. Anal makes your hole weak.",
  "What did the penis say to the vagina?\nDon’t make me come in there!",
  "What do a woman and a bar have in common?\nLiquor in the front, poker in the back.",
  "What’s another name for a vagina?\nThe box a penis comes in.",
  "What’s the difference between a pick-pocket and a peeping tom?\nOne snatches your watch. The other watches your snatch.",
  "What do you call two jalapeños getting it on?\nFucking hot!",
  "How do you make your girlfriend scream during sex?\nCall and tell her about it.",
  "What’s the difference between your dick and a bonus check?\nSomeone’s always willing to blow your bonus.",
  "How is life like a penis?\nYour girlfriend makes it hard.",
  "Why do women have orgasms?\nJust another reason to moan, really.",
  "What do you call a guy with a small dick?\nJust-in!",
  "What do you call a guy with a giant dick?\nPhil!",
  "What do you call someone who refuses to fart in public?\nA private tutor.",
  "What do you call a virgin lying on a waterbed?\nA cherry float.",
  "Know what a 6.9 is?\nAnother good thing screwed up by a period.",
  "How is sex like a game of bridge?\nIf you have a great hand, you don’t need a partner.",
  "What do boobs and toys have in common?\nThey were both originally made for kids, but daddies end up playing with them.",
  "What do spinach and anal sex have in common?\nIf you were forced to have it as a kid, you'll hate it as an adult.",
  "Whats the difference between jelly and jam?\nI cant jelly my dick in your ass."
];

module.exports.run = async (bot, message, args) => {

      var DAD = new Discord.RichEmbed()
      .setDescription(jokes[Math.floor(Math.random() * jokes.length)])

      .setColor("0x#FF0000")

      message.channel.send(DAD);

}

module.exports.help = {
    name: "sexjoke"
}
