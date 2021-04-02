//By Mayer Romany Iskander
require("events").EventEmitter.defaultMaxListeners = 200;
const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require("fs");
client.login(process.env.token)
const express = require("express");
const app = express();
app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});



const prefix = "!" // البرفيكس
//STATUS CODE
//By Mayer Romany Iskander
client.on("ready", () => {
console.log(`Logged As ${client.user.tag}`);
client.user.setActivity(`${client.user.username} | ${prefix}help `, { type: "PLAYING" }); // حاله البوت
});



//HELP CODE
//By Mayer Romany Iskander
client.on("message", message =>{
if(message.content.startsWith(`${prefix}help`)){ // امر الهيلب
let embed = new Discord.MessageEmbed()
.setTitle(`Help Menu`)//By Mayer Romany Iskander
.setAuthor(`${message.author.tag}`,message.author.avatarURL())
.setColor(`PURPLE`)
.setThumbnail(client.user.avatarURL())
.setDescription(`**
● | ${prefix}set-sug
● | ${prefix}sug - ${prefix}suggestion - ${prefix}اقتراح 
● | ${prefix}support
**`)
.setFooter(`This Bot Made By Mayer Romany`)

message.channel.send(embed)
}
})



//SET SUGGESTION ROOM CODE
//By Mayer Romany Iskander
let sugg = JSON.parse(fs.readFileSync("./sug.json", 'utf8'));
client.on('message', async message => {
if(message.author.bot) return undefined;
if(message.content.startsWith(prefix + 'set-sug')){

  if(!message.guild.member(client.user).hasPermission('ADMINISTRATOR')) return message.channel.send(`** > I Don't Have Permission**`) 

  if(!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(`**> You Don't Have \`ADMINISTRATOR\`**`)
var args1 = message.content.split(" ").slice(1).join(" ");    
let channel = message.mentions.channels.first() 
if(!args1) return message.channel.send(`> **Write Name Channel**`);
if(!channel) return message.channel.send(`> **there is no channel with this name ${args1}**`);
message.channel.send(`> **Done Selected Channel Suggestions**`);
sugg[message.guild.id] = {
channel: channel.name,    
}
fs.writeFile("./sug.json", JSON.stringify(sugg), (err) => {
if(err)
console.error(err);
})
}

})
// SUGGESTION CODE
//By Mayer Romany Iskander
client.on('message', async message => {
if(message.author.bot) return;
if(message.content.startsWith(prefix + 'suggestion') || message.content.startsWith(prefix + 'sug') || message.content.startsWith(prefix + 'اقتراح')){

let sugg11 = message.content.split(" ").slice(1).join(" ");
if(!sugg11) return message.channel.send(`> **Write Suggestion**`);
let room = message.guild.channels.cache.find(ro => ro.name === `${sugg[message.guild.id].channel}`);
if(!room) return message.channel.send(`> **Not Found Room**`);
let send21 = new Discord.MessageEmbed()
.setAuthor(`${message.guild.name}`, message.guild.iconURL())
.setDescription(`** New Suggestion :
${sugg11}
**`)
.setThumbnail(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
.setFooter(`${message.author.tag} | ${message.author.id}`)
.setColor('PURPLE')
room.send(send21).then(msg =>{
msg.react("✅")
msg.react("❌")
message.delete().then(c =>{
message.reply(`**Done Your Suggestion Has Been Sent**`)})
})
fs.writeFile("./sug.json", JSON.stringify(sugg), (err) => {
if(err)
console.error(err);
})
}
})

// SUPPORT CODE 
//By Mayer Romany Iskander
 client.on("message", message => {
  if (message.content === prefix + "support") {
  if(!message.guild.member(client.user).hasPermission('EMBED_LINKS')) return message.channel.send(`** > I Don't Have Permission \`__EMBED_LINKS__\`**`) 
if(message.author.bot || !message.guild)return;
message.channel.send(`**> Support Server \n[ https://discord.gg/TzjAR294sC ] **`)
  }
  });
