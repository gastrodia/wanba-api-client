var bunyan = require('bunyan');
var log = bunyan.createLogger({
  name: 'wanba-api-proxy',
  streams: [
    {
      stream: process.stdout,
      level: 'info'
    },
    {
      level: 'info',
      path: './logs/info.log', // log ERROR and above to a file
      period: '1m',   // daily rotation
      count: 7  ,     // keep 3 back copies
      template: './logs/info.$time.log'
    },
    {
      level: 'warn',
      path: './logs/warn.log', // log ERROR and above to a file
      period: '1m',   // daily rotation
      count: 7  ,     // keep 3 back copies
      template: './logs/warn.$time.log'
    },
    {
      level: 'error',
      path: './logs/error.log', // log ERROR and above to a file
      period: '1m',   // daily rotation
      count: 7  ,     // keep 3 back copies
      template: './logs/error.$time.log'
    }
  ]
});

module.exports = log;
