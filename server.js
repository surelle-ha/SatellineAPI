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
    console.log(`System: Server Restart`);
    console.log(`  ╚═>    - Pinging server`);
    console.log(`  ╚═>    - Server Restarted`)
    console.log(`System: Server Active\n\n`)
}).start();

app.use(express.json());

app.use(cors());

const basicAuth = (req, res, next) => {
    const tokens = [
        '1f295d5b4d779dab21713071b6eb4f2f', 
        '99321ea55fd51725baebd7f518f8f0b9', 
        '569708e27aa1d86bf8db6ff9d4d3deed',
        '6028633adb67b06a387f9932dd74f51e',
        'cab5628944d38e5313183aabeaf75f44',
        '591b8abe360ad1b735ae1044d13f66c7',
        'c2da6fd7b2b4ef18e4330aa0a11336f1',
        '196f65959b8877d48ab188294cf97cf7',
    ];
    if (tokens.includes(req.query.token)) {
        next();
    }else{
        res.status(400).json({
            transaction: 'failed', 
            error: 'Authentication Failed'
        });
    }
    
};

app.get('/', basicAuth, (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        transaction: 'success', 
        data: {
            Server: 'Active',
        },
    });
});

app.get('/ws/msg/send', basicAuth, (req, res) => {
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

app.get('/ws/server/status', basicAuth, (req, res) => {
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

app.get('/ws/client/count', basicAuth, (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const currentTime = new Date().toISOString().slice(11, 19);

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        transaction: 'success',
        date: currentDate,
        time: currentTime,
        connectedClients: wss.clients.size,
    });
});

app.get('/ws/client/info', basicAuth, (req, res) => {
    const currentDate = new Date().toISOString().slice(0, 10);
    const currentTime = new Date().toISOString().slice(11, 19);

    const clientInfo = Array.from(wss.clients).map((client) => ({
        id: client._socket.remoteAddress, 
        protocol: client.protocol,
        readyState: client.readyState,
        url: client.url,
    }));

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({
        transaction: 'success',
        date: currentDate,
        time: currentTime,
        connectedClients: wss.clients.size,
        clients: clientInfo,
    });
});

server.listen(port, () => {
    console.log(`Server Started: http://${require("ip").address()}:${port}/`);
});
