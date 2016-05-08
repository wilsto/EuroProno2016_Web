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
            console.log('init');

            //on récupère les matchs
            this.$http.get('/api/matchs').then(responseMatchs => {

                this.matchs = responseMatchs.data;
                console.log('matchs', this.matchs);

                // création des groupes à partir des infos matchs
                this.groups = _.uniq(_.map(this.matchs, element => {
                    return { name: element.group, order: element.grouporder };
                }), 'name');
                console.log('groups', this.groups);

                // on récupère les pronos du joueur sinon on crèe le squelette
                this.$http.get('/api/pronos/user_id/' + this.getCurrentUser()._id).then(responseProno => {
                    try {
                        this.prono = responseProno.data[0];
                        this.toUpdate = true;
                        this.mergeByProperty(this.matchs, this.prono.matchs, '_id');
                        console.log('matchsMerged', this.matchs);
                    } catch (err) {
                        this.prono = { user_id: this.getCurrentUser()._id, date: Date.now() };
                        this.toUpdate = false;
                    }
                    console.log('prono', this.prono);
                    _.map(this.groups, group => {
                        return this.calculGroup(group);
                    });
                });

            });

            // onérécupère les équipes
            this.$http.get('/api/teams').then(response2 => {
                this.teams = response2.data;

                // initialisation des points
                this.teams = _.map(this.teams, function(team) {
                    team.points = 0;
                    team.diff = 0;
                    return team;
                });
                console.log('teams', this.teams);
            });
        }

        mergeByProperty(arr1, arr2, prop) {
            _.each(arr2, function(arr2obj) {
                var arr1objFinal = _.find(arr1, function(arr1obj) {
                    return arr1obj[prop] === arr2obj[prop];
                });
                //If the object already exist extend it with the new values from arr2, otherwise just add the new object to arr1
                arr1objFinal ? _.extend(arr1objFinal, arr2obj) : arr1.push(arr2obj);
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
                this.calculGroup(groupName);
            }
        }

        calculGroup(groupName) {
            var that = this;
            that.groupTeams = _.filter(this.teams, { group: groupName });
            that.groupMatchs = _.filter(this.matchs, { group: groupName });
            _.each(this.groupTeams, function(team) {
                var sumTeam1 = _.chain(that.groupMatchs)
                    .where({ team1: team.name })
                    .reduce(function(memo, subteam) {
                        return {
                            points: (subteam.team1points) ? memo.points + subteam.team1points : memo.points,
                            diff: (subteam.team1diff) ? memo.diff + subteam.team1diff : memo.diff
                        };
                    }, { points: 0, diff: 0 })
                    .value();
                var sumTeam2 = _.chain(that.groupMatchs)
                    .where({ team2: team.name })
                    .reduce(function(memo, subteam) {
                        return {
                            points: (subteam.team2points) ? memo.points + subteam.team2points : memo.points,
                            diff: (subteam.team2diff) ? memo.diff + subteam.team2diff : memo.diff
                        };
                    }, { points: 0, diff: 0 })
                    .value();
                team.points = sumTeam2.points + sumTeam1.points;
                team.diff = sumTeam2.diff + sumTeam1.diff;
            });
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
            this.prono.user_id = this.prono.user_id._id || this.prono.user_id;
            // si prono existe déjà
            if (this.toUpdate) {
                this.$http.put('/api/pronos/' + this.prono._id, this.prono).then(response => {
                    console.log('prono updated', response);
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
