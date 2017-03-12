var express = require('express');
var app = express();
 
var webservice=require('./webservice');
app.get('/', function (req, res) {
   res.send('Hello World');
});
app.get('/webservice',function(req,res){
    res.send(webservice.requsetWebservice());
});
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})