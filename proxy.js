var http = require('http'),
    httpProxy = require('http-proxy');

var proxy = httpProxy.createProxyServer({target:'http://openapi.tencentyun.com'}).listen(8321);

var log = require('./log');
var record = function(reqUrl,resBody){
  console.log(reqUrl);
  console.log(resBody);
  try{
    var resJson = JSON.parse(resBody);
    if(resJson.ret == 0){
      log.info({
        data:{
          req:reqUrl,
          res:resBody
        }
      },'api proxy success');
    }else{
      log.warn({
        data:{
          req:reqUrl,
          res:resBody
        }
      },'qqzone unsuccess resturn');
    }
  }catch (e){
    log.error({
      data:{
        error:e
      }
    },'parse json error');
  }

}

proxy.on('proxyRes', function (proxyRes, req, res) {
  var chunks = '';
  var _end = res.end;
  var _write = res.write;
  res.write = function( data ) {
         if( chunks ) {
             chunks += data;
         } else {
             chunks = data;
         }
         _write.apply(res,[data]);
  };
  res.end = function(){
    var reqUrl = req.url;
    var resBody = chunks.toString();
    record(reqUrl,resBody);
    _end.apply(res,arguments);
  }
});



http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9000);
