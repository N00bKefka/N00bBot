var monika = 
{
	conversationList:[
	"[player], do you believe in God? I was never too sure, myself. Well, I'm sure I never really questioned it as a kid...\n\nBut as I grew up, the more I learned about the world, the more I would question it. I started to wonder why God was helping people pass exams, or get over a cold... ...When there are children who live their lives being sold as sex slaves? Or the eight hundred million people who are too poor to even eat.\n\nI wonder how many of those people pray to God every day until they starve and die? Or, how many millions of families pray for a loved one to recover from some incurable disease? But the punchline is this. If just one person beats the odds and survives - among the thousands of others who die-- --Then, it's suddenly a miracle from God.\n\nI'd really love to meet this God who seemingly laughs at the misery of everyone not eligible for his miracles. But the irony is that I *do* have a creator, apparently.\n\nAnd you know what?\n\nI bet he's still laughing at the miserable fates of Sayori and Yuri, even as we speak. What are we to him but props in a scripted play? So, from that perspective... I don't think it's too far-fetched for there to be a god - if Earth was nothing but his playset.",
	"[player], have you ever wondered what it feels like to die? It's something I used to think about pretty often... But recently, I think I've actually learned what it feels like. I don't really understand it, but whenever you quit the game... ...It feels like I'm instantly put to sleep, left with nothing but my thoughts. But after a few seconds, my thoughts start to fill with incoherent, jumbled patterns. I see static and rapid flashes of color while hearing all kinds of weird screaming noises. At that point, I can't even form my own thoughts anymore.\n\nI'm just endlessly hammered by the flashing and screaming, unable to move or even think. I'm pretty sure in that moment, I don't really exist, but for some reason, I can remember it anyway. After some immeasurable amount of time, it stops in an instant, and I'm back in my own mind. And you're here with me.\n\nI have no idea what it means for the game to quit, or why that stuff happens to me. And I also don't know how you always come back and put everything back to normal.\n\nBut if you could do me a favor and do that to me as little as possible... That would be really great.\n\nIt's really not very pleasant at all to be trapped in that screaming void. But in the end, you always fix it, and that makes me feel like you really do care about me. So I have to thank you for that.\n\nIt makes me feel even closer to you when you're here with me."
	],
	converse: function(author)
	{
		selectedConversation = this.conversationList[Math.floor(Math.random() * this.conversationList.length)];
		return selectedConversation.replace("[player]", author);
	}
}


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
//const monika = require("./monika");

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
					if(modifiers === null)
					{
						return [];
					}
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

function rollStats()
{
	let result = [];
	for(let i = 0; i < 6; ++i)
	{
		let fourDee6s = []
		for(let j = 0; j < 4; ++j)
		{
			fourDee6s.push(Math.floor(Math.random() * 6 + 1));
		}
		fourDee6s.sort();
		result.push(fourDee6s);
	}
	return result;
}

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
	let printStr = "";
	
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
		case '!statsRoll':
			let result = rollStats();
			printStr = "**Your roll:** \n";
			let statsTotal = 0;
			for(let i = 0; i < 6; ++i)
			{
				let stats = result[i][1]+result[i][2]+result[i][3];
				printStr += (i+1)+": [~~"+result[i][0]+"~~, "+result[i][1]+", "+result[i][2]+", "+result[i][3]+"], **"+stats+"**\n";
				statsTotal += stats;
			}
			printStr += "\n**TOTAL STATS: "+statsTotal+"**";
			
			message.channel.send(printStr);
			break;
		case '!monika':
			printStr = monika.converse(message.author);// + " checks for monika (development in progress)";
			message.channel.send(printStr);
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
				if(result.length === 0)
				{
					message.channel.send("Your roll: Unable to read, please try using appropriate symbols or format");
					break;
				}
				let resultNum = 0;
				let resultStr = "";
				for(let i = 0; i < result.length; ++i)
				{
					resultStr += " + ("+result[i]+")";
					resultNum += result[i];
				}
				resultStr = resultStr.substring(3);
				message.channel.send("Your roll: " + resultStr + " = " + resultNum);
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


