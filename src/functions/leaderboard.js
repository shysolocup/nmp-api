const Client = require('../index.js');


module.exports = (client, shandle) =>
Client.newF("leaderboard", async function(f) {
    let { data } = await this.get();

    let stuff = [];

    data.forEach( (bal, amount, i) => {
        let place = i+1;
        stuff.push(f(place.ordinal(), bal, amount, i));
    });

    return stuff;
});
