var tako = require('tako')
  , request = require('request')
  , path = require('path')
  , twilio = require('twilio').Client
  , app = tako();

app.route('/js/*').files(path.join(__dirname, 'js'));
app.route('/css/*').files(path.join(__dirname, 'css'));
app.route('/html/*').files(path.join(__dirname, 'html'));

app.route('/').html(function (req, resp) {
  //req.pipe(request("http://twilipop.nodejitsu.com/html/index.html")).pipe(resp);
  req.pipe(request("http://localhost/html/index.html")).pipe(resp);
}).methods('GET');



// Ported example from socket.io docs to show integration
app.sockets.on('connection', function (socket) {

  socket.on('makeACall', function (o) {
    makeCall(o.number);
  })

  function makeCall(number){

    var client = new twilio(
        'you'
      , 'keys'
      , 'here'
    );

    var phone = client.getPhoneNumber('any number here');

    phone.setup(function() {
        console.log('setup call')
        phone.makeCall(number, null, function(call) { });

    });

  }
})

app.httpServer.listen(80);
app.httpsServer.listen(443);




