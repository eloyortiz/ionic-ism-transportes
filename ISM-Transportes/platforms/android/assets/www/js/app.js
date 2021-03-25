var app = angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
});


app.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider

	// setup an abstract state for the tabs directive
	.state('tab', {
	    url: "/tab",
	    abstract: true,
	    templateUrl: "templates/tabs.html"
	})

	// Each tab has its own nav history stack:
	.state('tab.partidas', {
	    url: '/partidas/:camionId',
	    views: {
	        'tab-partidas': {
	            templateUrl: 'templates/tab-partidas.html',
	            controller: 'AppCtrl'
	        }
	    }
	})

	  .state('tab.destinos', {
	      url: '/destinos/:partidaId',
	      views: {
	          'tab-destinos': {
	              templateUrl: 'templates/tab-destinos.html',
	              controller: 'AppCtrl'
	          }
	      }
	  })


	  .state('tab.pedidos', {
	      cache: false,
	      url: '/pedidos/:destinoId',
	      views: {
	          'tab-pedidos': {
	              templateUrl: 'templates/tab-pedidos.html',
	              controller: 'AppCtrl'
	          }
	      }
	  })

	  .state('tab.bultos', {
	      url: '/bultos/:pedidoId',
	      views: {
	          'tab-bultos': {
	              templateUrl: 'templates/tab-bultos.html',
	              controller: 'AppCtrl'
	          }
	      }
	  })


	  .state('tab.pedido-detalle', {
	      url: '/pedido/:pedidoId',
	      views: {
	          'tab-pedidos': {
	              templateUrl: 'templates/pedido-detalle.html',
	              controller: 'AppCtrl'
	          }
	      }
	  })

	.state('tab.incidencia', {
	    url: '/incidencia/:bultoId',
	    views: {
	        'tab-bultos': {
	            templateUrl: 'templates/incidencia.html',
	            controller: 'imageCtrl'
	        }
	    }
	})

	.state('tab.firma', {
	    url: '/firma/:pedidoId',
	    views: {
	        'tab-pedidos': {
	            templateUrl: 'templates/firma.html',
	            controller: 'SignatureCtrl'
	        }
	    }
	})

	.state('inicio', {
	    url: '/inicio',
	    templateUrl: 'templates/inicio.html',
	    controller: 'AppCtrl'
	})

    //.state('tab.account', {
    //  url: '/account',
    //  views: {
    //    'tab-account': {
    //      templateUrl: 'templates/tab-account.html',
    //      controller: 'AppCtrl'
    //    }
    //  }
    //})

    ;

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/inicio');

});
