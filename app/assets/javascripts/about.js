$(document).ready(function() {
  var About = function() {
    var self = this;
    self.$trigger = $('.career_trigger');
    self.$trigger.on('click', function(ev) { self._rotateTarget(ev) });
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
