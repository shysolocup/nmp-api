const { Soup } = require('stews');
const { Client } = require('../index.js');


module.exports = (client, shandle) =>
Client.newF("clear", async function() {
    const gid = this.guildId;

    const ret = {
        id: null,
        newData: new Soup(Object),
        oldData: new Soup(Object),
        guildId: gid
    }
    
    let { newData, oldData, id } = await this.post({});
    [ ret.newData, ret.oldData, ret.id ] = [ newData, oldData, id ];

    await this.events.clear.fire(ret, this);

    return ret;
})
