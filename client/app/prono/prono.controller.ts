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
            this.$http.get('/api/matchs').then(response => {
                this.matchs = response.data;
                console.log('matchs', this.matchs);
            });

            this.$http.get('/api/teams').then(response2 => {
                this.teams = response2.data;
                console.log('teams', this.teams);
            });

            this.$http.get('/api/pronos/user_id/' + this.getCurrentUser()._id).then(response => {
                try {
                    this.prono = response.data[0];
                    this.toUpdate = true;
                } catch (err) {
                    this.prono = { user_id: this.getCurrentUser()._id, date: Date.now() };
                    this.toUpdate = false;
                }
                console.log('prono', this.prono);
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
            if (this.toUpdate) {
                this.$http.put('/api/pronos/' + this.prono._id, this.prono).then(response => {
                    console.log('prono updated', response);
                });
            } else {
                this.$http.post('/api/pronos', this.prono).then(response => {
                    console.log('prono created', response);
                });
            }

        }
    }

    angular.module('euroProno2016WebApp')
        .component('prono', {
            templateUrl: 'app/prono/prono.html',
            controller: PronoComponent,
            controllerAs: 'vm'
        });

})();
