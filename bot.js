/*var Discord = require('discord.io');
var logger = require('winston');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';*/
const Discord = require("discord.js");
//import {d20} from 'd20';
//const d20 = required("d20");
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

var d20 = {

    /**
     * Roll a number of dice and return the result.
     *
     * @param dice Type of dice to roll, can be represented in various formats:
     *               - a number (6, 12, 42)
     *               - dice syntax (d20, 4d6, 2d8+2)
     * @param verbose Whether or not all dice rolls should be returned as an array
     * @return Number|Array
     */
    roll: function(dice, verbose) {
        var result = d20.verboseRoll(dice),
            num = 0;

        if(verbose) {
            return result;
        } else {
            for (var i in result) {
                num += result[i];
            }

            return num;
        }
    },

    /**
     * Roll a number of dice and return the result as an array.
     *
     * @param dice Type of dice to roll, can be represented in various formats:
     *               - a number (6, 12, 42)
     *               - dice syntax (d20, 4d6, 2d8+2)
     * @return Array
     */
    verboseRoll: function(dice) {
        var amount = 1,
            mod = 0,
            results = [],
            match,
            num,
            modifiers;

        if (!dice) {
            throw new Error('Missing dice parameter.');
        }

        if (typeof dice == 'string') {
            match = dice.match(/^\s*(\d+)?\s*d\s*(\d+)\s*(.*?)\s*$/);
            if (match) {
                if (match[1]) {
                    amount = parseInt(match[1]);
                }
                if (match[2]) {
                    dice = parseInt(match[2]);
                }
                if (match[3]) {
                    modifiers = match[3].match(/([+-]\s*\d+)/g);
                    for (var i = 0; i < modifiers.length; i++) {
                        mod += parseInt(modifiers[i].replace(/\s/g, ''));
                    }
                }
            } else {
                parseInt(dice);
            }
        }

        if (isNaN(dice)) {
            return [];
        }

        for (var i = 0; i < amount; i++) {
            /* We dont want to ruin verbose, so we dont skip the for loop */
            if(dice !== 0){
                num = Math.floor(Math.random() * dice + 1);
            }else{
                num = 0;
            }
            results.push(num);
        }

        results = results.sort(function(a, b) {
            return a - b;
        });
        if (mod != 0) {
            results.push(mod);
        }

        return results;
    }
};

if (typeof window != 'undefined') {
    window.d20 = d20;
} else if (typeof exports != 'undefined') {
    for (var k in d20) {
        exports[k] = d20[k];
    }
};

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
				let diceCheck = message.content.substring(strSplit[0].length);
				let result = d20.roll(diceCheck, true);
				let resultNum = 0;
				let resultStr = "";
				for(let i = 0; i < result.length; ++i)
				{
					resultStr += ' + ('+result[i]+')';
					resultNum += result[i];
				}
				resultStr = resultStr.substring(3);
				message.channel.send("Your roll:" resultStr + " = " + resultNum);
				//message.channel.send("Testing...");
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
