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
            this.series = ['Prono (mean)', 'Real'];
            this.colours = ['#3866FF', '#FF3535'];
            this.winners = [];
            this.data1 = [];

        }
        $onInit() {
            this.loadProno();
        }

        loadProno() {
            // on récupère les pronos du joueur sinon on crèe le squelette
            this.$http.get('/api/pronos/').then(responseProno => {
                this.pronos = responseProno.data;
                this.matchs = _.map(this.pronos, 'matchs');
                //get all winners with number of pronostics
                var Final = _.sortBy(_.map(_.countBy(_.map(this.matchs, 50), 'winner'), function(value, key) {
                    return { team: key, count: value };
                }), 'count').reverse();
                // Winner Final
                var lstval = _.map(Final, 'count');
                this.winners.push(lstval);

                var lstDetails = [];
                var teamsLabel = [];
                var realPoints = [];
                var realButs = [];
                var realDiffs = [];
                var avgPoints = [];
                var avgButs = [];
                var avgDiffs = [];

                _.forEach(this.pronos, function(element, key) {
                    var pronoTab = [];
                    var realTab = [];
                    // real matchs 
                    if (element.user_id._id === '57528b03ec21fa0300c23c86') {
                        // get all matchs to create one tab with team 1 and 2  
                        _.forEach(element.matchs, function(elementR, keyR) {
                            var myTeam1 = elementR.team1.substr(0, 5);
                            var myTeam2 = elementR.team2.substr(0, 5);
                            if (myTeam1 != 'Winne' && myTeam1 !== 'Runne' && myTeam1 !== 'Third' && myTeam2 != 'Winne' && myTeam2 !== 'Runne' && myTeam2 !== 'Third') {
                                realTab.push({ team: elementR.team1, score: elementR.score1, points: elementR.team1points, diff: elementR.team1diff });
                                realTab.push({ team: elementR.team2, score: elementR.score2, points: elementR.team2points, diff: elementR.team2diff });
                            }
                        });
                        //group by Team
                        var realTeam = _.groupBy(realTab, 'team');
                        _.forEach(realTeam, function(element1R, key1R) {
                            var sumPointsR = 0;
                            var nbButsR = 0;
                            var diffButsR = 0;
                            _.forEach(element1R, function(element2R, key2R) {
                                if (isNaN(element2R.points) !== true) {
                                    sumPointsR = sumPointsR + element2R.points;
                                }
                                if (isNaN(element2R.score) !== true) {
                                    nbButsR = nbButsR + parseInt(element2R.score, 10);
                                }
                                if (isNaN(element2R.diff) !== true && element2R.diff != null) {
                                    diffButsR = diffButsR + parseInt(element2R.diff, 10);
                                }
                            });
                            teamsLabel.push(key1R);
                            realPoints.push(sumPointsR);
                            realButs.push(nbButsR);
                            realDiffs.push(diffButsR);
                        });

                    }
                    // prono matchs
                    else {
                        _.forEach(element.matchs, function(elementP, keyP) {
                            var myElem1 = elementP.team1.substr(0, 5);
                            var myElem2 = elementP.team2.substr(0, 5);
                            if (myElem1 != 'Winne' && myElem1 !== 'Runne' && myElem1 !== 'Third' && myElem2 != 'Winne' && myElem2 !== 'Runne' && myElem2 !== 'Third') {
                                pronoTab.push({ team: elementP.team1, score: elementP.score1, points: elementP.team1points, diff: elementP.team1diff });
                                pronoTab.push({ team: elementP.team2, score: elementP.score2, points: elementP.team2points, diff: elementP.team2diff });
                            }
                        });
                        var pronoTeam = _.groupBy(pronoTab, 'team');
                        _.forEach(pronoTeam, function(element3, key3) {
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
                                if (isNaN(element1.diff) !== true && element1.diff != null) {
                                    diffButs = diffButs + parseInt(element1.diff, 10);
                                }
                            });
                            lstDetails.push({ team: key3, points: sumPoints, buts: nbButs, diff: diffButs });
                        });
                    }
                });
                var teamDetails = _.groupBy(lstDetails, 'team');
                _.forEach(teamDetails, function(elDet, key) {
                    //points
                    var lstPoints = _.map(elDet, 'points');
                    var sPoints = _.reduce(lstPoints, function(sum, n) {
                        return sum + n;
                    }, 0);
                    var meanPoints = Math.round(sPoints / lstPoints.length);
                    avgPoints.push(meanPoints);
                    //buts
                    var lstButs = _.map(elDet, 'buts');
                    var sButs = _.reduce(lstButs, function(sum, n) {
                        return sum + n;
                    }, 0);
                    var meanButs = Math.round(sButs / lstButs.length);
                    avgButs.push(meanButs);
                    //diffs
                    var lstDiffs = _.map(elDet, 'diff');
                    var sDiffs = _.reduce(lstDiffs, function(sum, n) {
                        return sum + n;
                    }, 0);
                    var meanDiffs = Math.round(sDiffs / lstDiffs.length);
                    avgDiffs.push(meanDiffs);
                });
                //labels
                this.teamsLabel = [];
                this.teamsLabel = teamsLabel;

                // points
                this.points = [];
                this.points.push(avgPoints);
                this.points.push(realPoints);
                // buts
                this.buts = [];
                this.buts.push(avgButs);
                this.buts.push(realButs);
                //diffs
                this.diffs = [];
                this.diffs.push(avgDiffs);
                this.diffs.push(realDiffs);
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
