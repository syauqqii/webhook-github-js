const Webhook = require('./webhook.js');

// const { GetIPAddress } = require('../helper/ip.helper');
// const host = GetIPAddress();

new Webhook('<secret>')
    .directory('/var/www/<directory>')
    .exec('git pull && pm2 restart <id>')
    .listen(3001);