Function.prototype.debounce = function(time){
  var func = this;

  return function(){
    Em.run.debounce(this, func, time);
  };
};
