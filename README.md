
## Controllers and Services

-	Organisation

	<!-- new file structure -->
        
            - app               <!-- holds all our files for node components (models, routes) -->
            ----- models
            ---------- todo.js  <!-- defines the todo model -->
            ----- routes.js     <!-- all routes will be handled here -->
        
            - config            <!-- all our configuration will be here -->
            ----- database.js
        
            - public            <!-- holds all our files for our frontend angular application -->
            ----- core.js       <!-- all angular code for our app -->
            ----- index.html    <!-- main view -->
        
            - package.json      <!-- npm configuration to install dependencies/modules -->
            - server.js         <!-- Node configuration -->


## DataBase
			
-	// config/database.js
        
            module.exports = {
                url : 'mongodb://node:node@mongo.onmodulus.net:27017/uwO3mypu'
            };
        
-	// server.js (new)
        
            // load the config
            var database = require('./config/database');
        
            mongoose.connect(database.url);     // connect to mongoDB database on modulus.io
			
## Model
			
-	// app/models/todo.js

            // load mongoose since we need it to define a model
            var mongoose = require('mongoose');
        
            module.exports = mongoose.model('Todo', {
                text : String,
                done : Boolean
            });
        

## Routes		
		
-	// app/routes.js

        // load the todo model
        var Todo = require('./models/todo');
        
        // expose the routes to our app with module.exports
        module.exports = function(app) {
        
            // api ---------------------------------------------------------------------
            // get all todos
            app.get('/api/todos', function(req, res) {
        
                ...
        
            });
        
            // create todo and send back all todos after creation
            app.post('/api/todos', function(req, res) {
        
                ...
        
            });
        
            // delete a todo
            app.delete('/api/todos/:todo_id', function(req, res) {
        
                ...
        
            });
        
            // application -------------------------------------------------------------
            app.get('*', function(req, res) {
                res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
            });
        
        };
        
-	// server.js
        ...
        
            // load the routes
            require('./app/routes')(app);
        
        ...
        
## Clean App, Clean Mind
		
-	// server.js (final)

            // set up ======================================================================
            var express  = require('express');
            var app      = express();                               // create our app w/ express
            var mongoose = require('mongoose');                     // mongoose for mongodb
            var port     = process.env.PORT || 8080;                // set the port
            var database = require('./config/database');            // load the database config
            var morgan = require('morgan');             // log requests to the console (express4)
            var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
            var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)
        
            // configuration ===============================================================
            mongoose.connect(database.url);     // connect to mongoDB database on modulus.io
        
            app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
            app.use(morgan('dev'));                                         // log every request to the console
            app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
            app.use(bodyParser.json());                                     // parse application/json
            app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
            app.use(methodOverride());
        
            // routes ======================================================================
            require('./app/routes.js')(app);
        
            // listen (start app with node server.js) ======================================
            app.listen(port);
            console.log("App listening on port " + port);
        

		
