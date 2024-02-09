const { Client } = require('../index.js');
const { Soup } = require('stews');


module.exports = (client, shandle) =>
Client.newF("rename", async function(oldUid, newUid) {
    const { data } = await this.get();
    const gid = this.guildId;

    const ret = {
        id: null,
        bal: 0,
        oldName: oldUid,
        newName: newUid,
        newData: new Soup(Object),
        oldData: new Soup(Object),
        guildId: gid
    }

    let bal = (data[oldUid]) ? data[oldUid] : 0; 

    delete data[oldUid];
    data[newUid] = bal;
    ret.bal = bal;
    
    let { newData, oldData, id } = await this.post(data);
    [ ret.newData, ret.oldData, ret.id ] = [ newData, oldData, id ];

    await this.events.rename.fire(ret, this);

    return ret;
})
