var fs = require("fs")

exports.getToken = () => {

    var content = fs.readFileSync('discord.cfg')
    var json = JSON.parse(content)

    return json.token

}