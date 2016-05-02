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

            //on récupère les matchs
            this.$http.get('/api/matchs').then(response => {
                this.matchs = response.data;
                console.log('matchs', this.matchs);
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

            // on récupère les pronos du joueur sinon on crèe le squelette
            this.$http.get('/api/pronos/user_id/' + this.getCurrentUser()._id).then(response => {
                try {
                    this.prono = response.data[0];

                } catch (err) {
                    this.prono = { user_id: this.getCurrentUser()._id, date: Date.now() };
                    this.toUpdate = false;
                }
                console.log('prono', this.prono);
            });

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

        //sauvegarde les pronos
        saveProno() {
            console.log('Save Prono');
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
