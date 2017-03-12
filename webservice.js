var http = require('http');
var request = require('request');
var parseString = require('xml2js').parseString;

var req_opt = {
    method: "POST",
    host: "http://www.gpsso.com",
    port: 80,
    path: '/webservice/kuaidi/kuaidi.asmx/KuaidiQuery',
    headers: {
        "Content-Type": "text/xml; charset=utf-8"
    }
}

var postXml = '<?xml version="1.0" encoding="utf-8"?>' +
    '<soap:Envelope xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">'
    + '<soap:Header>'
    + '<ApiSoapHeader xmlns="http://gpsso.com/">'
    + '<APICode>string</APICode>'
    + '<APIKey>string</APIKey>'
    + '</ApiSoapHeader>'
    + '</soap:Header>'
    + '<soap:Body>'
    + '<KuaidiQuery xmlns="http://gpsso.com/">'
    + '<Compay>string</Compay>'
    + '<OrderNo>string</OrderNo>'
    + '</KuaidiQuery>'
    + '</soap:Body>'
    + '</soap:Envelope>';

var postData = { Compay: '顺丰', OrderNo: '000999888' };
function invokeWebService() {
    var http_req = http.request(req_opt, function (res) {
        res.on("data", function (d) {
            body = d;
        }).on("end", function () {
            var response = body.toString();
            console.log(response);


        }).on("error", function (err) {
            //TODO：webservice调用失败后
        });
    });
    http_req.write(postData);
    http_req.end();
    return "调用webservice";
}

function requsetWebService(data, fn) {

    request.post('http://www.gpsso.com/webservice/kuaidi/kuaidi.asmx/KuaidiQuery', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // var info = JSON.parse(body);
            // console.log(info.stargazers_count + " Stars");
            //console.log(info.forks_count + " Forks");
            console.log(body);
            parseString(body, function (err, result) {
                console.dir(JSON.stringify(result));
                fn && fn(result);
            });

        }
    }).form(data);
    return "test";
}

module.exports.webservice = invokeWebService;
module.exports.requsetWebservice = requsetWebService;