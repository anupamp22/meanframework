var express = require('express');
var router = express.Router();

module.exports = router;

//injecting and readying the model objects
var mongoose = require('mongoose');

var Post = mongoose.model('Post');

var Comment = mongoose.model('Comment');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//working - approach 3 -> mapping the rest URIs with nodejs, mongodb CRUD operations
router.route('/posts')
	.get(function(req, res){
		Post.find(function(err, posts){
			if (err){
				res.send(err);
			}
			res.json(posts);
		});
	})
	.post(function(req, res){
		var post = new Post(req.body);

		post.save(function(err){
			if (err){
				res.send(err);
			}
			res.json({message:'post created!'});
		});
	});

router.route('/posts/:id')
	.get(function (req, res){
		Post.findById(req.params.id, function(err, post){
			if(err){
				return next(err);
			}
			res.json(post);
		});
	})
	.put(function(req, res){
		Post.findById(req.params.id, function(err, post){
			if (err){
				res.send(err);
			}
			post.title = req.body.title;
			post.content = req.body.content;
			post.link = req.body.link;
			post.upvotes = req.body.upvotes;
			post.save(function(err){
				if (err){
					res.send(err);
				}
				res.json({message: 'post updated'});

			});
		});
	})
	.delete(function(req, res){
		Post.remove({ _id: req.params.id }, function(err, post){
			if (err){
				res.send(err);
			}
			res.json({message: 'post successfully deleted'});
		});
	});


router.route('/comments')
	.get(function(req, res){
		Comment.find(function(err, comments){
			if (err){
				res.send(err);
			}
			res.json(comments);
		});
	});

router.route('/comments/:id')
	.get(function(req,res){
		Comment.findById(req.params.id, function(err,comment){
			if (err){
				res.send(err);
			}
			res.send(comment);
		});
	})
	.delete(function(req, res){
			Comment.remove({ _id: req.params.id }, function(err, comment){
				if (err){
					res.send(err);
				}
				console.log(comment);
				Post.find({'comments':{$in: req.params.id}}).exec(function(err, posts){
					console.log(posts);
					posts.forEach(function(post, index){
						post.comments.splice(post.comments.indexOf(comment._id), 1);
						post.save(function(err){
						if(err){
							req.send(err);
							}
							res.json({message: 'comments successfully deleted'});

						});
					});							
				});		
			});
		});

router.route('/posts/:id/comments')
	.get(function(req, res, next) {
  		/*Post.findById(req.params.id).populate('comment', function(err, posts) {
	    	if (err) { 
	    		return next(err); 
	    	}
	    	res.json(posts.comments[0].body);
  		});*/
		 /*var result = Post.findOne({"_id":req.params.id});
		 Comment.find({"_id":{"$in":result["comments"]}}, function(err, comments){
		 	if (err){
		 		return next(err);
		 	}
		 	res.json(comments);
		 })*/
		Post.findById(req.params.id, function(err, post){
			if (err){
				res.send(err);
			}
			Comment.find({"post":post._id}, function(err, comments){
				if (err){
					res.send(err);
				}
				res.send(comments);
			});
		});
	})
	.post(function(req, res, next) {
		  console.log(req.body);
		  var comment = new Comment(req.body);
		  comment.post = req.params.id;
		  /*comment.body = req.body.body;
		  comment.post = req.body.post;
		  comment.author = req.body.author;
		  comment.upvotes = req.body.upvotes;*/

		  comment.save(function(err, comment){
		    if(err){ 
		    	return next(err);
		    }
		    //res.json(comment);
		    Post.findById(req.params.id, function(err, post){
		    	post.comments.push(comment._id);
		    	post.save(function(err){
		    		if(err){
		    			req.send(err);
		    		}
		    		res.json({message: 'post updated with new comments'});
		    	});

		    });
		    /*req.post.comments.push(comment);
		    req.post.save(function(err, post) 
		    {
		      if(err){ 
		      	return next(err); 
		      }
		      res.json(comment);
		    });*/
		  });
	})
	.delete(function(req, res){
		Comment.remove({ post: req.params.id }, function(err, comment){
			if (err){
				res.send(err);
			}
			Post.findById(req.params.id, function(err, post){
				post.comments.splice(post.comments.indexOf(comment._id), 1);
				post.save(function(err){
					if(err){
						req.send(err);
					}
					res.json({message: 'comments successfully deleted'});

				});

			});

			
		});
	});



//working -  approach 2 -> -> mapping the rest URIs with nodejs, mongodb CRUD operations
/*router.findAllPosts = function(req, res){
	Post.find(function(err, posts){
		if (err){
			res.send(err);
		}
		res.json(posts);
	});
}

router.findPostById = function(req, res){
	Post.findById(req.params.id, function(err,post){
		if(err){
			return next(err);
		}
		res.json(post);
	});
} 

router.addPost = function(req, res){
		var post = new Post(req.body);

		post.save(function(err){
			if (err){
				res.send(err);
			}
			res.json({message:'post created!'});
		});
}

router.updatePost = function(req, res){
		Post.findById(req.params.id, function(err,post){
			if (err){
				res.send(err);
			}
			post.title = req.body.title;
			post.save(function(err){
				if (err){
					res.send(err);
				}
				res.json({message: 'post updated'});

			});
		});
}

router.deletePost = function(req, res){
		Post.remove({ _id: req.params.id }, function(err, post){
			if (err){
				res.send(err);
			}
			res.json({message: 'post successfully deleted'});
		});
}*/

//*****************************************************************
//working -  approach 1 -> -> mapping the rest URIs with nodejs, mongodb CRUD operations
/*router.get('/posts', function(req, res){
	Post.find(function(err, posts){
		if (err){ 
			res.send(err);
		}
		res.json(posts);
	});
});

router.get('/posts/:id', function(req,res){
	Post.findById(req.params.id, function(err,post){
		if(err){
			return next(err);
		}
		res.json(post);
	});
});

router.post('/posts', function(req,res){
	var post = new Post(req.body);

	post.save(function(err){
		if (err){
			res.send(err);
		}
		res.json({message:'post created!'});
	});
});

router.put('/posts/:id', function(req,res){
	Post.findById(req.params.id, function(err,post){
		if (err){
			res.send(err);
		}
		post.title = req.body.title;
		post.save(function(err){
			if (err){
				res.send(err);
			}
			res.json({message: 'post updated'});

		});
	});
});

router.delete('/posts/:id', function(req,res){
	Post.remove({ _id: req.params.id }, function(err, post){
		if (err){
			res.send(err);
		}
		res.json({message: 'post successfully deleted'});
	});
});*/

//*****************************************************************
//not working - original approach
/*router.get('/posts', function(req,res,next){
	Post.find(function(err,posts){
		if(err){return next(err);}
		res.json(posts);
	});
});

router.post('/posts', function(req,res,next){
	var post = new Post(req.body);
	post.save(function(err,posts){
		if(err){return next(err);}
		res.json(posts);

	});
});

router.param('post', function(req,res,next,id){
	var query = Post.findById(id);
	query.exec(function(err,post){
		if(err){return next(err);}
		if (!post){return next(new Error('can\'t find post'));}
		req.post = post;
		return next();
});
});

router.get('posts/:post', function(req,res){
	req.json(req.post);

});

router.put('posts/:post/upvote', function(req,res,next){
	req.post.upvote(function(err,post){
		if(err){return next(err);}
		res.json(post);
	});
});

router.post('posts/:post/comments', function(req,res,next){
	var comment = new Comment(req.body);
	comment.save(function(err,comment){
		if(err){return next(err);}
		req.post.comments.push(comment);
		req.post.save(function(err,post){
			if(err){return next(err);}
			res.json(comment);
		});
	});
});

router.delete('/posts/id', function(req,res){
	Post.findById(req.param.id, function(err,posts){
		posts.remove(function(err,posts){
			res.json(posts);

		});

	});
});*/




