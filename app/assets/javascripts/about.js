$(document).ready(function() {
  var About = function() {
    var self = this;
    self.$trigger = $('.career_trigger');
    self.$trigger.on('click', function(ev) { self._rotateTarget(ev) });



/*

moving there is:

  1. toggleClass('next'); add the class 'next' to the targeted face.
  2. toggleClass('moving') to body to add the class 'moving'
  3. toggleClass('cube-state-initial') from #cube to remove
    body.moving #cube {
      @include animation(rotate-cube, 2s, 1s);
    }

  callback (delay 2s) {
    1. toggleClass('open'); to add open to target
    2. toggleClass('next'); to remove class next from target
    3. toggleClass('open'); from first face
    4. toggleClass('cube-state-initial') from #cube to add

    (there should be no next state on anything)



*/


  }

  About.prototype = {

    _rotateTarget: function(ev) {
      var self = this;
      var $targetDiv = $('#'+ev.currentTarget.dataset.target);

      if ( !( $targetDiv.hasClass('open') || $('body').hasClass('moving') )) {
        $targetDiv.toggleClass('next');
        self._rotateCube();
      }
    },

    _rotateCube: function() {
      var self = this;

      $('body').toggleClass('moving');
      setTimeout(self._replaceCurrentCubeFace, 1600);
    },


    _replaceCurrentCubeFace: function() {
      $('body').toggleClass('moving');
      $('.face.open').toggleClass('open');
      $('.face.next').toggleClass('next open');
    },

    _replaceCurrent: function() {

    },

  };

  new About();

});
