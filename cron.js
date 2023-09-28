const cron = require('cron');
const https = require('https');

const backendUrl = 'https://127.0.0.1';
const job = new cron.CronJob('*/14 * * * *', function() {
    console.log(`Restarting server`);
});

https.get(backendUrl, (res) => {
    if (resizeTo.statusCode === 200) {
        console.log('Server restarted');
    } else {
        console.error(`Failed to restart server with status code: ${res.statusCode}`);
    }
}).on('error', (err) => {
    console.error(`Error during Restart`, err.message);
});

module.exports = {
    job,
};