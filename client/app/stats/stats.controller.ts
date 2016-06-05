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
                _.forEach(this.pronos, function(element, key) {

                    var temptab = [];

                    _.forEach(element.matchs, function(element1, key1) {
                        //, points: element1.team1points 
                        temptab.push({ team: element1.team1, score: element1.score1, points: element1.team1points });
                        temptab.push({ team: element1.team2, score: element1.score2, points: element1.team2points });
                    });

                    var grTeam = _.groupBy(temptab, 'team');

                    _.forEach(grTeam, function(element, key) {
                        var sumPoints = 0;
                        var nbButs = 0;
                        _.forEach(element, function(element1, key1) {
                            if (isNaN(element1.points) != true) {
                                sumPoints = sumPoints + element1.points;
                            }
                            if (isNaN(element1.score) != true) {
                                nbButs = nbButs + parseInt(element1.score);
                            }
                        })
                        lstPoints.push({ team: key, points: sumPoints });
                        lstButs.push({ team: key, buts: nbButs })
                    });
                });

                this.minPoints = [];
                var minPa = _.sortBy(lstPoints, 'points');
                var minP = _.uniq(minPa, "team").slice(0, 10);
                this.labelsMinP = _.map(minP, 'team');
                var lstval = _.map(minP, 'points');
                this.minPoints.push(lstval);

                this.maxPoints = [];
                var maxPa = _.sortBy(lstPoints, 'points').reverse();

                var maxP = _.uniq(maxPa).slice(0, 10);
                this.labelsMaxP = _.map(maxP, 'team');
                var lstval = _.map(maxP, 'points');
                this.maxPoints.push(lstval);

                this.minButs = [];
                var minB = _.sortBy(_.uniq(lstButs), 'buts').slice(0, 10);
                this.labelsMinB = _.map(minB, 'team');
                var lstval = _.map(minB, 'buts');
                this.minButs.push(lstval);
                this.maxButs = [];
                var maxB = _.sortBy(_.uniq(lstButs), 'buts').reverse().slice(0, 10);
                this.labelsMaxB = _.map(maxB, 'team');
                var lstval = _.map(maxB, 'buts');
                this.maxButs.push(lstval);

                this.matchs = _.map(this.pronos, 'matchs');
                // get all winners with number of pronostics
                var Final = _.sortBy(_.map(_.countBy(_.map(this.matchs, 50), 'winner'), function(value, key) {
                    return { team: key, count: value };
                }), 'count').reverse();

                this.labels = _.map(Final, 'team');
                var lstval = _.map(Final, 'count');
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
}
