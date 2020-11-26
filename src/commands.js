const fetch = require('node-fetch');
let LeagueAPI = require('leagueapiwrapper')
const embededs = require('./embededs.js')

exports.pokemon = (message) => {
    var command = message.content.substring(1)

    var args = command.split(/ +/)

    fetch('https://pokeapi.co/api/v2/pokemon/' + args[1])
        .then(response => response.json())
        .then(json => message.channel.send("Aqui está o " + json.name, { files: [json.sprites["front_default"]] }));
}

exports.ping = (message) => {
    message.channel.send('pong.')
}


function shuffleArray(array){
    var shuffle = []
    var l = array.length
    while(shuffle.length != l){
        var pos = Math.floor(Math.random() * array.length)
        shuffle.push(array[pos])
        array.splice(pos,1)
    }
    return shuffle
}

exports.teams = (message) => {
    var voiceChannel = message.member.voice.channel
    var members = [];
    if (!voiceChannel) message.channel.send('Não estás num canal de voz...')
    else {
        voiceChannel.members.forEach((k, v) => {
            members.push(k.displayName)
        })

        const shuffledMembers = shuffleArray(members)

        const half = Math.ceil(shuffledMembers.length / 2);

        const firstHalf = shuffledMembers.splice(0, half)
        const secondHalf = shuffledMembers.splice(-half)

        const teamnames = ['Mongos','Nabos','Cornos','Lixo','Cegos','Podres','Iron','Trengos','Feios', 'Fracos']

        const r1 = Math.floor(Math.random() * teamnames.length)
        const r2 = Math.floor(Math.random() * teamnames.length)

        message.channel.send(embededs.teamEmbeded(firstHalf,'#DD1100',teamnames[r1]))
        message.channel.send(embededs.teamEmbeded(secondHalf, '#0077FF', teamnames[r2]))

    }
}

exports.ingame = () => {
    //Fill with league api calls
}