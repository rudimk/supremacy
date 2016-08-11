var http = require('http'),
  httpProxy = require('http-proxy'),
  HttpProxyRules = require('http-proxy-rules');

var proxyRules = new HttpProxyRules({
        rules: {
                '<url>': '<location>'
                },
        default: '<locations>'
        });


var proxy = httpProxy.createProxy();

http.createServer(function(req, res) {
    var target = proxyRules.match(req);
    if (target) {
      return proxy.web(req, res, {
        target: target
      });
    }

res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('The request url and path did not match any of the listed rules!');
  }).listen(80);