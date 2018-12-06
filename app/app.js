(function () {
    'use strict';

    angular.module('elogbooks', [
        'ui.router',
        'elogbooks.quote',
        'elogbooks.job',
        'elogbooks.user'
    ])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/quotes/list');
    }]);
})();