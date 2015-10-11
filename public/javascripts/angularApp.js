//var app = angular.module('SparkAnalyticsApp',['ngRoute']);

var app = angular.module('SparkAnalyticsApp',['ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider){

	$urlRouterProvider.otherwise('/posts');

	$stateProvider.state('home',
	{
		url: '/posts',
		views:{
			'header':{
				templateUrl: 'views/header.html',
				controller:'MainController'
			},
			'subscribe-me':{
				templateUrl: 'views/subscribe-me.html',
				controller:'MainController'
			},
			'content-1':{
				templateUrl: 'views/posts.html',
				controller:'MainController'
			},
			'content-2':{
				templateUrl: 'views/content2.html',
				controller:'MainController'
			},
			'content-3':{
				templateUrl: 'views/content3.html',
				controller:'MainController'
			},
			'content-4':{
			templateUrl: 'views/content4.html',
			controller:'MainController'
			}
			,
			'content-5':{
			templateUrl: 'views/content5.html',
			controller:'MainController'
			}
				,
			'footer':{
			templateUrl: 'views/footer.html',
			controller:'MainController'
			}
		}
		
	})
	.state('view-post',{
		url: '/postDetail/:id',
			views:{
			'header':{
				templateUrl: 'views/header.html',
				controller:'MainController'
			},
			'post-detail':{
				templateUrl: 'views/postdetail.html',
				controller:'PostDetailController'
			},
			'footer':{
				templateUrl: 'views/footer.html',
				controller:'MainController'
			}
		}
	})
	.state('admin',{
		url: '/admin-post',
		views:{
			'header':{
				templateUrl: 'views/header.html',
				controller:'MainController'
			},
			'admin':{
				templateUrl: 'views/adminpage.html',
				controller:'MainController'
			},
			'footer':{
				templateUrl: 'views/footer.html',
				controller:'MainController'
			}
		}
	})
	.state('create-post',{
		url: '/create-post',
		views:{
			'header':{
				templateUrl: 'views/header.html',
				controller:'MainController'
			},
			'create-post':{
				templateUrl: 'views/create-post.html',																																																																																																																																																																									
				controller:'MainController'
			},
			'footer':{
				templateUrl: 'views/footer.html',
				controller:'MainController'
			}
		}
		
	})
	.state('update-post',{
		url: '/update-post/:id',
		views:{
			'header':{
				templateUrl: 'views/header.html',
				controller:'MainController'
			},
			'update-post':{
				templateUrl: 'views/update-post.html',
				controller:'PostDetailController'
			},
			'footer':{
				templateUrl: 'views/footer.html',
				controller:'MainController'
			}
		}
		
	})
	.state('contact',{
		url: '/contact-me',
		views:{
			'header':{
				templateUrl: 'views/header.html',
				controller:'MainController'
			},
			'contact-me':{
				templateUrl: 'views/contact-me.html',
				controller:'MainController'
			},
			'footer':{
				templateUrl: 'views/footer.html',
				controller:'MainController'
			}
		}
	})
	.state('about',{
		url: '/about-me',
		views:{
			'header':{
				templateUrl: 'views/header.html',
				controller:'MainController'
			},
			'about-me':{
				templateUrl: 'views/about-me.html',
				controller:'MainController'
			},
			'footer':{
				templateUrl: 'views/footer.html',
				controller:'MainController'
			}
		}

	})

}]);


/*app.config(['$routeProvider', function($routeProvider){

	$routeProvider.when('/posts/',{
		templateUrl: 'views/post-new.html',
		controller:'MainController'
	})
	.when('/admin-post/',{
		templateUrl: 'views/post.html',
		controller:'MainController'
	})
	.when('/create-post/',{
		templateUrl: 'views/create-post.html',
		controller:'MainController'
	})
	.when('/contact-me/',{
		templateUrl: 'views/contact-me.html',
		controller:'MainController'
	})
	.when('/about-me/',{
		templateUrl: 'views/about-me.html',
		controller:'MainController'
	})
	.when('/update-post/:id/',{
		templateUrl: 'views/update-post.html',
		controller:'PostDetailController'
	})
	.when('/postDetail/:id/',{
		templateUrl: 'views/singlepost.html',
		controller:'PostDetailController'
	})
	.when('/post/:id',{
		templateUrl: 'views/singlepost.html',
		controller:'SinglePostController'
	})
	.when('/page/:id/',{
		templateUrl: 'views/page.html',
		controller:'PageController'
	})
	.otherwise({
		redirectTo: '/posts'
	})

}]);

app.directive('navigationbar', function() {
  return {
    restrict: 'E',
    //template: 'Navigation',
    controller:['$scope','$http', function($scope, $http){
    	$http.get('page.json').success(function(data){
    		$scope.pages = data;
    	});
    }],
    templateUrl: 'partials/navigationbar.html',
    	link: function(scope, element, attrs, controllers) {
    }
   };
});*/