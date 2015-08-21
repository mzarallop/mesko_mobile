app.controller("homeController", ["$scope",function($scope){

}]);

app.controller("categoriasCtr", ["$scope","menuService","$window", function($scope, menuService, $window){

	var menu = menuService.menus();
		menu.then(function(data){
            $scope.lista_menu = data;
        });


    $scope.sub = function(cat){
		$scope.lista_sub = $scope.lista_menu[cat];
	}

	$scope.productos = function(cat, sub){
		console.log(cat, sub);
		$window.location.href= '#/catalogo/'+cat+'/'+sub
	}

}]);

app.controller("catalogoCtr", ["$scope", "$routeParams", "catalogoSrv","$window", function($scope, $routeParams, catalogoSrv, $window){
	 var cat = $routeParams.categoria;
	 var sub = $routeParams.subcategoria;

    catalogoSrv.select(cat, sub).then(function(data){$scope.productos = data})
    $scope.filtros = catalogoSrv.filtros();
    $scope.fn_producto = function(a){$window.location.href='#/producto/'+a;}
    $scope.filtrar= function(f){
        console.log(f)
    }
}])

app.controller("productoCtr", ["$scope", "$routeParams","catalogoSrv", function($scope, $routeParams, catalogoSrv){

	var producto = $routeParams.producto;

    catalogoSrv.producto(producto)
    .then(function(data){
        $scope.producto = data[0];
        $scope.slides = data[0].imagenes;
    })
    var p = $scope.producto;


    $scope.direction = 'left';
    $scope.currentIndex = 0;

    $scope.setCurrentSlideIndex = function (index) {
        $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
        $scope.currentIndex = index;
    };

    $scope.isCurrentSlideIndex = function (index) {
        return $scope.currentIndex === index;
    };

    $scope.prevSlide = function () {
        $scope.direction = 'left';
        $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
    };

    $scope.nextSlide = function () {
        $scope.direction = 'right';
        $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
    };

}]);

app.animation('.slide-animation', function () {
        return {
            beforeAddClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if(scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {left: finishPoint, onComplete: done });
                }
                else {
                    done();
                }
            },
            removeClass: function (element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if(scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, { left: startPoint }, {left: 0, onComplete: done });
                }
                else {
                    done();
                }
            }
        };
    });

app.animation('.contenido', function(){
    return {
        leave:function(element, done){
            element.addClass('opaco');
            done();
        },
        enter:function(element, done){
            element.addClass('opaco');
            done();
        }
    }
})
