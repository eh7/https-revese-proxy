const https = require('https');
const fs = require('fs');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer({});

require('dotenv').config()

console.log(process.env.TLS_CHAIN);

const PORT = process.env.PORT;

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
  // key: fs.readFileSync('certs/test00.key'),
  // cert: fs.readFileSync('certs/test00.crt'),
  key: fs.readFileSync(process.env.TLS_KEY),
  cert: fs.readFileSync(process.env.TLS_CRT),
  ca: ca
};

https.createServer(options, function (req, res) {
  proxy.web(req, res, { target: 'http://eh7.co.uk' });
  // res.writeHead(200);
  // res.end("hello world\n");
}).listen(PORT, function () {
  console.log('listening on port ' + PORT);
});
