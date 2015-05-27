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
      //if(obj[key]){
        newObj[key.toLowerCase()] = obj[key];
      //}
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

  wanba.getUserMutiInfo = function(options,callback){
    var args = {
      openid:options.openid,
      openkey:options.openkey,
      appid:wanbaConfig.appid,
      pf: "wanba_ts",
      format:'json',
      userip:options.userip || '0.0.0.0',
      fopenids:''
    }

    for(var i in options.fopenids){
      args.fopenids += '_' + options.fopenids[i];
    }
    args.fopenids.substr(1);

    var uri = '/' + wanba_api_version + '/user/get_multi_info';
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

  wanba.getUserAppFriends = function(options,callback){

    var args = {
      openid:options.openid,
      openkey:options.openkey,
      appid:wanbaConfig.appid,
      pf: "wanba_ts",
      format:'json',
      userip:options.userip || '0.0.0.0'
    }

    var uri = '/' + wanba_api_version + '/relation/get_app_friends';
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

  //好友游戏积分上报
  wanba.setUserAchievement = function(options,callback){
    var args = {
      openid:options.openid,
      openkey:options.openkey,
      appid:wanbaConfig.appid,
      pf: "wanba_ts",
      format:'json',
      userip:options.userip || '0.0.0.0'
    }
    /*JSON.stringify(options.user_attr)*/
    args.user_attr = JSON.stringify(options.user_attr);
    var uri = '/' + wanba_api_version + '/user/set_achievement';
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
  }

  //拉取排行榜
  wanba.getUserGamebarRanklist = function(options,callback){
    var args = {
      openid:options.openid,
      openkey:options.openkey,
      appid:wanbaConfig.appid,
      pf: "wanba_ts",
      format:'json',
      userip:options.userip || '0.0.0.0',
      rankdim:options.rankdim,
      rank_start:options.rank_start,
      pull_cnt:options.pull_cnt,
      direction:options.direction
    }

    var uri = '/' + wanba_api_version + '/user/get_gamebar_ranklist';
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
  }

  //查询游戏用户信息和达人包月信息
  wanba.getPlayzoneUserinfo = function(options,callback){
    var args = {
      openid:options.openid,
      openkey:options.openkey,
      appid:wanbaConfig.appid,
      pf: "wanba_ts",
      format:'json',
      zoneid:options.zoneid,
      userip:options.userip || '0.0.0.0'
    }

    var uri = '/' + wanba_api_version + '/user/get_playzone_userinfo';
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
  }

  //发送玩吧消息
  wanba.sendGamebarMsg = function(options,callback){
    var args = {
      openid:options.openid,
      openkey:options.openkey,
      appid:wanbaConfig.appid,
      pf: "wanba_ts",
      format:'json',
      zoneid:options.zoneid,
      frd:options.frd,//好友openid
      msgtype:options.msgtype,//消息类型，1-pk消息，2-送心消息，3-超越消息
      content:options.content,//超越消息的积分文字，形如“10秒”，“100分”之类
      qua:options.qua,//手机空间版本标识，例如：V1_AND_QZ_4.9.3_148_RDM_T
      userip:options.userip || '0.0.0.0'
    }

    var uri = '/' + wanba_api_version + '/user/send_gamebar_msg';
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
  }

  //玩吧支付接口,积分兑换道具
  //http://wiki.open.qq.com/wiki/v3/user/buy_playzone_item
  wanba.buyPlayzoneItem = function(options,callback){
    var args = {
      openid:options.openid,
      zoneid:options.zoneid || 1,
      openkey:options.openkey,
      appid:wanbaConfig.appid,
      itemid:options.itemid,
      count:options.count || 1,
      pf: "wanba_ts",
      format:'json',
      userip:options.userip || '0.0.0.0'
    }

    var uri = '/' + wanba_api_version + '/user/buy_playzone_item';
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
  }

  wanba.getUrlMethodMap = function(){
    return {
      'user_get_info':wanba.getUserInfo,
      'relation_get_app_friends':wanba.getUserAppFriends,
      'user_get_multi_info':wanba.getUserMutiInfo,
      'user_set_achievement':wanba.setUserAchievement,
      'user_get_gamebar_ranklist':wanba.getUserGamebarRanklist,
      'user_buy_playzone_item':wanba.getPlayzoneUserinfo,
      'user_get_playzone_userinfo':wanba.getPlayzoneUserinfo,
      'user_send_gamebar_msg':wanba.sendGamebarMsg
    }
  }

  wanba.getMethodByUrl = function(url){
      return this.getUrlMethodMap()[url];
  }

  return wanba;
}
