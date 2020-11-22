const Discord = require('discord.js');
var read_cfg = require('./read_cfg')

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(read_cfg.getToken());
