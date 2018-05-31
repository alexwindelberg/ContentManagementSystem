const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const upload = require('express-fileupload');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:3000/cms').then(db =>{

  console.log('Connected');


}).catch(error => console.log(error));



// need to look more into this
app.use(express.static(path.join(__dirname, 'public')));

const {select} = require('./helper/handlebars-helpers');

// The first paramter is the layout that were letting letting handlebars know which
// layout to use, the second paramater lets handlbars know that there are helper
// functions that it will need to look into, the first paramater 'select-object' is the name
// that will be used on handlebars sections the second paramater is the module object
// that needs to be passed
app.engine('handlebars', exphbs({defaultLayout: 'home', helpers: {select_object: select}}));
app.set('view engine', 'handlebars');

// Upload module
app.use(upload());

// Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//method overrride
app.use(methodOverride('_method'));

// this is to include the routes in the routes folder
const home = require('./routes/home/index');
const admin = require('./routes/admin/index');
const posts = require('./routes/admin/posts');
// this is telling node that when someone uses the '/' (calling a route)
// reference the routes folder -> home -> main.js and search for the
// appropriate route that is being called on
app.use('/', home);
app.use('/admin', admin);
app.use('/admin/posts', posts);




app.listen(4500, ()=>{

  console.log(`listening on port 4500`);

});
