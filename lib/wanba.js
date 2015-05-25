var request = require('request');
var querystring = require('querystring');
var crypto = require('crypto');

module.exports = function(wanbaConfig){

  var wanba = {};

  var wanba_api_host = 'http://119.147.19.43';//玩吧测试环境
  //var wanba_api_host = wanbaConfig.wanba_api_host || 'http://openapi.tencentyun.com';
  var wanba_api_version = wanbaConfig.wanba_api_version || 'v3';

  function rawStr(obj) {
    var keys = Object.keys(obj);
    keys = keys.sort()
    var newObj = {};
    keys.forEach(function (key) {
      if(obj[key]){
        newObj[key.toLowerCase()] = obj[key];
      }
    });

    var string = '';
    for (var k in newObj) {
      string += '&' + k + '=' + newObj[k];
    }
    string = string.substr(1);
    return string;
  };

  wanba.getSignStr = function(method,uri,args){
    var str = method + '&' + encodeURIComponent(uri) + '&' + encodeURIComponent(rawStr(args));
    console.log(str);
    var key = wanbaConfig.appkey + '&';
    var sign = crypto.createHmac('sha1', key).update(str).digest().toString('base64');
    return sign;
  }

  wanba.getUserInfo = function(options,callback){
    var args = {
      openid:options.openid,
      openkey:options.openkey,
      appid:wanbaConfig.appid,
      pf: "wanba_ts",
      format:'json',
      userip:options.userip || '0.0.0.0'
    }

    var uri = '/' + wanba_api_version + '/user/get_info';
    args.sig = wanba.getSignStr('GET',uri,args);
    var queryurl = wanba_api_host + uri + '?' + querystring.stringify(args);
    console.log(queryurl);
    request.get(queryurl,function (error, response, body) {
      if (!error && response.statusCode == 200) {
        callback(null,JSON.parse(body)); // Show the HTML for the Google homepage.
      }else{
        callback(error);
      }
    })
  };

  wanba.getUserMutiInfo = function(){

  };

  wanba.getUserAppFriends = function(){

  };

  //好友游戏积分上报
  wanba.setUserAchievement = function(){

  }

  //拉取排行榜
  wanba.getUserGamebarRanklist = function(){

  }

  //使用积分兑换道具
  wanba.buyPlayzoneItem = function(){

  }

  //查询达人信息
  wanba.getPlayzoneUserinfo = function(){

  }

  //发送玩吧消息
  wanba.sendGamebarMsg = function(){

  }

  //玩吧支付接口
  //http://wiki.open.qq.com/wiki/v3/user/buy_playzone_item
  wanba.buyPlayzoneItem = function(){

  }

  return wanba;
}
