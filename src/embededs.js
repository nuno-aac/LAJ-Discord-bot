const Discord = require('discord.js');

exports.teamEmbeded = (members,color,teamname) => {

    var exampleEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setTitle('Team ' + teamname)
        .setThumbnail('https://img.clasf.pt/2019/12/26/Lambretta-125-20191226121545.6975610015.jpg')
    
    members.forEach(element => {
        exampleEmbed.addField(element, 'Manco', true)
    });
    
    exampleEmbed.setTimestamp()
        .setFooter('Divirtam-se');

    return exampleEmbed;
}

exports.matchHistoryEmbeded = (champion, stats) => {
    var color
    if (stats.win) color = '#00AA00'
    else color = '#AA0000'
    var matchHistoryEmbed = new Discord.MessageEmbed()
        .setColor(color)
        .setThumbnail('https://cdn.mobalytics.gg/stable/champion/'+champion+'.png')
        .setTitle(champion)
        .addField('🗡️', stats.kills, true)
        .addField('💀', stats.deaths, true)
        .addField('👋', stats.assists, true)

    return matchHistoryEmbed;
}