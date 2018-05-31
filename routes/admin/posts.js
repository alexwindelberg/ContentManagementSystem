const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');


// overwrite of the default layout being used
router.all('/*', (req, res, next)=>{

  req.app.locals.layout = 'admin';
  next();

});


router.get('/', (req, res)=>{

    Post.find({})
        .then(posts=>{

        // When rendering data do not comment the second paramater!
        // the first paramter here is another object your creating
        res.render('admin/posts', {posts: posts});
    });

});


// when you hit this route
router.get('/create', (req, res) =>{

  // render a view
  res.render('admin/posts/create');


});

router.post('/create', (req, res) =>{

  console.log(req.files);

  // let allowComments = true;
  //
  // if(req.body.allowComments){
  //
  //   allowComments = true;
  // }else{
  //   allowComments = false;
  // }
  //
  // const newPost = new Post({
  //     title         : req.body.title,
  //     status        : req.body.status,
  //     allowComments : allowComments,
  //     body          : req.body.body
  // });
  //
  //
  // newPost.save().then(savedPost=>{
  //
  //     console.log(savedPost);
  //     res.redirect('/admin/posts');
  //
  // }).catch(error => {
  //
  //   console.log('coud not save post');
  //
  // });

});

router.get('/edit/:id', (req, res) =>{

  //res.render('admin/posts/edit');

  Post.findOne({_id: req.params.id}).then(post=>{

        res.render('admin/posts/edit', {post: post});

      }).catch(function (error) {
        console.error(error)
    });


});

router.put('/edit/:id', (req, res) =>{

  Post.findOne({_id: req.params.id})
      .then(post=>{

        let allowComments = true;

        if(req.body.allowComments){

          allowComments = true;

        } else {

          allowComments = false;

        }

        post.title = req.body.title,
        post.status = req.body.status,
        post.allowComments = allowComments,
        post.body = req.body.body

        // save and respond to the request
        post.save().then(updatedPost=>{

          res.redirect('/admin/posts');

        });

      })

});

router.delete('/:id', (req, res) =>{

  Post.remove({_id: req.params.id})
      .then(result=>{

        res.redirect('/admin/posts');

      })

});

module.exports = router;
