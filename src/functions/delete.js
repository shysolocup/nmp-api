const { Soup } = require('stews');
const Client = require('../index.js');


module.exports = (client, shandle) =>
Client.newF("delete", async function(uid) {
    const { data } = await this.get();
    const gid = this.guildId;

    const ret = {
        id: null,
        name: uid,
        bal: 0,
        newData: new Soup(Object),
        oldData: new Soup(Object),
        guildId: gid
    }

    let bal = (data[uid]) ? data[uid] : 0; 

    delete data[uid];
    ret.bal = bal;
    
    let { newData, oldData, id } = await this.post(data);
    [ ret.newData, ret.oldData, ret.id ] = [ newData, oldData, id ];

    await this.events.delete.fire(ret, this);

    return ret;
})
