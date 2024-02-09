const { Client } = require('../index.js');


module.exports = (client, shandle) =>
Client.newF("remove", async function(...args) {
    var [ amount, uid ] = [ 
        args.filter( a => typeof a == "number" )[0], 
        args.filter( a => typeof a == "string" )[0] 
    ];

    return await this.add( -amount, uid );
})
