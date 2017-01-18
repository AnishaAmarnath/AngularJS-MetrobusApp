var Hapi = require('hapi');
var Bcrypt = require('bcryptjs');
var Basic = require('hapi-auth-basic');
var Vision = require('vision');
var Inert = require('inert');
var Good = require('good');

var app = new Hapi.Server();
app.connection({ port: 8080 });
require('./api/routes')(app)

var users = {
    anisha: {
        username: 'anisha',
        password: '$2a$10$LiBcXR.J3M3wLbVaIP7oWOc7kC/0hr6mgeFUDuRxIPy9WXHpw10Va',   // 'login'
        name: 'Anisha',
      },
    admin: {
        username: 'admin',
        password: '$2a$10$qNk9aDm7uC3nLQt9fM0InebFUSTLkcXS6Nd7kBPEZiHLlZScpL4/S',   // 'password'
        name: 'Admin',
    }
};

var validate = function (request, username, password, callback) {
    var user = users[username];
    if(user){
    Bcrypt.compare(password, user.password, function (err, isValid) {
        callback(err, isValid, {name: user.name});
    });
  }
  else
    return callback(null, false);
};

app.register([  
  {
    register: require('vision')  
  },
  {
    register: require('inert')  
  },
  {
    register : Basic
  },
  {
    register : Good,
    options : {
      reporters:[{
        reporter: require('good-console'),
        events: {
          response: '*',
          log: '*'
          //log : ['error', 'medium']
        }
      }]
    }
  },
  {
    register: require('hapi-mailer'),
    options: {
      transport: {
        service: 'Gmail',
        auth: {
            user: 'neilhapi123@gmail.com',
            pass: 'hapifinalexam'
        }
      }
    }
  }
], function(err) {
  if (err) {
    throw err;
  }
  app.views({
    engines: {
      html: require('handlebars')
    },
    path:  __dirname + '/client'
  });
  app.route({
    method: 'GET',
    path: '/{filename*}',
    handler: {
      directory: {
        path:    __dirname + '/client',
        listing: false,
        index:   false
      }
    }
  });
  app.auth.strategy('simple', 'basic', { validateFunc: validate });
  
  app.route(
  {
    method: 'GET',
    path: '/',
    config: {
      auth: 'simple',
      handler: {
        view: {
          template: 'views/index'
        }
      }
    }
  });
});

app.start(function () {
    app.log('Server running at:', app.info.uri);
});

