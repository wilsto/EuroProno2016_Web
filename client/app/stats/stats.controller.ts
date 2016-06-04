'use strict';
(function() {

    class StatsComponent {
        menu = [
            { name: 'Prono', href: '/prono', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Arena', href: '/arena', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Leagues', href: '/league', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Rules', href: '/rules', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Stats', href: '/stats', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];

        constructor($http, Auth) {

            this.$http = $http;
            this.pronos = [];
            this.Final = [];

            this.labels = [];
            this.series = ['Number of prono'];
            this.data = [];

        }
        $onInit() {
            this.loadProno();
        }

        loadProno() {
            // on récupère les pronos du joueur sinon on crèe le squelette
            this.$http.get('/api/pronos/').then(responseProno => {

                this.pronos = responseProno.data;

                this.Matchs = _.map(this.pronos, 'matchs');

                // get all winners with number of pronostics
                this.Final = _.sortBy(_.map(_.countBy(_.map(this.Matchs, 50), 'winner'), function(value, key) {
                    return { team: key, count: value };
                }), 'count').reverse();

                this.labels = _.map(this.Final, 'team');
                var lstval = _.map(this.Final, 'count');
                this.data.push(lstval);
                console.log('label ', this.labels);
                console.log('series ', this.series);
                console.log('data ', this.data);

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
