app.controller('MainController', ['$scope', '$state','$location', '$stateParams', 'factoryPost', 
						function($scope, $state, $location, $stateParams, factoryPost){
	$scope.posts=[];
	$scope.post={};

	$scope.getAllPosts = function(){
		factoryPost.getAll().then(function(data){
			$scope.posts = data.data;
		});
		//$scope.posts = factoryPost.getAll();		
	};

	$scope.getPostById = function(id){
		factoryPost.getPostById(id).then(function(data){
			$scope.post = data.data;
		});
	}	

	$scope.createAPost = function(){
		factoryPost.create($scope.post).then(function(data){
			$scope.posts.push(data.data);
			$scope.getAllPosts();
		});
		 //$location.path('/posts');
		 $state.go('admin');
	};

	$scope.updatePost = function(){
		factoryPost.updatePost($scope.post).then(function(data){

			//$location.path('/posts');	
			//$state.go('admin');
			$state.go('admin', {}, { reload: true });
		});
	};

	$scope.deletePost = function(id){
		factoryPost.delete(id).then(function(data){
			if (data.data){
				$scope.posts.splice(id, 1);
			}
		});
	};

	$scope.incrementUpvotes = function(id){
		factoryPost.getPostById(id).then(function(data){
			$scope.post = data.data;
			$scope.post.upvotes = $scope.post.upvotes + 1;
			$scope.updatePost();
		})
	};

	$scope.decrementUpvotes = function(id){
		factoryPost.getPostById(id).then(function(data){
			$scope.post = data.data;
			$scope.post.upvotes = $scope.post.upvotes - 1;
			$scope.updatePost();
		});
	};	

	$scope.redirectToCreateAPostScreen = function(){
		 //$location.path('/create-post');
		 $state.go('create-post');
	};

	$scope.redirectToUpdateAPostScreen = function(post_id){
		 //$location.path('/update-post/'+id);
		 $state.go('update-post', { id: post_id});
	};

	$scope.redirectToContactPage = function(){
		 //$location.path('/contact-me');
		 $state.go('contact-me');
	};

	$scope.redirectToPostDetail = function(post_id){
		//$location.path('/postDetail/'+id);
		$state.go('view-post',{id: post_id});

	}

	$scope.cancel = function(id){
		//$location.path('/postDetail/'+id);
		$state.go('admin');
	}

	$scope.getAllPosts();
}]);


app.controller('PostDetailController', ['$scope', '$state', '$location', '$stateParams', 'factoryPost', 
						function($scope, $state, $location, $stateParams, factoryPost){

	//$scope.post = factoryPost.getPostById($stateParams.id);
	$scope.post = {};
	$scope.comments=[];

	$scope.getPostByIdincludingComments = function(id){
		factoryPost.getPostById(id).then(function(postData){
			$scope.post = postData.data;
			//console.log(postData.data.comments.length);
			for (var i=0;i<postData.data.comments.length;i++){
				//console.log(postData.data.comments[i]);
				factoryPost.getCommentById(postData.data.comments[i]).then(function(commentData){
					//console.log(commentData);
					$scope.comments.push(commentData);
				})
			}
			//console.log($scope.comments);
		});	

	};

	$scope.updatePost = function(){
		factoryPost.updatePost($scope.post);
		alert("Post successfully updated");
		$location.path('/posts');
		/*factoryPost.updatePost(id).then(function(data){
			$scope.posts = data.data;
		});*/
	};

	$scope.cancel = function(){
		//$location.path('/posts');
		$state.go('admin');
	};

	$scope.getPostByIdincludingComments($stateParams.id);

}]);


app.controller('PageController',['$scope','$http', '$stateParams', function($scope, $http, $stateParams){
	$http.get('page.json').success(function(data){
		$scope.page=data[$stateParams.id];
	});
}]);