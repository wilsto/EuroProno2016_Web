/// <reference path="../../typings/tsd.d.ts" />
'use strict';
(function() {

    class PronoComponent {

        constructor($http, Auth) {
            this.$http = $http;
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
            this.matchs = [];
        }

        $onInit() {
            console.log('init');

            this.prono = { user_id: this.getCurrentUser()._id, date: Date.now() };
            console.log('this.prono ', this.prono);

            this.$http.get('/api/matchs').then(response => {
                this.matchs = response.data;
                console.log('matchs', this.matchs);
            });

            this.$http.get('/api/teams').then(response2 => {
                this.teams = response2.data;
                console.log('teams', this.teams);
            });

            this.$http.get('/api/pronos/user_id/' + this.getCurrentUser()._id).then(response => {
                this.pronos = response.data[0];
                console.log('pronos', this.pronos);
            });

        }

        scoreChange(match, groupName) {
            console.log('Score Change : ' + groupName);
            if (match.score1 && match.score2) {
                console.log('ok : ' + match.score1 + ' ' + match.score2);
            }
        }

        saveProno() {
            console.log('Save Prono');
            console.log('this.matchs', this.matchs);
        }
    }

    angular.module('euroProno2016WebApp')
        .component('prono', {
            templateUrl: 'app/prono/prono.html',
            controller: PronoComponent,
            controllerAs: 'vm'
        });

})();
