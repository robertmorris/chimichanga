(function() {
    'use strict';

    angular
        .module('chimichanga.login')
        .run(appRun);

    // appRun.$inject = ['routehelper']

    /* @ngInject */
    function appRun(routehelper) {
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/login',
                config: {
                    templateUrl: 'chimichanga/login/login.html',
                    controller: 'Login',
                    controllerAs: 'vm',
                    title: 'login'
                }
            }
        ];
    }
})();