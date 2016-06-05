'use strict';
(function() {

    class StatsComponent {
        menu = [
            { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Leagues', href: '/league', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Players', href: '/player', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Rules', href: '/rules', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Stats', href: '/stats', section: '', ngclick: '', class: 'active', a_class: 'nothing' }
        ];


        constructor($http, Auth) {

            this.$http = $http;
            this.pronos = [];
            this.matchs = [];

            this.labels = [];
            this.series = ['# prono'];
            this.data = [];
            this.data1 = [];

        }
        $onInit() {
            this.loadProno();
        }

        loadProno() {
            // on récupère les pronos du joueur sinon on crèe le squelette
            this.$http.get('/api/pronos/').then(responseProno => {

                this.pronos = responseProno.data;
                console.log('pronos ', this.pronos);
                var lstPoints = [];
                var lstButs = [];
                var lstDiff = [];
                _.forEach(this.pronos, function(element, key) {
                    var temptab = [];
                    _.forEach(element.matchs, function(element1, key1) {
                        //, points: element1.team1points 
                        temptab.push({ team: element1.team1, score: element1.score1, points: element1.team1points, diff: element1.team1diff });
                        temptab.push({ team: element1.team2, score: element1.score2, points: element1.team2points, diff: element1.team2diff });
                    });

                    var grTeam = _.groupBy(temptab, 'team');

                    _.forEach(grTeam, function(element3, key3) {
                        var sumPoints = 0;
                        var nbButs = 0;
                        var diffButs = 0;
                        _.forEach(element3, function(element1, key1) {
                            if (isNaN(element1.points) !== true) {
                                sumPoints = sumPoints + element1.points;
                            }
                            if (isNaN(element1.score) !== true) {
                                nbButs = nbButs + parseInt(element1.score, 10);
                            }
                            if (isNaN(element1.diff) !== true) {
                                diffButs = diffButs + parseInt(element1.diff, 10);
                            }
                        });
                        lstPoints.push({ team: key3, points: sumPoints });
                        lstButs.push({ team: key3, buts: nbButs });
                        lstDiff.push({ team: key3, diff: diffButs });
                    });
                });

                // points
                this.minPoints = [];
                var minPa = _.sortBy(lstPoints, 'points');
                var minP = _.uniq(minPa, 'team').slice(0, 5);
                this.labelsMinP = _.map(minP, 'team');
                var lstval = _.map(minP, 'points');
                this.minPoints.push(lstval);
                this.maxPoints = [];
                var maxPa = _.sortBy(lstPoints, 'points').reverse();
                var maxP = _.uniq(maxPa).slice(0, 5);
                this.labelsMaxP = _.map(maxP, 'team');
                lstval = _.map(maxP, 'points');
                this.maxPoints.push(lstval);
                // buts
                this.minButs = [];
                var minB = _.sortBy(_.uniq(lstButs), 'buts').slice(0, 5);
                this.labelsMinB = _.map(minB, 'team');
                lstval = _.map(minB, 'buts');
                this.minButs.push(lstval);
                this.maxButs = [];
                var maxB = _.sortBy(_.uniq(lstButs), 'buts').reverse().slice(0, 5);
                this.labelsMaxB = _.map(maxB, 'team');
                lstval = _.map(maxB, 'buts');
                this.maxButs.push(lstval);

                //diff
                this.minDiff = [];
                minB = _.sortBy(_.uniq(lstDiff), 'diff').slice(0, 5);
                this.labelsMinD = _.map(minB, 'team');
                lstval = _.map(minB, 'diff');
                this.minDiff.push(lstval);
                this.maxDiff = [];
                maxB = _.sortBy(_.uniq(lstDiff), 'diff').reverse().slice(0, 5);
                this.labelsMaxD = _.map(maxB, 'team');
                lstval = _.map(maxB, 'diff');
                this.maxDiff.push(lstval);


                this.matchs = _.map(this.pronos, 'matchs');
                // get all winners with number of pronostics
                var Final = _.sortBy(_.map(_.countBy(_.map(this.matchs, 50), 'winner'), function(value, key) {
                    return { team: key, count: value };
                }), 'count').reverse();

                this.labels = _.map(Final, 'team');
                lstval = _.map(Final, 'count');
                this.data.push(lstval);

            });
        }
    }

    angular.module('euroProno2016WebApp')
        .component('stats', {
            templateUrl: 'app/stats/stats.html',
            controller: StatsComponent,
            controllerAs: 'vm'
        });
})();
