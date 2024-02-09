const { Client } = require('../index.js');


module.exports = (client, shandle) =>
Client.newF("set", async function(...args) {
    var [ value, uid ] = [ 
        args.filter( a => typeof a == "number" )[0], 
        args.filter( a => typeof a == "string" )[0] 
    ]

    const { data } = await this.get();
    const gid = this.guildId;

    const ret = {
        id: null,
        value: value,
        bal: 0,
        oldBal: 0,
        newBal: 0,
        newData: {},
        oldData: {},
        guildId: gid
    }

    if (data[uid]) ret.oldBal = data[uid];
    ret.newBal = value;
    data[uid] = value;
    ret.bal = value;
    
    let { newData, oldData, id } = await this.post(data);
    [ ret.newData, ret.oldData, ret.id ] = [ newData, oldData, id ];
    Object.defineProperty(ret, "name", { value: "SetBalance" });

    await this.events.set.fire(ret, this);

    return ret;
});
