Array.prototype.sum = function(){
  return this.reduce(function(a, b){
    return a + b;
  });
};

Array.prototype.toInts = function(){
  return this.map(function(val){
    return parseInt(val, 10);
  });
};

Array.prototype.all = function(){
  return this.every(function(x){
    return !!x;
  });
};

Ember.Enumerable.reopen({
  toInts: Array.prototype.toInts,
  sum: Array.prototype.sum,
  all: Array.prototype.all
});
