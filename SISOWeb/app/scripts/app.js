'use strict';

/**
 * @ngdoc overview
 * @name sisowebApp
 * @description
 * # sisowebApp
 *
 * Main module of the application.
 */
angular
  .module('sisowebApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/siso', {
        templateUrl: 'views/siso.html',
        controller: 'SisoCtrl',
        controllerAs: 'siso'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
