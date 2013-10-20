Array.prototype.sortBy = function(key){
  var get = Ember.get;

  return this.sort(function(a, b){
    return get(a, key) > get(b, key);
  });
};

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

Ember.Enumerable.reopen({
  toInts: Array.prototype.toInts,
  sum: Array.prototype.sum,
  sortBy: Array.prototype.sortBy
});
