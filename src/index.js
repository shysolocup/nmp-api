// client data

const { Client } = require('noscord.js');
const client = new Client({ prefix: "." });
client.import("channels", "util");


const { Soup } = require('stews');
const aepl = require('aepl');
const fs = require('fs');


const shandle = require('./extras/StoreHandle')(client);
require('./extras/OrdinalHandle');
require('./extras/EventFire');


aepl.init("NmpClient", class {
    constructor(storeId, settings={}) {

        this.guildId = null;
        this.storeId = storeId;
        this.winAmount = (settings.winAmount) ? settings.winAmount : 15;


        this.events = {};

        [ "ready", "get", "post", "set", "remove", "add", "rename", "delete", "win", "clear" ]
        .forEach( (ev) => {
            this.events[ev] = []; 
        });


        client.on("ready", async () => {
            await this.events.ready.fire(this);
        });
    }

    start(token, gid) {
        this.guildId = gid
        client.login(token);
    }
});



// exports
module.exports = NmpClient;
fs.readdirSync(`${__dirname}/functions`).forEach( file => require(`./functions/${file}`)(client, shandle) );
