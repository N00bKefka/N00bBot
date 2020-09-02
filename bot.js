/*var Discord = require('discord.io');
var logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';*/
const Discord = require("discord.js");
const d20 = required('d20');
//var auth = require('./auth.json');

// Initialize Discord Bot
var bot = new Discord.Client();

/*
const { Client } = require('pg');

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

db.connect();

db.query('SELECT table_schema,boomer_counter FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  db.end();
});
*/
//console.log(bot);

bot.on("ready", () => {
  console.log("I am ready!");
});
 
bot.on("message", (message) => {
	let strSplit = message.content.split(" ");

	if(strSplit.length === 1)
	{
		switch(message.content)
		{
		case '!intro':
			message.channel.send("Hello! I am N00b Bot, I am created by Master N00bKefka!");
			break;
		case '!sparkJoy':
			message.channel.send("(◕ᴗ◕✿) Does this... Spark joy?! (ʘ‿ʘ✿)");
			break;
		case '!moriohChoGreet':
			message.channel.send("MORI MORI Mori mori... Morioh cho RADIO!~ \nGudo Morning! Ohayo gozaimasu! Morioh cho Radio!");
			break;
		case '!QueryDB':
			if(message.author.id == 51533228061757440 && message.content == "!QueryDB")
			{
			  message.channel.send("Database is currently not available.");
			}
			break;
		case '!r':
		case '!roll':
			message.channel.send("!r <x>d<y> where <x> is how many dice you want to roll and y is how many face you want to roll.");
			break;
		}
	}
	else
	{
		switch(strSplit[0])
		{
			case '!r':
			case '!roll':
				let diceVerbose = message.content.substring(strSplit[0].length);
				message.channel.send(d20.roll(diceVerbose));
				break;
		}
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
	member.guild.channels.get('548090533717737475').send(member.user.username + " did not stay a while and listen...");
});

bot.login(process.env.BOT_TOKEN);
