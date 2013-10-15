Array.prototype.sortBy = function(key){
  var get = Ember.get;

  return this.sort(function(a, b){
    return get(a, key) > get(b, key);
  });
};

Array.prototype.sum = function(){
  var total = 0;
  this.forEach(function(val){
    total += val;
  });
  return total;
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

Function.prototype.debounce = function(time){
  var func = this;

  return function(){
    Em.run.debounce(this, func, time);
  };
};
