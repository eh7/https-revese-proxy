var https = require('http');
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://eh7.co.uk' });
    // proxy.web(req, res, { target: 'http://localhost:5001' });
}).listen(3006, (a, b) => {
  console.log('listen localhost:3006 :: ', a, b);
});

/*
var http = require('http');

http.createServer(onRequest).listen(3006);

function onRequest(client_req, client_res) {
  console.log('serve: ' + client_req.url);

  var options = {
    hostname: 'www.google.com',
    port: 80,
    path: client_req.url,
    method: client_req.method,
    headers: client_req.headers
  };

  var proxy = http.request(options, function (res) {
    client_res.writeHead(res.statusCode, res.headers)
    res.pipe(client_res, {
      end: true
    });
  });

  client_req.pipe(proxy, {
    end: true
  });
}
*/
