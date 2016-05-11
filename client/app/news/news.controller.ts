/// <reference path="../../typings/tsd.d.ts" />
'use strict';
(function() {

    class NewsComponent {

        menu = [
            { name: 'Home', href: '/', section: '', ngclick: '', class: 'active', a_class: 'nothing' },
            { name: 'Team', href: '/team', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'Matchs', href: '/match', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' },
            { name: 'News', href: '/news', section: '', ngclick: '', class: 'nothing', a_class: 'nothing' }
        ];

        constructor($http, $ngBootbox) {
            this.$ngBootbox = $ngBootbox;
            this.$http = $http;
            this.news = [];
            this.typOnes = [];
            this.typTwos = [];
            this.currentPageOne = 1;
            this.currentPageTwo = 1;
            this.itemsPerPageOne = 2;
            this.itemsPerPageTwo = 3;
            this.bigTotalItems = 100;
            this.maxSize = 5;
            this.bigCurrentPage = 1;
        }

        $onInit() {
                console.log('init');
                // on récupère les pronos du joueur sinon on crèe le squelette
                this.$http.get('/api/newss').then(response => {
                    try {

                        this.news = _.sortBy(response.data, 'date').reverse();

                        // type 1
                        this.typOnes = _.filter(this.news, function(o) {
                            return o.type === 1;
                        });

                        this.totalOne = this.typOnes.length;

                        var paginOne = [];
                        var it;
                        for (it = 0; it < this.totalOne / this.itemsPerPageOne; it++) {
                            // Ceci sera exécuté 5 fois
                            // la variable "pas" ira de 0 à 4
                            paginOne.push({ "numpag": it + 1 });
                        }
                        this.paginOne = paginOne;
                        // type 2
                        this.typTwos = _.filter(this.news, function(o) {
                            return o.type === 2;
                        });
                        this.totalTwo = this.typTwos.length;
                        var paginTwo = [];
                        var it;
                        for (it = 0; it < this.totalTwo / this.itemsPerPageTwo; it++) {
                            // Ceci sera exécuté 5 fois
                            // la variable "pas" ira de 0 à 4
                            paginTwo.push({ "numpag": it + 1 });
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

                    } catch (err) {
                        console.log('vide');
                    }
                });
            }
            // create news 
        createNews(form) {
            var d = new Date();
            var n = d.toISOString();
            console.log(form.$valid);
            if (form.$valid) {

                this.$http.post('/api/newss', {
                    type: this.newinfo.type,
                    date: n,
                    title: this.newinfo.title,
                    info: this.newinfo.info,
                    image: this.newinfo.image
                }).then(response => {
                    this.newinfo.type = '';
                    this.newinfo.title = '';
                    this.newinfo.info = '';
                    this.newinfo.image = '';
                });
            }
        }

        pageCount() {
            return Math.ceil(this.totalOne / this.itemsPerPage);
        };

        pageChanged(current, type) {
            var itemsPerPage = 2;
            if (type === 1) {

                itemsPerPage = this.itemsPerPageOne;
            }
            if (type === 2) {

                itemsPerPage = this.itemsPerPageTwo;
            }
            var begin = ((current - 1) * itemsPerPage),
                end = begin + itemsPerPage;

            if (type === 1) {
                this.currentPageOne = current;
                this.filteredNewsOne = this.typOnes.slice(begin, end);
            }
            if (type === 2) {
                this.currentPageTwo = current;
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
