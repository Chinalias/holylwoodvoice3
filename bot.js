const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '.'

client.on('ready', () => {
  console.log('---------------');
  console.log(' Bot Is Online')
  console.log('---------------')
});


const YTDL = require('ytdl-core');
const nodeopus = require('node-opus');
const ffmpeg = require('ffmpeg');
var servers = {};
function play(connection, message, args) {
  var server = servers[message.guild.id];
  server.dispatcher = connection.playStream(YTDL(args[0]), {filter: "audioonly"});
  server.queue.shift();
  server.dispatcher.on("end", function() {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}


client.on('message', message =>{
  if(message.content.startsWith('join')){
    const voiceChannel = message.member.voiceChannel
    voiceChannel.join();
    message.channel.send("Connected to voice channel")
}})


client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
 if(message.content.startsWith(prefix + "savagejoin")) {
message.member.voiceChannel.join().catch(e => message.channel.send(e));
}
});



client.login(process.env.BOT_TOKEN);
