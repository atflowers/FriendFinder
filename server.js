var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var router = express.Router();

var htmlRoutes = require('./app/routing/htmlRoutes');
var apiRoutes = require('./app/routing/apiRoutes');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', apiRoutes);
app.use('/', htmlRoutes);
// app.use('/survey', htmlRoutes);
// app.use('/api/friends', apiRoutes);

// router.use('/', apiRoutes);
// app.use("/",router);
// app.use("*",function(req,res){
//   res.sendFile(__dirname + "/public/404.html");
// });

// var roster = [
//     {
//         name: 'Mark'
//     },
//     {
//         name: 'Allen'
//     },
//     {
//         name: 'Techson the Great'
//     }
// ];

// From default express setup:
// Get port from environment and store in Express.
var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

// From default express setup:
// Create HTTP server. Listen on provided port, on all network interfaces.
var server = http.createServer(app);
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

// From default express setup:
// Normalize a port into a number, string, or false.
function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

// define a get route that returns a welcome message
/* app.get('/', function (req, res) {
    // res.send('Welcome to my site!');
    res.sendFile(path.join(__dirname, 'app/public/home.html'));
});   */

// // get route that returns three student objects
// app.get('/students', function (req, res) {
//     res.json(roster);
// });

// // return a student by ID (index in the array)
// app.get('/students/:studentID', function (req, res) {
//     res.json(roster[req.params.studentId]);
// });

// app.post('/add', function (request, response) {
//     console.log(request.body);
//     if (request.body.name) {
//         roster.push(request.body);
//         response.send('Student added joe!');
//     } else {
//         response.send('You are wrong! Enter data, foo. Issue to the max.');
//     }
// });


/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  //debug('Listening on ' + bind);
  console.log('Listening on ' + bind);
}