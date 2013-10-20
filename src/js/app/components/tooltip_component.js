App.BootstrapTooltipComponent = Em.Component.extend({
  title: null,
  layoutName: 'bootstrap-tooltip',

  didInsertElement: function() {
    var title = this.get('title'), $e;

    if (!Em.isEmpty(title)) {
      $e = $(this.get('element')).parent();

      $e.tooltip({
        title: title,
        placement: 'left',
        html: this.get('html') === 'yes'
      });
    }
  },

  willRemoveElement: function(){
    var $e = $(this.get('element')).parent();
    debugger;
  }
});
