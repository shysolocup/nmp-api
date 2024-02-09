Array.prototype.fire = async function(...args) {
    for (let f of this) { await f(...args); }
}
