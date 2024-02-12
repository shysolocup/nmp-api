const { Soup } = require('stews');
const Client = require('../index.js');

const def = require('../extras/DefaultShopImage.json');


module.exports = (client, shandle) =>
Client.newF("shop", function(settings={}) {
    client.import("comp");

    /*{

        name: String ?: "Placeholder",
        image: String/Attachment ?: DefaultShopImage,
        items: [
            { name: String, price: Number, row: 1 }
        ],
        tip: {
            head: String ?: "TIP",
            body: String ?: "Placeholder"
        },
        color: String ?: "#EA7E00"

    }*/

    let name = (settings.name) ? settings.name : "Placeholder";
    let image = (settings.image) ? settings.image : def;
    let tipHead = (settings.tip && settings.tip.head) ? settings.tip.head : "TIP";
    let tipBody = (settings.tip && settings.tip.body) ? settings.tip.body : "Placeholder";
    let color = (settings.color) ? settings.color : undefined;


    let items = Soup.from( ((settings.items) ? settings.items : []) );
    items = items.map( (item, i) => {
        return { 
            name: item.name, 
            value: `${item.price} NMP`, 
            line: (item.line) ? item.line : (item.row) ? item.row : undefined 
        };
    });

    
    return new Embed({
        header: { text: name, size: 2 },
        footer: `(${tipHead}: ${tipBody})`,

        fields: items.pour(),

        image: image,
        color: color
    });
});
