const fetch = require('node-fetch');
let LeagueAPI = require('leagueapiwrapper')
const read_cfg = require('./read_cfg')
const embededs = require('./embededs.js');
const { Console } = require('console');

LeagueAPI = new LeagueAPI(read_cfg.getLeagueAPI(), Region.EUW)

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

exports.ingame = (message) => {
    var command = message.content.substring(1)

    var args = command.split(/ +/)

    LeagueAPI.getSummonerByName(args[1])
        .then(accountInfo => {
            // do something with accountInfo
            return LeagueAPI.getActiveGames(accountInfo)
        })
        .then(games => message.channel.send(args[1] + ' is in game'))
        .catch(err => message.channel.send(args[1] + ' is not in game'))
}

exports.match_history = (message) => {
    var command = message.content.substring(1)

    var args = command.split(/ +/)
     
    // Gets matches for Account
    LeagueAPI.initialize().then( () => { return LeagueAPI.getSummonerByName(args[1]) }) 
        .then((accountInfo) => { return LeagueAPI.getMatchList(accountInfo) })
        .then(games => {

            // Gets last 5 games match details
            var fivegames = games.matches.slice(0,5)
            Promise.all(fivegames.map(element =>{
                return LeagueAPI.getMatch(element.gameId)
            }))
            .then(gamesContent => {
                var gamesParticipantId = []


                // Check the participantId for last 5 matches
                for(var i = 0; i < gamesContent.length; i++){
                    var identities = gamesContent[i].participantIdentities
                    for (var j = 0; j < identities.length ; j++){
                        if (identities[j].player.summonerName.toUpperCase() == args[1].toUpperCase())
                            gamesParticipantId.push(j)
                    }
                    
                }

                // Use participantID to get personal stats and build embed with them
                for(var k = 0; k < gamesParticipantId.length; k++){
                    var game = gamesContent[k].participants[gamesParticipantId[k]]
                    message.channel.send(embededs.matchHistoryEmbeded(game.championObject.id,game.stats))
                }
            })
            .catch(err => {
                console.log(err)
            })
        })
        .catch(err => console.log(err))
}