/**
  This mixin adds support for being notified every time the browser window
  is scrolled.

  @class Scrolling
  @extends Ember.Mixin
**/
App.Scrolling = Em.Mixin.create({

  /**
    Begin watching for scroll events. By default they will be called at max every 100ms.
    call with {debounce: N} for a diff time

    @method bindScrolling
  */
  bindScrolling: function(opts) {
    opts = opts || {pixels: 100};

    var scrollingMixin = this,
        onScrollMethod;

    onScrollMethod = function() {
      if($(window).scrollTop() + $(window).height() > $(document).height() - opts.pixels) {
        if (!(scrollingMixin.isDestroying || scrollingMixin.isDestroyed)){
          return scrollingMixin.get('controller').send('scroll');
        }
      }
    };

    App.ScrollingDOMMethods.bindOnScroll(onScrollMethod);
  },

  /**
    Stop watching for scroll events.

    @method unbindScrolling
  */
  unbindScrolling: function() {
    App.ScrollingDOMMethods.unbindOnScroll();
  }

});


/**
  This object provides the DOM methods we need for our Mixin to bind to scrolling
  methods in the browser. By removing them from the Mixin we can test them
  easier.

  @class ScrollingDOMMethods
**/
App.ScrollingDOMMethods = {

  bindOnScroll: function(onScrollMethod) {
    $(document).bind('touchmove.emberjs', onScrollMethod);
    $(window).bind('scroll.emberjs', onScrollMethod);
  },

  unbindOnScroll: function() {
    $(window).unbind('scroll.emberjs');
    $(document).unbind('touchmove.emberjs');
  }

};
