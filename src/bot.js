const Discord = require('discord.js');
const fetch = require('node-fetch');
const { constants } = require('buffer');
const read_cfg = require('./read_cfg')

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(read_cfg.getToken())

client.on('message', message => {
    if (!message.content.startsWith(read_cfg.getPrefix()) || message.author.bot) return;
    var command = message.content.substring(1)

    console.log('[RECIEVED]' + command)

    var args = command.split(/ +/)

    if(command == "ping"){
        message.channel.send('pong.')
    }

    if((/pokemon [a-zA-Z0-9 ]+/).test(command)){
        fetch('https://pokeapi.co/api/v2/pokemon/' + args[1])
            .then(response => response.json())
            .then(json => message.channel.send("Here is " + json.name, { files: [json.sprites["front_default"]] }));
    }

});