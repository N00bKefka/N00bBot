/*var Discord = require('discord.io');
var logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';*/
const Discord = require("discord.js");
//var auth = require('./auth.json');

// Initialize Discord Bot
var bot = new Discord.Client();

//console.log(bot);
bot.on("ready", () => {
  console.log("I am ready!");
});
 
bot.on("message", (message) => {
  switch(message.content)
  {
	case '!intro':
		message.channel.send("Hello! I am N00b Bot, I am created by Master N00bKefka!");
		break;
	case '!sparksJoy':
		message.channel.send("(◕ᴗ◕✿) Does this... Sparks joy?! (ʘ‿ʘ✿)");
		break;
  }
});

//Sending a message to a channel when user joins
bot.on('guildMemberAdd', member => 
{
	var role = member.guild.roles.find("name", "User");
	member.addRole(role);
	
	member.guild.channels.get('548064672029474826').send("Well met <@"+member.user.id+">! Stay a while and listen...");
	
});

//Sending a message to a channel when user leaves
bot.on('guildMemberRemove', member => 
{
	member.guild.channels.get('548090533717737475').send(member.user.username + " did not stayed a while and listen...");
});

bot.login(process.env.BOT_TOKEN);
