var fs = require("fs")

exports.getToken = () => {

    var content = fs.readFileSync('discord.cfg')
    var json = JSON.parse(content)

    return json.token

}

exports.getPrefix = () => {

    var content = fs.readFileSync('discord.cfg')
    var json = JSON.parse(content)

    return json.prefix

}

exports.getLeagueAPI = () => {

    var content = fs.readFileSync('discord.cfg')
    var json = JSON.parse(content)

    return json.league_api_key

}