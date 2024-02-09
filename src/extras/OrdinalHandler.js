Number.prototype.ordinal = function() {
    if (this > 3 && this < 21) return `${this}th`;
    switch (this % 10) {
      case 1:  return `${this}st`;
      case 2:  return `${this}nd`;
      case 3:  return `${this}rd`;
      default: return `${this}th`;
    }
};
