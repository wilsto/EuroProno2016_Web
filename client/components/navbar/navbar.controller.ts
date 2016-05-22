'use strict';

class NavbarController {
    //start-non-standard

    isCollapsed = true;
    //end-non-standard

    constructor($http, Auth, $rootScope, $translate, $location) {
        this.$http = $http;
        this.isLoggedIn = Auth.isLoggedIn;
        this.isAdmin = Auth.isAdmin;
        this.getCurrentUser = Auth.getCurrentUser;
        this.$translate = $translate;
        this.$rootScope = $rootScope;

        //recherche de langue pour un user sinon language par défaut du navigateur sinon anglais
        var that = this;
        this.getCurrentUser(function(me) {
            that.$rootScope.language = me.lang || navigator.language.substring(0, 2) || navigator.userLanguage.substring(0, 2) || 'en';
            that.$translate.use(that.$rootScope.language);
        });
        this.burgerMenu();
        this.clickMenu();
        this.navigationSection();
        this.windowScroll();

        this.currentPath = $location.path();
    }

    login_click() {
        $('.login').fadeToggle('slow');
    }

    // Burger Menu
    burgerMenu() {
        $('body').on('click', '.js-ep2016-nav-toggle', function(event) {
            event.preventDefault();
            if ($('#navbar').is(':visible')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });
    }

    // Page Nav
    clickMenu() {
        $('#navbar a:not([class="external"])').click(function(event) {
            var section = $(this).data('nav-section'),
                navbar = $('#navbar');

            if ($('[data-section="' + section + '"]').length) {
                $('html, body').animate({
                    scrollTop: $('[data-section="' + section + '"]').offset().top
                }, 500);
            }
            if (navbar.is(':visible')) {
                navbar.removeClass('in');
                navbar.attr('aria-expanded', 'false');
                $('.js-ep2016-nav-toggle').removeClass('active');
            }

            event.preventDefault();
            return false;
        });
    }

    // Reflect scrolling in navigation
    navActive(section) {
        var $el = $('#navbar > ul');
        $el.find('li').removeClass('active');
        $el.each(function() {
            $(this).find('a[data-nav-section="' + section + '"]').closest('li').addClass('active');
        });
    }

    navigationSection() {
        var that = this;
        var $section = $('section[data-section]');
        $section.waypoint(function(direction) {
            if (direction === 'down') {
                that.navActive($(this.element).data('section'));
            }
        }, {
            offset: '150px'
        });
        $section.waypoint(function(direction) {
            if (direction === 'up') {
                that.navActive($(this.element).data('section'));
            }
        }, {
            offset: function() {
                return -$(this.element).height() + 155;
            }
        });
    }

    // Window Scroll
    windowScroll() {
        $(window).scroll(function(event) {
            var header = $('.ep2016-header'),
                scrlTop = $(this).scrollTop(),
                container = $('.navbar-container');
            if (scrlTop > 100 && scrlTop <= 2000) {
                header.addClass('navbar-fixed-top ep2016-animated slideInDown');
                container.addClass('navbar-container-fixed ');
            } else if (scrlTop <= 100) {
                if (header.hasClass('navbar-fixed-top')) {
                    header.addClass('navbar-fixed-top ep2016-animated slideOutUp');
                    setTimeout(function() {
                        header.removeClass('navbar-fixed-top ep2016-animated slideInDown slideOutUp');
                        container.removeClass('navbar-container-fixed ');
                    }, 100);
                }
            }
        });
    }
}

angular.module('euroProno2016WebApp')
    .controller('NavbarController', NavbarController);
