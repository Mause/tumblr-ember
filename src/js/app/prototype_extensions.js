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
