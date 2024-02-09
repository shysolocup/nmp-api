const { Client } = require('../index.js');


module.exports = (client, shandle) =>
Client.newF("on", function(event, f) {
    this.events[event].push(f);
    return f;
})
