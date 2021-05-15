var fs = require('fs');
var https = require('https');
var http = require('http');
var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({});

require('dotenv').config()

/*
http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://eh7.co.uk' });
    // proxy.web(req, res, { target: 'http://localhost:5001' });
}).listen(3006, (a, b) => {
  console.log('listen localhost:3006 :: ', a, b);
});
*/

const PORT = process.env.PORT;

if (!PORT) {
  console.log('no PORT specified in .env');
  process.exit(1);
}

if (process.env.HTTPS) {
  /*
  const chainLines = fs.readFileSync(
    process.env.TLS_CHAIN,
    'utf8'
  ).split("\n");
  let cert = [];
  let ca = [];
  chainLines.forEach(function(line) {
    cert.push(line);
    if (line.match(/-END CERTIFICATE-/)) {
      ca.push(cert.join("\n"));
      cert = [];
    }
  });

  const options = {
    // key: fs.readFileSync('key.pem'),
    // cert: fs.readFileSync('cert.pem')
    key: fs.readFileSync('certs/test00.key'),
    cert: fs.readFileSync('certs/test00.crt'),
    ca: ca
  };
  const options = {
    key: fs.readFileSync('certs/test00.key'),
    cert: fs.readFileSync('certs/test00.crt'),
    ca: ca
  };
  https.createServer(options, function (req, res) {
    proxy.web(req, res, { target: 'http://eh7.co.uk' });
    // res.writeHead(200);
    // res.end("hello world\n");
  }).listen(8000, function () {
    console.log('listening on port 8000');
  });

  https.createServer(options, function (req, res) {
    res.writeHead(200);
    res.end("hello world\n");
  }).listen(PORT, function (error) {
    console.log(`TLS Server listening on port: ${PORT} :: error: ${error}`);
  });
  */

  const privateKey  = fs.readFileSync(
    process.env.TLS_KEY,
    'utf8'
  );
  const certificate = fs.readFileSync(
    process.env.TLS_CRT,
    'utf8'
  );
  const chainLines = fs.readFileSync(
    process.env.TLS_CHAIN,
    'utf8'
  ).split("\n");
  var cert = [];
  var ca = [];
  chainLines.forEach(function(line) {
    cert.push(line);
    if (line.match(/-END CERTIFICATE-/)) {
      ca.push(cert.join("\n"));
      cert = [];
    }
  });

  https.createServer({
    "key": privateKey,
    "cert": certificate,
    "ca": ca
  }, function (req, res) {
    // res.writeHead(200);
    // res.end("hello world\n");
    proxy.web(req, res, { target: 'http://eh7.co.uk' });
  }).listen(PORT, "0.0.0.0", function(error) { 
    console.log(`TLS Server listening on port: ${PORT} :: error: ${error}`);
  });
} else {
  http.createServer(function(req, res) {
    proxy.web(req, res, { target: 'http://eh7.co.uk' });
    // proxy.web(req, res, { target: 'http://localhost:5001' });
  }).listen(PORT, (error) => {
    console.log('listen http localhost:3006 :: ', error);
  });
}


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
