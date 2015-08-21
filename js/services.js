app.service('menuService',['$http', '$q',function($http, $q){
	var deferred = $q.defer();
	    
    function menus(){
    	$http.get("http://mesko.cl/api/welcome/menus/", {cache:true})
    	.success(function(data){
    		deferred.resolve(data);
    	});
    	return deferred.promise;
    }

    return {
    	menus:menus
    }
}]);

//servicio de datos catalogo
app.service('catalogoSrv', ['$http', '$q','$window', function($http, $q, $window){
	
	function filtros(){
		var datos = ['Nombre', 'Precio Menor', 'Precio Mayor'];
		return datos;
	}
	function filtrar(obj){
		console.log(obj)
	}
	function all(cat, sub){
		var deferred = $q.defer();
		$http.get('http://mesko.cl/api/welcome/productos/?cat='+cat+'&sub='+sub)
		.success(function(data){
			deferred.resolve(data);
		});
		return deferred.promise;
	}

	function producto(p){
		var deferred = $q.defer();
		$http.get('http://mesko.cl/api/welcome/producto/?p='+p)
		.success(function(data){
			deferred.resolve(data);
		})
		return deferred.promise;
	}

	//alamacenamiento
	var local = $window.localStorage;
	function crearFavorito(p){
		var favoritos = verFavoritos();
		favoritos.push(p);
		local.setItem('favoritos', JSON.stringify(favoritos));
	}

	function verFavoritos(){
		var favoritos = local.getItem('favoritos');
		if(!favoritos){
			favoritos = [];
		}else{
			favoritos = JSON.parse(favoritos)
		}

		return favoritos
	}

	return {
			select:all,
			producto:producto,
			filtros:filtros,
			filtrar:filtrar,
			crearFavorito:crearFavorito,
			verFavoritos:verFavoritos
	}
}]);	
