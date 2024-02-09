const { Soup } = require('stews');
const { Client } = require('../index.js');


module.exports = (client, shandle) =>
Client.newF("add", async function(...args) {

    var [ amount, uid, awarded ] = [ 
        args.filter( a => typeof a == "number" )[0], 
        args.filter( a => typeof a == "string" )[0],
        !!args.filter( a => typeof a == "boolean" )[0] 
    ]

    const { data } = await this.get();
    const gid = this.guildId;

    const ret = {
        storeId: null,
        amount: uid,
        bal: 0,
        oldBal: 0,
        newBal: 0,
        newData: new Soup(Object),
        oldData: new Soup(Object),
        guildId: gid,
        awarded: awarded
    }

    if (data[uid]) ret.oldBal = data[uid];
    ret.newBal = ((data[uid]) ? data[uid] : 0) + amount;
    data[uid] = ret.newBal;
    ret.bal = ret.newBal;
    
    let { newData, oldData, id } = await this.post(data);
    [ ret.newData, ret.oldData, ret.id ] = [ newData, oldData, id ];


    if (ret.newBal > ret.oldBal) {
        Object.defineProperty(ret, "name", { value: "AddBalance" });
        await this.events.add.fire(ret, this);
    }
    else {
        Object.defineProperty(ret, "name", { value: "RemoveBalance" });
        await this.events.remove.fire(ret, this);
    }


    return ret;
})
