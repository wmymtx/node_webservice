var express = require('express');
var app = express();
 
var webservice=require('./webservice');
app.get('/', function (req, res) {
   res.send('Hello World');
});
app.get('/webservice',function(req,res){
    console.log(req.query.c);
    console.log(req.query.n);
    var postData={ Compay: req.query.c, OrderNo: req.query.n };
   // res.send(webservice.requsetWebservice());
   webservice.requsetWebservice(postData,function(data){
       res.json(data);
   });
});
 
var server = app.listen(8081, function () {
 
  var host = server.address().address
  var port = server.address().port
 
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
 
})