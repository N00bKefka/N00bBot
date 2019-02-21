const Discord = require('discord.io');
const client = new Discord.Client();

client.on('ready', () => {console.log("Prepare to lift off!");});

client.on('message', message=>
{
  if(message.content === 'intro')
  {
    message.reply("Hello there! I am N00bBot! Very nice to meet you all :D")
  }
});

client.login(process.env.NTQ4MDY4MjM4MTIzMjA0NjE4.D0_-tA.D-GwEaEx3b3PRYRrNUBZYRWwMTA);
