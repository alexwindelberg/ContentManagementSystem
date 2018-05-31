// we are using express so we need to include it
// we are using express afterwards when we are calling
// routes we call in this file and we need to tell
// express to send these when it calls
const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next)=>{

  req.app.locals.layout = 'home';
  next();
});

router.get('/', (req, res)=>{

  res.render('home/index');

});

router.get('/about', (req, res)=>{

  res.render('home/about');

});

router.get('/login', (req, res)=>{

  res.render('home/login');

});

router.get('/register', (req, res)=>{

  res.render('home/register');

});

// export these functions to the file that calls this file
module.exports = router;
