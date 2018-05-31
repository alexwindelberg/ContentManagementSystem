const express = require('express');
const router = express.Router();
const faker = require('faker');
const Post = require('../../models/Post');



// overwrite of the default layout being used
router.all('/*', (req, res, next)=>{

  req.app.locals.layout = 'admin';
  next();
});

// we don't have to add admin to this route because in
// app.js we are already requiring the user to type admin in
// order to get to this file
router.get('/', (req, res)=>{

  res.render('admin/index');

});

router.post('/generate-fake-posts', (req,res)=>{

  for(let i = 0; i < req.body.amount; i++){

      let post = new Post();

      post.title = faker.name.title();
      post.status = 'public';
      post.body = faker.lorem.sentence();
      post.allowComments = faker.random.boolean();

      post.save().then(savedPost=>{});

  }

      res.redirect('/admin/posts');

});




// export these functions to the file that calls this file
module.exports = router;
