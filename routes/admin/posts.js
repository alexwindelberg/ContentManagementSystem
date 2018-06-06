const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const fs = require('fs');
const { isEmpty, uploadDir } = require('../../helper/upload-helper');


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

  let fileName = '';
  let errors = [];

  if(!isEmpty(req.files)){
    let file = req.files.file;
        fileName = Date.now() + '-' + file.name;

    file.mv('./public/uploads/' + fileName, (err)=>{

      if(err) throw err;

    });

  }

  let allowComments = true;

  if(req.body.allowComments){

    allowComments = true;
  }else{
    allowComments = false;
  }

  const newPost = new Post({
      title         : req.body.title,
      status        : req.body.status,
      allowComments : allowComments,
      body          : req.body.body,
      file          : fileName

  });


  newPost.save().then(savedPost=>{

      console.log(savedPost);
      res.redirect('/admin/posts');

  }).catch(validator => {

    res.render('admin/posts/create', {errors : validator.errors});

  });


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

  Post.findOne({_id: req.params.id})
      .then(post =>{
        // post up here now contains all the info from the database
        // so we can ask it to remove the record with post.remove()
        fs.unlink(uploadDir + post.file, (err) => {
            post.remove();
            res.redirect('/admin/posts');
        });


      })

});

module.exports = router;
