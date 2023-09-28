const WebSocket = require("ws");
const cron = require('cron');
const http = require('http');
const express = require('express');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 8100;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server, path: '/socket' });

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        wss.broadcast(message);
    });
});

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
};

const job = new cron.CronJob('*/10 * * * *', function () {
    console.log(`Restarting server`);
}).start();

app.use(express.json());

// Enable CORS for all routes
app.use(cors()); // This will allow all origins to access your server

app.get('/', (req, res) => {
    res.send('Express server is running');
});

app.get('/notif/send', (req, res) => {
    const message = req.query.message;
    if (message) {
        wss.broadcast(message);
        res.send('Message sent to WebSocket');
    } else {
        res.status(400).send('Message parameter missing');
    }
});

server.listen(port, () => {
    console.log(`Express server listening on port ${port}`);
});
