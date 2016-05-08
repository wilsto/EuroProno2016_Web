/// <reference path="../../typings/tsd.d.ts" />
'use strict';
(function() {

    class PronoComponent {
        menu = [
            { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Euro2016', href: '/team', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];
        constructor($http, Auth) {
            this.$http = $http;
            this.isLoggedIn = Auth.isLoggedIn;
            this.isAdmin = Auth.isAdmin;
            this.getCurrentUser = Auth.getCurrentUser;
            this.matchs = [];
        }

        $onInit() {
            //on récupère les matchs
            this.$http.get('/api/matchs').then(responseMatchs => {

                this.matchs = responseMatchs.data;

                // création des groupes à partir des infos matchs
                this.groups = _.sortBy(_.uniq(_.map(this.matchs, element => {
                    return { name: element.group, order: element.grouporder };
                }), 'name'), 'order');

                this.loadProno();
            });

            // on récupère les équipes
            this.$http.get('/api/teams').then(response2 => {
                this.teams = response2.data;

                // initialisation des points
                this.teams = _.map(this.teams, function(team) {
                    team.points = 0;
                    team.diff = 0;
                    team.played = 0;
                    return team;
                });
            });
        }

        loadProno() {
            // on récupère les pronos du joueur sinon on crèe le squelette
            this.$http.get('/api/pronos/user_id/' + this.getCurrentUser()._id).then(responseProno => {
                try {
                    this.prono = responseProno.data[0];
                    this.toUpdate = true;
                    this.groupThird = [];
                    this.mergeByProperty(this.matchs, this.prono.matchs, '_id');
                } catch (err) {
                    this.prono = { user_id: this.getCurrentUser()._id, date: Date.now() };
                    this.toUpdate = false;
                }
                _.map(this.groups, group => {
                    if (group.name.length < 2) {
                        return this.calculGroup(group.name);
                    }
                });

                console.log('this.groupThird', this.groupThird);
            });
        }

        mergeByProperty(arr1, arr2, prop) {
            _.each(arr2, function(arr2obj) {
                var arr1objFinal = _.find(arr1, function(arr1obj) {
                    return arr1obj[prop] === arr2obj[prop];
                });

                //If the object already exist extend it with the new values from arr2, otherwise just add the new object to arr1
                arr1objFinal ? _.extend(arr1objFinal, arr2obj) : arr1.push(arr2obj);
                arr1objFinal.teamId1 = arr1objFinal.teamId1 || arr1objFinal.team1;
                arr1objFinal.teamId2 = arr1objFinal.teamId2 || arr1objFinal.team2;
            });
        }

        // filtre les matchs dans le bon groupe
        filterGroup(groupName) {
            return function(match) {
                return match.group === groupName;
            };
        }

        // dès qu'un score change dans un match (appelé par ng-change)
        scoreChange(match, groupName) {
            match.result = (match.score1 && match.score2) ? match.score1 - match.score2 : null;
            if (match.result !== null) {
                if (match.result === 0) {
                    match.team1points = 1;
                    match.team1diff = match.result;
                    match.team2points = 1;
                    match.team2diff = match.result;
                    match.winner = null;
                }
                if (match.result > 0) {
                    match.team1points = 3;
                    match.team1diff = match.result;
                    match.team2points = 0;
                    match.team2diff = -match.result;
                    match.winner = match.team1;
                }
                if (match.result < 0) {
                    match.team1points = 0;
                    match.team1diff = match.result;
                    match.team2points = 3;
                    match.team2diff = -match.result;
                    match.winner = match.team2;
                }
            } else {
                match.team1points = null;
                match.team1diff = null;
                match.team2points = null;
                match.team2diff = null;
                match.winner = null;
            }
            this.calculGroup(groupName);
        }

        // calcul les scores pour les groupes
        calculGroup(groupName) {
            var that = this;
            that.groupTeams = _.filter(this.teams, { group: groupName });
            that.groupMatchs = _.filter(this.matchs, { group: groupName });
            _.each(that.groupTeams, function(team) {
                var sumTeam1 = _.chain(that.groupMatchs)
                    .where({ team1: team.name })
                    .reduce(function(memo, subteam) {
                        return {
                            points: (subteam.team1points) ? memo.points + subteam.team1points : memo.points,
                            played: (Number.isInteger(subteam.team1points)) ? memo.played + 1 : memo.played,
                            win: (subteam.team1points === 3) ? memo.win + 1 : memo.win,
                            draw: (subteam.team1points === 1) ? memo.draw + 1 : memo.draw,
                            loss: (subteam.team1points === 0) ? memo.loss + 1 : memo.loss,
                            bp: (subteam.score1) ? memo.bp + parseInt(subteam.score1, 10) : memo.bp,
                            bc: (subteam.score2) ? memo.bc + parseInt(subteam.score2, 10) : memo.bc,
                            diff: (subteam.team1diff) ? memo.diff + subteam.team1diff : memo.diff
                        };
                    }, { points: 0, diff: 0, played: 0, win: 0, draw: 0, loss: 0, bp: 0, bc: 0 })
                    .value();
                var sumTeam2 = _.chain(that.groupMatchs)
                    .where({ team2: team.name })
                    .reduce(function(memo, subteam) {
                        return {
                            points: (subteam.team2points) ? memo.points + subteam.team2points : memo.points,
                            played: (Number.isInteger(subteam.team2points)) ? memo.played + 1 : memo.played,
                            win: (subteam.team2points === 3) ? memo.win + 1 : memo.win,
                            draw: (subteam.team2points === 1) ? memo.draw + 1 : memo.draw,
                            loss: (subteam.team2points === 0) ? memo.loss + 1 : memo.loss,
                            bc: (subteam.score1) ? memo.bc + parseInt(subteam.score1, 10) : memo.bc,
                            bp: (subteam.score2) ? memo.bp + parseInt(subteam.score2, 10) : memo.bp,
                            diff: (subteam.team2diff) ? memo.diff + subteam.team2diff : memo.diff
                        };
                    }, { points: 0, diff: 0, played: 0, win: 0, draw: 0, loss: 0, bp: 0, bc: 0 })
                    .value();
                team.points = sumTeam2.points + sumTeam1.points;
                team.win = sumTeam2.win + sumTeam1.win;
                team.draw = sumTeam2.draw + sumTeam1.draw;
                team.loss = sumTeam2.loss + sumTeam1.loss;
                team.played = sumTeam2.played + sumTeam1.played;
                team.bp = sumTeam2.bp + sumTeam1.bp;
                team.bc = sumTeam2.bc + sumTeam1.bc;
                team.diff = sumTeam2.diff + sumTeam1.diff;
            });

            //******
            //TODO 
            //******
            //ordre selon les règles fifa
            that.groupTeams = _.sortBy(that.groupTeams, ['points', 'diff']).reverse();

            // si tous les matchs ont été joués dans le groupe = 12 scores, alors on reporte les équipes qualifiées pour les quarts
            that.nbmatchs = _.compact(_.pluck(that.groupMatchs, 'score1')).length + _.compact(_.pluck(that.groupMatchs, 'score2')).length;
            if (that.nbmatchs === 12) {
                that.winnerGroupMatch = _.filter(this.matchs, match => {
                    return match.teamId1 === 'Winner ' + groupName || match.teamId2 === 'Winner ' + groupName;
                });
                that.winnerGroupMatch[0].team1 = that.groupTeams[0].name;

                that.RunnerupGroup1 = _.filter(this.matchs, match => {
                    return match.teamId1 === 'Runner-up ' + groupName;
                });
                if (that.RunnerupGroup1[0] !== undefined) {
                    that.RunnerupGroup1[0].team1 = that.groupTeams[1].name;
                }

                that.RunnerupGroup2 = _.filter(this.matchs, match => {
                    return match.teamId2 === 'Runner-up ' + groupName;
                });
                if (that.RunnerupGroup2[0] !== undefined) {
                    that.RunnerupGroup2[0].team2 = that.groupTeams[1].name;
                }

                this.groupThird[groupName] = that.groupTeams[2];
            }
        }

        // retourne la valeur la plus petite des grouporder du group (appelé par ng-repeat GROUP)
        _grouporder(arr) {
            return _.min(_.map(arr, function(group) {
                return parseInt(group.grouporder, 10);
            }));
        }

        //sauvegarde les pronos
        saveProno() {
            this.prono.matchs = this.matchs;
            this.prono.user_id = this.getCurrentUser()._id;
            // si prono existe déjà
            if (this.toUpdate) {
                //FIXME can't save twice same session
                this.$http.put('/api/pronos/' + this.prono._id, this.prono).then(response => {
                    console.log('prono updated', response);
                    this.loadProno();
                });
            } else {
                // sinon on crèe les pronos
                this.$http.post('/api/pronos', this.prono).then(response => {
                    this.toUpdate = true;
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
