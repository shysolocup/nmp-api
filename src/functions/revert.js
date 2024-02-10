const Client = require('../index.js');
const { Soup } = require('stews');
import('node-fetch');


module.exports = (client, shandle) => 
Client.newF("revert", async function(mid) {
    const gid = this.guildId;

    const ret = {
        id: null,
        newData: new Soup(Object),
        oldData: new Soup(Object),
        guildId: gid
    }

    let getted = await this.get(mid);
    
    let { newData, oldData, id } = await this.post( getted.data );
    [ ret.newData, ret.oldData, ret.id ] = [ newData, oldData, id ];

    await this.events.revert.fire(ret, this);

    return ret;
});
