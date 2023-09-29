const WebSocket = require("ws");
const cron = require('cron');
const http = require('http');
const express = require('express');
const cors = require('cors'); // Import the cors middleware

const app = express();
const port = 8100;

const server = http.createServer(app);

const wss = new WebSocket.Server({ server, path: '/socket' });

// Store authenticated clients
const authenticatedClients = new Set();

wss.on('connection', function connection(ws, req) {
    // Perform authentication here
    const authToken = req.headers.authorization; // You can use a custom header for authentication

    if (isValidToken(authToken)) {
        // Add the authenticated client to the set
        authenticatedClients.add(ws);

        ws.on('message', function (message) {
            wss.broadcast(message);
        });

        ws.on('close', function () {
            // Remove the client from the set when they disconnect
            authenticatedClients.delete(ws);
        });
    } else {
        // If authentication fails, close the connection
        ws.close();
    }
});

wss.broadcast = function broadcast(msg) {
    console.log(msg);
    authenticatedClients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(msg);
        }
    });
};

// Function to validate the token (you should implement your own logic here)
function isValidToken(token) {
    // Add your token validation logic here
    // For example, you can check the token against a list of valid tokens
    const validTokens = ['token1', 'token2', 'token3'];
    return validTokens.includes(token);
}

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
