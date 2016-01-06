angular.module("HELX",["ionic","helx.controllers","ionic.ion.imageCacheFactory","quizApp","templates","ngCookies"]).run(function(e){e.ready(function(){window.cordova&&window.cordova.plugins.Keyboard&&(cordova.plugins.Keyboard.hideKeyboardAccessoryBar(!0),cordova.plugins.Keyboard.disableScroll(!0)),window.StatusBar&&StatusBar.styleDefault(),window.shouldRotateToOrientation=function(e){return!0}})}).config(function(e,t){e.state("app",{url:"/app",templateUrl:"helx-header.html",controller:"AppCtrl"}).state("app.splash",{url:"/",views:{headerContent:{templateUrl:"helx-splash.html"}}}).state("app.launch",{url:"/launch",views:{templateUrl:"helx-launch.html"}}).state("app.main",{url:"/main",views:{headerContent:{templateUrl:"helx-main.html"}}}).state("app.quizintro",{url:"/sales-quiz-intro",views:{headerContent:{templateUrl:"helx-quiz-intro.html",controller:"QuizCtrl",cache:!1}}}).state("app.quiz",{url:"/quiz",views:{headerContent:{templateUrl:"quiz/helx-quiz.html",controller:"QuizCtrl",cache:!1}}}).state("app.workflow",{url:"/workflow",views:{headerContent:{templateUrl:"helx-workflow.html"}}}).state("app.data",{url:"/data",views:{headerContent:{templateUrl:"helx-data-proof.html"}}}).state("app.products",{url:"/products",views:{headerContent:{templateUrl:"helx-products.html"}}}).state("app.acuson",{url:"/acuson",views:{headerContent:{templateUrl:"products/helx-single-products.html"}}}).state("app.products.ultrasound",{url:"/ultrasound",views:{productsContent:{templateUrl:"helx-ultrasound.html"}},onEnter:function(){}}).state("app.acuson.s3000",{url:"/s3000",views:{singleproductsContent:{templateUrl:"products/helx-s3000.html"}}}).state("app.acuson.s2000",{url:"/s2000",views:{singleproductsContent:{templateUrl:"products/helx-s2000.html"}}}).state("app.acuson.s1000",{url:"/s1000",views:{singleproductsContent:{templateUrl:"products/helx-s1000.html"}}}).state("app.library",{url:"/library",views:{headerContent:{templateUrl:"library/library-main.html",controller:function(e,t,l){l(function(){t({method:"GET",url:"/#/app/library"}).then(function(t){e.hide={Offline:!1},e.show={Offline:!1},e.online_status_string="online",console.log("Online: true")},function(t){e.hide={Offline:!0},e.show={Offline:!0},e.online_status_string="online",console.log("Online: false")})},100,!0)}}}}).state("app.clinical",{url:"/clinical-images",views:{headerContent:{templateUrl:"library/clinical.html"}}}).state("app.literature",{url:"/clinical-literature",views:{headerContent:{templateUrl:"library/literature.html"}}}).state("app.videos",{url:"/clinical-videos",views:{headerContent:{templateUrl:"library/videos.html"}}}).state("app.siemens-information",{url:"/siemens-information",views:{headerContent:{templateUrl:"helx-siemens-ultrasound-info.html"}}}).state("app.contact",{url:"/contact",views:{headerContent:{templateUrl:"helx-contact.html"}}}).state("app.test",{url:"/test",views:{headerContent:{templateUrl:"test.html"}}}).state("app.system",{url:"/system",views:{headerContent:{templateUrl:"system-tree/helx-family-tree.html",controller:function(e,t,l){setTimeout(function(){t({method:"GET",url:"/#/app/system"}).then(function(t){e.hide={Offline:!1},e.show={Offline:!1},e.online_status_string="online",console.log("Online: true")},function(t){e.hide={Offline:!0},e.show={Offline:!0},e.online_status_string="online",console.log("Online: false")}),console.log("Interval")},100,!0)}}}}),t.otherwise("/app/")}).factory("onlineStatus",["$window","$rootScope",function(e,t){var l={};return l.onLine=e.navigator.onLine,l.isOnline=function(){return l.onLine},e.addEventListener("online",function(){l.onLine=!0,t.$digest(),console.log("online")},!0),e.addEventListener("offline",function(){l.onLine=!1,t.$digest(),console.log("offline")},!0),l}]);