// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'HELX' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'helx.controllers' is found in controllers.js
angular.module('HELX',
[
  'ionic',
  'helx.controllers',
  'ionic.ion.imageCacheFactory',
  'quizApp',
  'templates',
  'ngCookies'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    window.shouldRotateToOrientation = function(degrees) {
      return true;
    }
    })
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider ) {

  //$httpProvider.interceptors.push('xmlHttpInterceptor');
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }

    //disable caching globally.
    $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    $httpProvider.defaults.useXDomain = true;
    //$httpProvider.defaults.withCredentials = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];


  $stateProvider

  .state('app', {
		url: '/app',
		templateUrl: 'helx-header.html',
		controller: 'AppCtrl'
  })

  .state('app.splash', {
    url: '/',
    views: {
      'headerContent': {
        templateUrl: 'helx-splash.html'
      }
    }
  })

  .state('app.launch', {
    url: '/launch',
    views: {
        templateUrl: 'helx-launch.html'
    }
  })

   .state('app.main', {
    url: '/main',
    views: {
      'headerContent': {
        templateUrl: 'helx-main.html'
      }
    }
  })

  // Sales Quiz Pages
  .state('app.quizintro', {
    url: '/sales-quiz-intro',
    views: {
      'headerContent': {
        templateUrl: 'helx-quiz-intro.html',
        controller: 'QuizCtrl',
        cache: false
      }
    }
  })
  .state('app.quiz', {
    url: '/quiz',
    views: {
      'headerContent': {
        templateUrl: 'quiz/helx-quiz.html',
        controller: 'QuizCtrl',
        cache: false
      }
    }
  })

  // Workflow Simulation Pages
  .state('app.workflow', {
    url: '/workflow',
    views: {
      'headerContent': {
        templateUrl: 'helx-workflow.html'
      }
    }
  })

 // Data Proof Pages
  .state('app.data', {
    url: '/data',
    views: {
      'headerContent': {
        templateUrl: 'helx-data-proof.html'
      }
    }
  })

 // Semiens Ultrasound Product Pages
  .state('app.products', {
    url: '/products',
	views: {
      'headerContent': {
    	templateUrl: 'helx-products.html'
	  }
	}
  })
  .state('app.acuson', {
    url: '/acuson',
  views: {
      'headerContent': {
      templateUrl: 'products/helx-single-products.html'
    }
  }
  })

  .state('app.products.ultrasound', {
    url: '/ultrasound',
    views: {
      'productsContent': {
        templateUrl: 'helx-ultrasound.html'
      }
    },
    onEnter: function(){

              //console.log('One enter loaded this log.');
    }
  })

// Single Product Pages
  .state('app.acuson.s3000', {
    url: '/s3000',
    views: {
      'singleproductsContent': {
        templateUrl: 'products/helx-s3000.html'
      }
    }
  })

  .state('app.acuson.s2000', {
    url: '/s2000',
    views: {
      'singleproductsContent': {
        templateUrl: 'products/helx-s2000.html'
      }
    }
  })

  .state('app.acuson.s1000', {
    url: '/s1000',
    views: {
      'singleproductsContent': {
        templateUrl: 'products/helx-s1000.html'
      }
    }
  })

// Resource Library Pages
	.state('app.library', {
      url: '/library',
      views: {
        'headerContent': {
          templateUrl: 'library/library-main.html',

            /*controller: function($scope, $http, $interval) {
              $interval( function(){
                  $http({
                    method: 'GET',
                    url: '/#/app/library'
                       }).then(function successCallback(response) {
                         $scope.hide={Offline:false};
                         $scope.show={Offline:false};
                         $scope.online_status_string = 'online';
                         console.log('Online: true');
                        }, function errorCallback(response) {
                          $scope.hide={Offline:true};
                          $scope.show={Offline:true};
                          $scope.online_status_string = 'online';
                          console.log('Online: false');
                  });
              }, 100, true);
          },
          */
          cache: false

        }
      }
    })

    .state('app.clinical', {
      url: '/clinical-images',
      views: {
        'headerContent': {
          templateUrl: 'library/clinical.html'
        }
      }
    })

    .state('app.literature', {
      url: '/clinical-literature',
      views: {
        'headerContent': {
          templateUrl: 'library/literature.html'
        }
      }
    })

    .state('app.videos', {
      url: '/clinical-videos',
      views: {
        'headerContent': {
          templateUrl: 'library/videos.html'
        }
      }
    })

    // Siemens Ultrasound Information
    .state('app.siemens-information', {
        url: '/siemens-information',
        views: {
          'headerContent': {
            templateUrl: 'helx-siemens-ultrasound-info.html'
          }
        }
      })

    .state('app.contact', {
        url: '/contact',
        views: {
          'headerContent': {
            templateUrl: 'helx-contact.html'
          }
        }
      })

    .state('app.system', {
        url: '/system',
        views: {
        'headerContent': {
            templateUrl: 'system-tree/helx-family-tree.html',

            /*  controller: function($scope, $http, $timeout) {

                setTimeout(function(){
                  $http({
                    method: 'GET',
                    url: '/#/app/system'
                       }).then(function successCallback(response) {
                         $scope.hide={Offline:false};
                         $scope.show={Offline:false};
                         $scope.online_status_string = 'online';
                         console.log('Online: true');
                        }, function errorCallback(response) {
                          $scope.hide={Offline:true};
                          $scope.show={Offline:true};
                          $scope.online_status_string = 'online';
                          console.log('Online: false');
                  });

                }, 100, true);
            }
            */
          }
        }
    })


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/');

});

/*
.factory('onlineStatus', ["$window", "$rootScope", function ($window, $rootScope) {
    var onlineStatus = {};

    onlineStatus.onLine = $window.navigator.onLine;

    onlineStatus.isOnline = function() {
        return onlineStatus.onLine;
    }

    $window.addEventListener("online", function () {
        onlineStatus.onLine = true;
        $rootScope.$digest();
        console.log('online');
    }, true);

    $window.addEventListener("offline", function () {
        onlineStatus.onLine = false;
        $rootScope.$digest();
        console.log('offline');
    }, true);

    return onlineStatus;
}]);
*/
