/// <reference path="../../typings/tsd.d.ts" />
'use strict';

(function() {

    class MatchController {
        matchs = [];
        orderProp = 'group';

        constructor($scope, $http) {
            this.$http = $http;
            this.loadMatchs();

            $scope.sort = function(type) {
                this.orderProp = type;
            };

        }

        loadMatchs() {
            this.$http.get('api/matchs').then(response => {
                //console.log('data', response.data);
                this.matchs = response.data;
            });
        }

        createMatch(form) {
            this.submitted = true;
            if (form.$valid) {

                console.log('form', form);
                this.$http.post('/api/matchs', {
                    typematch: this.newmatch.typematch,
                    group: this.newmatch.group,
                    team1: this.newmatch.team1,
                    team2: this.newmatch.team2,
                    date: this.newmatch.date,
                    stade: this.newmatch.stade,
                    image: this.newmatch.image
                }).then(res => {
                    this.loadMatchs();
                    this.newmatch.typematch = '';
                    this.newmatch.group = '';
                    this.newmatch.team1 = '';
                    this.newmatch.team2 = '';
                    this.newmatch.date = '';
                    this.newmatch.stade = '';
                    this.newmatch.image = '';

                });
            }
        }


        // updMatch(form) {
        //     this.submitted = true;
        //     if (form.$valid) {

        //         console.log('form', form);
        //         this.$http.put('/api/matchs', {
        //             typematch: this.newmatch.typematch,
        //             group: this.newmatch.group,
        //             team1: this.newmatch.team1,
        //             team2: this.newmatch.team2,
        //             date: this.newmatch.date,
        //             stade: this.newmatch.stade,
        //             image: this.newmatch.image
        //         }).then(res => {
        //             this.loadMatchs();
        //             this.newmatch.typematch = '';
        //             this.newmatch.group = '';
        //             this.newmatch.team1 = '';
        //             this.newmatch.team2 = '';
        //             this.newmatch.date = '';
        //             this.newmatch.stade = '';
        //             this.newmatch.image = '';

        //         });
        //     }
        // }

    }


    angular.module('euroProno2016WebApp.matchs')
        .controller('MatchController', MatchController);

})();
