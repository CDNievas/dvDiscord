// Init
var Discord = require("discord.js");
var bot = new Discord.Client();
var handler = require("./handler");

const token = process.env.DVDISCORD

// Listener: Init Bot
bot.on("ready", async () => {
    console.log("DaVinci Discord Bot by CDNievas");
    console.log("Node Version: " + process.version);
    console.log("Discord.js Version: " + Discord.version);
});

// Listener: Receive Messages
bot.on("message", message => {
    handler.analizarMsg(message);
});

// Listener: New member on server
bot.on("guildMemberAdd", member => {
	handler.nuevoMiembro(member);
});

bot.login(token);
