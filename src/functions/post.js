const { Soup } = require('stews');
const { Client } = require('../index.js');
var { AttachmentBuilder} = require('discord.js');


module.exports = (client, shandle) =>
Client.newF("post", async function(postData) {
    let sid = this.storeId;
    let gid = this.guildId;

    const ret = {
        id: null,
        newData: new Soup(Object),
        oldData: new Soup(Object),
        guildId: gid
    }

    const channel = await shandle(sid, gid);
    const { id, data } = await this.get(gid);

    postData = Soup.from(postData);
    postData = postData.sortBy( postData.values, (a, b) => b - a );

    ret.newData = postData;
    ret.oldData = data;

    if (data.stringify() == postData.stringify()) {
        ret.id = id;
        return ret;
    }

    var att = new AttachmentBuilder(Buffer.from(`${ postData.stringify(null, 4) }`, 'utf-8'), {name: 'nmp-post.json'});
    
    let ctx = await channel.send({ files: [att] });
    ret.id = ctx.id;

    await this.events.post.fire(ret, this);

    return ret;
});
