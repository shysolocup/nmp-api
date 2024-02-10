const Client = require('../index.js');
const { Soup } = require('stews');
import('node-fetch');


module.exports = (client, shandle) => 
Client.newF("get", async function(mid) {
    let sid = this.storeId;
    let gid = this.guildId;

    const ret = {
        id: null,
        data: new Soup(Object),
        guildId: gid
    }

    const channel = await shandle(sid, gid);

    const ctx = (mid) ? await channel.messages.fetch(mid) : (await channel.messages.fetch()).first();
    if (!ctx) return ret;

    let link = ctx.attachments.first().url;

    let data = await fetch(link, { method: "Get" } );
    let json = await data.json();

    json = Soup.from(json);
    json = json.sortBy( json.values, (a, b) => b - a );

    ret.data = json;
    ret.id = ctx.id;

    await this.events.get.fire(ret, this);

    return ret;
});
