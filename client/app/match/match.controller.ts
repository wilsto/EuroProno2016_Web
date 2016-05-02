/// <reference path="../../../typings/tsd.d.ts" />
'use strict';

(function() {

    class MatchController {
        allmatchs = [];
        matchs = [];
        orderProp = 'group';

        constructor($scope, $http, $cookies) {
            this.$http = $http;
            this.loadMatchs();

            console.log($cookies.lang);

            $scope.sort = function(type) {
                this.orderProp = type;
            };

        }

        addFilter(type, val) {
            this.matchs = this.filterMatch(type, val);
        };


        loadMatchs() {
            this.$http.get('api/matchs').then(response => {
                this.allmatchs = response.data;
                this.matchs = this.filterMatch();
            });
        }

        filterMatch(myCol = '', myFiltre = '') {
            if (myFiltre === '') {
                return this.allmatchs;
            } else {
                return this.allmatchs.filter(
                    function(i) {
                        if (myCol !== '') {
                            return i[myCol] === myFiltre;
                        } else {
                            return null;
                        }

                    }
                );
            }
        }

        createMatch(form) {
            this.submitted = true;
            if (form.$valid) {

                console.log('form', form);
                this.$http.post('/api/matchs', {
                    typematch: this.newmatch.typematch,
                    group: this.newmatch.group,
                    grouporder: this.newmatch.grouporder,
                    team1: this.newmatch.team1,
                    team2: this.newmatch.team2,
                    date: this.newmatch.date,
                    stade: this.newmatch.stade,
                    image: this.newmatch.image
                }).then(res => {
                    this.loadMatchs();
                    this.newmatch.typematch = '';
                    this.newmatch.group = '';
                    this.newmatch.grouporder = '';
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
