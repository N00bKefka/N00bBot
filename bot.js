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
