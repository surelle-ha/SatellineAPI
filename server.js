const WebSocket = require("ws");
const cron = require('cron');
const http = require('http');
const express = require('express');
const cors = require('cors');

const app = express();
const port = 1430;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server, path: '/socket' });

wss.on('connection', (ws) => {
    ws.on('message', (message) => {
        broadcast(message);
    });
});

function broadcast(msg) {
    console.log(msg);
    wss.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
}

const job = new cron.CronJob('*/10 * * * *', () => {
    console.log(`Restarting server`);
}).start();

app.use(express.json());

app.use(cors());

app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        transaction: 'success', 
        data: {
            Server: 'Active',
        },
    });
});

app.get('/msg/send', (req, res) => {
    const message = req.query.message;
    const currentDate = new Date().toISOString().slice(0, 10); 
    const currentTime = new Date().toISOString().slice(11, 19);

    if (message) {
        broadcast(message);

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json({
            transaction: 'success',
            date: currentDate,
            time: currentTime,
            message: message,
        });
    } else {

        res.setHeader('Content-Type', 'application/json');
        res.status(400).json({
            transaction: 'success', 
            date: currentDate,
            time: currentTime,
            message: 'Message parameter missing or not in JSON format.'
        });
    }
});

app.get('/msg/status', (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10); 
    const currentTime = new Date().toISOString().slice(11, 19);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        transaction: 'success',
        date: currentDate,
        time: currentTime,
        status: 'active',
    });
});

server.listen(port, () => {
    console.log(`Server Port: ${port}`);
});
