/// <reference path='../../typings/tsd.d.ts' />
'use strict';
(function() {

    class NewsComponent {

        menu = [
            { name: 'News', href: '/news', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Regulations', href: '/regulation', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Matchs', href: '/match', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Teams', href: '/team', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];

        constructor($http, $ngBootbox) {
            this.$ngBootbox = $ngBootbox;
            this.$http = $http;
            this.news = [];
            this.typOnes = [];
            this.typTwos = [];
            this.currentPageApp = 1;
            this.currentPageEuro2016 = 1;
            this.itemsPerPageApp = 8;
            this.itemsPerPageEuro2016 = 6;
        }

        $onInit() {
            console.log('init');
            this.loadNews();
        }

        loadNews() {
            this.$http.get('/api/newss').then(response => {
                this.news = _.sortBy(response.data, 'date').reverse();

                // type 1
                this.typOnes = _.filter(this.news, function(o) {
                    return o.type === 1;
                });

                this.totalOne = this.typOnes.length;

                var paginOne = [];
                var it;
                for (it = 0; it < this.totalOne / this.itemsPerPageApp; it++) {
                    // Ceci sera exécuté 5 fois
                    // la variable 'pas' ira de 0 à 4
                    paginOne.push({ 'numpag': it + 1 });
                }
                this.paginOne = paginOne;
                // type 2
                this.typTwos = _.filter(this.news, function(o) {
                    return o.type === 2;
                });
                this.totalTwo = this.typTwos.length;
                var paginTwo = [];
                for (it = 0; it < this.totalTwo / this.itemsPerPageEuro2016; it++) {
                    // Ceci sera exécuté 5 fois
                    // la variable 'pas' ira de 0 à 4
                    paginTwo.push({ 'numpag': it + 1 });
                }
                this.paginTwo = paginTwo;

                // type 5
                this.typFives = _.filter(this.news, function(o) {
                    return o.type === 5;
                });
                // création des groupes à partir des infos news
                this.types = _.sortBy(_.uniq(_.map(this.news, element => {
                    return { type: element.type, order: element.type, group: element.group };
                }), 'type'), 'order');

                this.pageChanged(1, 1);
                this.pageChanged(1, 2);
                this.pageCount();
            });
        }

        // create news 
        createNews(form) {
            this.$http.post('/api/newss', this.newinfo).then(response => {
                this.loadNews();
                this.newinfo = {};
            });
        }

        pageCount() {
            return Math.ceil(this.totalOne / this.itemsPerPage);
        };

        pageChanged(current, type) {
            var itemsPerPage = 2;
            if (type === 1) {

                itemsPerPage = this.itemsPerPageApp;
            }
            if (type === 2) {

                itemsPerPage = this.itemsPerPageEuro2016;
            }
            var begin = ((current - 1) * itemsPerPage),
                end = begin + itemsPerPage;

            if (type === 1) {
                this.currentPageApp = current;
                this.filteredNewsOne = this.typOnes.slice(begin, end);
            }
            if (type === 2) {
                this.currentPageEuro2016 = current;
                this.filteredNewsTwo = this.typTwos.slice(begin, end);
            }

        };

        delete(news, index) {
            this.news.splice(index, 1);
            this.$http.delete('/api/newss/' + news._id).then(response => {
                console.log('delete', response);
            });
        }
    }

    angular.module('euroProno2016WebApp')
        .component('news', {
            templateUrl: 'app/news/news.html',
            controller: NewsComponent,
            controllerAs: 'vm'
        });

})();
