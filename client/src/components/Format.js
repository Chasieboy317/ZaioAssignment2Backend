module.exports = {
  reduceString: function(x) {
    if (x==undefined) {return null;}
    return x.split(" ").slice(0, 40).join(' ')+"...";
  },

  formatNumber: function(x) {
    if (x==undefined) {return null;}
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  },

  formatType: function(x) {
    return `${x} Bedroom House`;
  },

  formatSize: function(x) {
  }
};
