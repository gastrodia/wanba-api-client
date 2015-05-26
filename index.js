module.exports = require('./lib/wanba');

if (require.main === module) {
    var config = require('./config');
    var wanba = require('./lib/wanba')(config);

    var openid = '70FA5AF447354687FA1E640366F9C3FC';
    var openkey = 'B5DB07550F7E5B0025958FEC24E90CB9';
    var userip = '114.241.27.200';

    //获取用户信息
    wanba.getUserInfo({
      openid:openid,
      openkey:openkey,
      userip:userip
    },function(error,body){
      console.log(error,body);
    });

    // //玩吧支付
    // wanba.buyPlayzoneItem({
    //   openid:openid,
    //   openkey:openkey,
    //   itemid:2480
    // },function(error,body){
    //   console.log(error,body);
    // });
    //
    // //获取已安装了应用的好友列表
    // wanba.getUserAppFriends({
    //   openid:openid,
    //   openkey:openkey,
    //   userip:userip
    // },function(error,body){
    //   console.log(error,body);
    //   //批量获得好友基本信息
    //   var fopenids = [];
    //   for(var i in body.items){
    //     fopenids.push(body.items[i].openid);
    //   }
    //   wanba.getUserMutiInfo({
    //     openid:openid,
    //     openkey:openkey,
    //     userip:userip,
    //     fopenids:fopenids
    //   },function(error,body){
    //     console.log(error,body);
    //   });
    // });
    //
    // //上传用户等级信息
    // wanba.setUserAchievement({
    //   openid:openid,
    //   openkey:openkey,
    //   userip:userip,
    //   user_attr:{
    //     "level":1,//用户等级
    //     "area_name":"server_01"//多区多服应用需要输入该参数，非多区多服应用不需要传
    //   }
    // },function(error,body){
    //   console.log(error,body);
    // });
    //
    //
    // //拉取游戏的排行榜列表
    // wanba.getUserGamebarRanklist({
    //   openid:openid,
    //   openkey:openkey,
    //   userip:userip,
    //   rankdim:'level',//拉取纬度，需与排行榜配置信息表中一致
    //   rank_start:0,//拉取排行的起始位置（默认0）
    //   pull_cnt:0,//拉取排行的个数（最小为3，最大为50，默认3）
    //   direction:0//拉取排行的方向（-1往前拉取，0向后拉取，默认0）
    // },function(error,body){
    //   console.log(error,body);
    // });
    //
    //
    // //查询游戏用户信息和达人包月信息
    // wanba.getUserInfo({
    //   openid:openid,
    //   openkey:openkey,
    //   userip:userip,
    //   zoneid:1//区ID，用于区分用户是在哪一款平台下(Android、IOS等)
    // },function(error,body){
    //   console.log(error,body);
    // });
    //
    // //向好友发送玩吧消息
    // wanba.sendGamebarMsg({
    //   openid:openid,
    //   openkey:openkey,
    //   userip:userip,
    //   zoneid:1,//区ID，用于区分用户是在哪一款平台下(Android、IOS等)
    //   frd:'DBCBF05FC24CFE1096D1A7D7B5E210DD',//好友openid
    //   msgtype:1,//消息类型，1-pk消息，2-送心消息，3-超越消息
    //   content:"10秒",//超越消息的积分文字，形如“10秒”，“100分”之类
    //   qua:'V1_AND_QZ_4.9.3_148_RDM_T'//手机空间版本标识，例如：V1_AND_QZ_4.9.3_148_RDM_T
    // },function(error,body){
    //   console.log(error,body);
    // });
}
