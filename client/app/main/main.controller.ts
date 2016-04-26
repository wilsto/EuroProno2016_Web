'use strict';

(function() {

class MainController {
  bg_audio = true;
  audioOn = true;
  bg = new Audio("assets/audio/bg.mp3");

  constructor($http, $scope, socket, Auth) {
    this.$http = $http;
    this.socket = socket;
    this.awesomeThings = [];
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;

    $scope.$on('$destroy', function() {
      socket.unsyncUpdates('thing');
    });
  }

  $onInit() {
    this.$http.get('/api/things').then(response => {
      this.awesomeThings = response.data;
      this.socket.syncUpdates('thing', this.awesomeThings);
    });

  console.log('init');
    if (this.bg_audio === true) {
        this.bg.play();
    };
  }

  addThing() {
    if (this.newThing) {
      this.$http.post('/api/things', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }

  toggle_audio() {
    console.log('toggle');
    this.bg.muted = !this.bg.muted;
    this.audioOn = !this.bg.muted;
  }
}

angular.module('euroProno2016WebApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController
  });

})();
