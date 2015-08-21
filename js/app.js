var app = angular.module('app', ['ngRoute','ngAnimate', 'ngTouch', 'ngSanitize']);
app.config(["$routeProvider", "$httpProvider",function($routeProvider, $httpProvider){

	$httpProvider.interceptors.push(function ($q, $rootScope) {
        if ($rootScope.activeCalls == undefined) {
            $rootScope.activeCalls = 0;
        }

        return {
            request: function (config) {
                $rootScope.activeCalls += 1;
                return config;
            },
            requestError: function (rejection) {
                $rootScope.activeCalls -= 1;
                return rejection;
            },
            response: function (response) {
                $rootScope.activeCalls -= 1;
                return response;
            },
            responseError: function (rejection) {
                $rootScope.activeCalls -= 1;
                return rejection;
            }
        };
    });

	$routeProvider
	.when('/', {
		templateUrl:'templates/home.html',
		controller: 'homeController',
		title:'@mzarallop - Pagina principal'
	})
	.when('/categorias', {
		templateUrl:'templates/categorias.html',
		controller:'categoriasCtr',
		 title:'@mzarallop - Categorias'
		})
	.when('/catalogo/:categoria/:subcategoria', {
		templateUrl:'templates/catalogo.html',
		controller: 'catalogoCtr',
		title:'@mzarallop - Catalogo'
	})
	.when('/producto/:producto', {
		templateUrl:'templates/producto.html',
		controller: 'productoCtr',
		title:'@mzarallop - Producto'
	})
	.when('/ubicacion', {
		templateUrl:'templates/ubicacion.html',
		controller: 'ubicacionController',
		title:'@mzarallop - Proyectos que he desarrollado'
	})
	.otherwise({redirecTo:'/'});

}]);

app.run(function($location, $rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
	    if (current.hasOwnProperty('$$route')) {
	        $rootScope.title = current.$$route.title;
	        document.title = current.$$route.title;
	    }else{
	    	document.title = 'Guitarras Mesko';
        }
	});
});

