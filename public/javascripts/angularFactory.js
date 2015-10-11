app.factory('factoryPost', ['$http', function($http){
	var o = {
		
		posts:[ { title:"hello", link:"test link", upvotes:0 } ],
		
		post:[],

		getAll: function(){
			return $http.get('/posts');
		},

		create: function(post){
			return $http.post('/posts', post);
		},
		
		getPostById: function(id){
			return $http.get('/posts/' + id);
		},

		updatePost: function(post){
			return $http.put('/posts/'+post._id, post);
		},		
		
		delete: function(id){
			return $http.delete('/posts/' + id);
		},
		getCommentById: function(id){
			return $http.get('/comments/' + id);
		},
	};
	/*o.getAll = function(){
		$http.get('/posts').success(function(data){
			angular.copy(data,o.posts);
			//o.posts.push(data);
			//o.posts=data;			
		});
		return o.posts;
	};
	o.getPostById = function(id){
		$http.get('/posts').success(function(data){
			angular.copy(data[id],o.post);
		});
		return o.post;
	};
	o.create = function(post){
		$http.post('/posts',post).success(function(data){
			o.posts.push(data);
		});
		return o.posts;
	};
	o.delete = function(id){
		return $http.delete('/posts' + id)
	}*/
	return o;
}]);