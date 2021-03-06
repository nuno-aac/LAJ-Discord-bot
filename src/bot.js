const Discord = require('discord.js');
const read_cfg = require('./read_cfg')
const commands = require('./commands')

const client = new Discord.Client();

client.once('ready', () => {
    console.log('Ready!');
});

client.login(read_cfg.getToken())

client.on('message', message => {
    if (!message.content.startsWith(read_cfg.getPrefix()) || message.author.bot) return;

    console.log('[RECEIVED] ' + message.content)

    var command = message.content.substring(1)

    var args = command.split(/ +/)

    switch (args[0]) {
        case 'ping':
            commands.ping(message)
            break;
        case 'pokemons':
            commands.pokemon(message)
            break;
        case 'teams':
            commands.teams(message)
            break;
        case 'ingame':
            commands.ingame(message)
            break;
        case 'matches':
            commands.match_history(message)
            break;
    
        default:
            break;
    }

});