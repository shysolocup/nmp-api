const Client = require('nmp-api');


function toNMP(balance) {
	return Intl.NumberFormat().format(Math.round(balance*100)/100);
}


module.exports = (client, shandle) =>
Client.newF("consoleLb", async function() {
    let lb = await this.leaderboard((place, bal, am, i) => {
		let amount = 7;
		
		bal = Soup.from(bal).filter( (v, i) => { return i < amount+1 });
		if (bal.length >= amount+1) bal.set(amount, "-");
		bal = bal.join("");
		
		return `${place}:  ${(i<9)?" ":""} ${bal}   •   ${toNMP(am)} NMP`;
	});

    return [ 
		"|====== NMP LEADERBOARD =====|\n", 
		lb.join("\n"), 
		"\n|=============================|\n\n\n" 
		
	].join("\n");
});
