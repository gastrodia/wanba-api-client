module.exports = require('./lib/wanba');

if (require.main === module) {
    var config = require('./config');
    var wanba = require('./lib/wanba')(config);
    wanba.getUserInfo({
      openid:'70FA5AF447354687FA1E640366F9C3FC',
      openkey:'8A8A5EA5FBA4FB9C744D71151527B1A7',
      userip:'114.241.27.200'
    },function(error,body){
      console.log(error,body);
    });
}
