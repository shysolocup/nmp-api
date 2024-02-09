const Client = require('../index.js');


module.exports = (client, shandle) =>
Client.newF("award", async function(uid) {
    let data = await this.add( this.winAmount, uid, true );
    Object.defineProperty(data, "name", { value: "WinningBalance" });

    await this.events.win.fire(data, this);

    return data;
});
