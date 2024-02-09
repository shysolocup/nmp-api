var { ChannelType } = require('discord.js');


module.exports = (client) => async function StoreHandle(sid, gid) {
    let guild = await client._base.guilds.fetch(sid);

    let channel = guild.channels.cache.find( channel => channel.name == gid );

    if (!channel) {
        channel = await guild.channels.create({
            name: gid,
            type: ChannelType.GuildText
        });
    }

    return channel;
}
