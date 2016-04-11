var express = require('express');
var http = require('http');
var path = require('path');
var mongoose = require('mongoose');
var cors = require('cors');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname), 'views');
app.use(cors());

//development only
if('development' == app.get('env')){
    mongoose.connect('mongodb://127.0.0.1:27017/principalLog');
}

mongoose.model('logs', {Timestamps: String, AgentSessionId: String});

app.get('/', function(req, res){
    mongoose.model('logs').find(function(err, logs){
        res.send(logs);
    });
});

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});