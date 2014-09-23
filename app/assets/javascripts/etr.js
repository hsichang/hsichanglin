$(document).ready(function() {

  var Elevator = function() {
    var self = this;

    self.DIR_UP = 1;
    self.DIR_DOWN = -1;
    self.DIR_NONE = 0;  // redundant constant -- i only kept it as a sanity check - code works fine without it
    self.DELAY_TIME_PAUSE_AT_FLOOR = 2000;
    self.DELAY_TIME_RETURN_TO_LOBBY = 10000;
    self.DELAY_TIME_BETWEEN_FLOORS = 1000;
    self.queue = [];
    self.queueNext = [];
    self.position = {};
    self.$floorBtn = $('.floor-btn');

    self._initializeElevator();
    self._bindClickEvents();
  };

  Elevator.prototype = {
    _initializeElevator : function() {
      var self = this;

      self.position.currentFloor = 1;
      self.position.currentDirection = self.DIR_NONE;
      self.position.inMotion = false;
      $('*[data-btn=' + self.position.currentFloor + ']').removeClass('active');
      $('*[data-floor=' + self.position.currentFloor+ ']').toggleClass('active');
    },

    _bindClickEvents : function() {
      var self = this;
      var movingUp;
      var floor;

      self.$floorBtn.on('click', function(evt) {
        floor = parseInt(evt.currentTarget.innerText);   
        if ((self.queue.indexOf(floor) === -1) && (floor !== self.position.currentFloor)) {
          $('*[data-btn='+floor+']').toggleClass('active');          
          self._sortAndInsertFloor(floor);
          if (!self.position.inMotion) { self._moveBetweenFloors() };
        };
      });
    },

    _determineDirection : function(targetFloor) {
      var self = this;
      self.position.currentDirection = (targetFloor - self.position.currentFloor > 0) ? self.DIR_UP : self.DIR_DOWN;
    },

    _sortAndInsertFloor : function(floor) {
      var self = this;

      if (!self.position.inMotion && self.position.currentDirection === 0) {
        self._determineDirection(floor);
      };
      if  ( (self.position.currentDirection === self.DIR_UP) && (self.position.currentFloor < floor) ) { 
        self.queue.push(floor);
        self.queue.sort(self._sortUp);
      } else if ( (self.position.currentDirection === self.DIR_UP) && (self.position.currentFloor > floor) ) {
        self.queueNext.push(floor);
        self.queueNext.sort(self._sortDown);
      } else if ( (self.position.currentDirection === self.DIR_DOWN) && (self.position.currentFloor > floor) ) {
        self.queue.push(floor);
        self.queue.sort(self._sortDown);
      } else if ( (self.position.currentDirection === self.DIR_DOWN) && (self.position.currentFloor < floor) ) {
        self.queueNext.push(floor);
        self.queueNext.sort(self._sortUp)
      };
    },

    _sortUp : function(a,b) {
      if (a < b) { return -1 };
      if (a > b) { return 1 };
      if (a == b) { return 0 };       
    },

    _sortDown : function(a, b) {
      if (a < b) { return 1 };
      if (a > b) { return -1 };
      if (a == b) { return 0 };     
    },

    _moveBetweenFloors : function() {
      var self = this;
      var nextFloor = self.position.currentFloor + self.position.currentDirection;
      var changingFloors;

      if (self.position.currentFloor !== self.queue[0]) {

        self.position.inMotion = true;
        $('*[data-floor=' + self.position.currentFloor + ']').toggleClass('active');
        changingFloors = setTimeout(function() {
          $('*[data-floor='+nextFloor+']').toggleClass('active'); 
          self.position.currentFloor = nextFloor; 
          setTimeout(function() {
            self._moveBetweenFloors();          
          }, self.DELAY_TIME_BETWEEN_FLOORS);
        }, self.DELAY_TIME_BETWEEN_FLOORS);
      } else {
        clearTimeout(changingFloors);
        self._arrivedAtStop();
      }
    },

    _arrivedAtStop : function() { 
      var self = this;
      var sleepTimer; 

      $('*[data-btn='+ self.position.currentFloor + ']').removeClass('active');
      self.queue.shift();
      setTimeout(function() {
        if (self.queue.length > 0) {
          self._moveBetweenFloors();
        } else if (self.queueNext.length > 0) {
          self.queue = self.queueNext;
          self.queueNext = [];
          self.position.currentDirection = -1 * self.position.currentDirection;
          self._moveBetweenFloors();
        } else if (self.position.currentPosition === 1) {
          clearTimeout(sleepTimer);
          self._initializeElevator();
        } else {
          self.position.inMotion = false;
          self.position.currentDirection = self.DIR_NONE;
          if (self.position.currentFloor !== 1) { 
            sleepTimer = setTimeout(function() {
              self.queue.push(1); 
              self.position.currentDirection = self.DIR_DOWN;
              self._moveBetweenFloors();
            },self.DELAY_TIME_RETURN_TO_LOBBY)
          };
        };
      }, self.DELAY_TIME_PAUSE_AT_FLOOR);
    },
  };

  new Elevator();
});