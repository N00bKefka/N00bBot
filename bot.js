var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            case 'intro':
                bot.sendMessage({
                    to: channelID,
                    message: 'Hello! I am N00b Bot, I am created by Master N00bKefka,'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});

//Sending a message to a channel when user joins
bot.on("guildMemberAdd", (member) => 
{
	var role = member.guild.roles.find("name", "User");
	member.addRole(role);
	
	member.guild.channels.get('548064672029474826').send("Well met @" + member.user.username + "! Stay a while and listen...");
	
});

//Sending a message to a channel when user leaves
bot.on("guildMemberRemove", (member) => 
{
	member.guild.channels.get('548090533717737475').send(member.user.username + " did not stayed a while and listen...");
});