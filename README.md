> Outdated. Maintainer moved this repository to a private organization!

<div align="center">
	<h1>Satelline API</h1>
</div>
<div id="badges" align="center">
    <a href="https://www.linkedin.com/in/harold-eustaquio-b13190237/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
    </a>
    <a href="#">
     <img src="https://img.shields.io/badge/Facebook-blue?style=for-the-badge&logo=facebook&logoColor=white" alt="Facebook Badge"/>
    </a>
    <a href="https://twitter.com/escolidista1">
     <img src="https://img.shields.io/badge/Twitter-blue?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter Badge"/>
    </a>
    <br>
    <a href="https://coindrop.to/surelle">
     <img src="https://img.shields.io/badge/Coindrop-orange?style=for-the-badge&logo=coins&logoColor=white" alt="Coindrop Badge"/>
    </a>
    <a href="https://paypal.me/surelleha">
     <img src="https://img.shields.io/badge/PayPal-orange?style=for-the-badge&logo=paypal&logoColor=white" alt="PayPal Badge"/>
    </a>
    <a href="https://ko-fi.com/surelle">
     <img src="https://img.shields.io/badge/KoFi-orange?style=for-the-badge&logo=ko-fi&logoColor=white" alt="Ko-Fi Badge"/>
    </a>
  </div>
  <div align="center">
	  <h3>Hey there! Welcome to Satelline API.</h3>
	  <p>You may also visit my <i><a href="https://www.linkedin.com/in/surellejs/">LinkedIn Profile</a></i> to learn more about the developer</p>
  <img src="https://visme.co/blog/wp-content/uploads/2020/02/header-1200.gif" width="600" height="300"/><br><br>
</div>

<div align="center">

![node](https://img.shields.io/badge/node_js-black?style=for-the-badge&logo=javascript)
![express](https://img.shields.io/badge/express_js-black?style=for-the-badge&logo=express)
![websocket](https://img.shields.io/badge/websocket-black?style=for-the-badge&logo=ws)

</div>
	
## Overview
This project involves the creation of a real-time WebSocket message broadcasting server using Node.js, Express.js, and the WebSocket library. The server allows clients to connect via WebSocket to send and receive messages in real-time. It also includes a RESTful API for checking the server's status and sending messages.

## Features
1. **WebSocket Integration:** The server establishes a WebSocket connection to enable real-time communication between clients and the server. Clients can send messages to the server, and the server broadcasts these messages to all connected clients.

2. **Cron-Based Server Restart:** The server employs a cron job that runs every 10 minutes to log a message indicating a server restart. This ensures server stability and uptime.

3. **RESTful API:** The server provides a set of RESTful API endpoints for external interactions:
   - `GET /`: Returns a JSON response indicating the server's status as "Active."
   - `GET /ws/msg/send`: Accepts query parameters for sending messages to connected clients via WebSocket. It returns a JSON response indicating the success or failure of the message transmission.
   - `GET /ws/server/status`: Returns a JSON response with the server's status as "active."
   - `GET /ws/client/count`: Returns a JSON response with the number of clients connected to the websocket.
   - `GET /ws/client/info`: Returns a JSON response with the number of clients connected and their information like IP Address, ReadyState and Protocol.

## Code Highlights
- The server is built using Express.js and runs on port 1430.
- WebSocket connections are handled using the WebSocket library.
- The `broadcast` function is responsible for sending messages to all connected WebSocket clients.
- A cron job is set to restart the server every 10 minutes, logging a message each time it runs.
- CORS middleware is used to enable cross-origin requests.

## Usage
- Clients can connect to the WebSocket server at `ws://your_server_url:1430/socket`.
- To send a message, clients can make a GET request to `/ws/msg/send` with the `message` and `token` query parameter.
- The server's status can be checked by making a GET request to `/ws/server/status`.

## Project Goals
- Create a robust and real-time messaging server.
- Provide a RESTful API for server status and message broadcasting.
- Ensure server stability with periodic restarts.

This project is a foundation for building real-time communication applications, such as chat applications, notifications, or live updates, where WebSocket-based communication is crucial for delivering messages in real-time.

## Installation
You can download by cloning the Git repository:

    git clone https://github.com/surelle-ha/SatellineAPI.git
   
Navigate to directory.

    cd SatellineAPI
 
Install required packages.

    npm install

 ## Usage - Start
Run using recommended launch script

    node server.js

 ## Token List
 Since this is standalone API and doesn't have a database, there are static tokens that you can use to secure the connection. **This is temporary**.
 | Token |
 | ----- |
 | 1f295d5b4d779dab21713071b6eb4f2f |
 | 99321ea55fd51725baebd7f518f8f0b9 | 
 | 569708e27aa1d86bf8db6ff9d4d3deed |
 | 6028633adb67b06a387f9932dd74f51e |
 | cab5628944d38e5313183aabeaf75f44 |
 | 591b8abe360ad1b735ae1044d13f66c7 |
 | c2da6fd7b2b4ef18e4330aa0a11336f1 |
 | 196f65959b8877d48ab188294cf97cf7 |
 
 ## Sample Usage - Sender
 Send message using PHP

    $APIReturn = file_get_contents(env('NOTIF_API_URL') . '?' . 
	    http_build_query(
	        array(
	            'token' => env('TOKEN'),
	            'message' => json_encode(
	                array(
	                'title' => 'Update',
	                'body' => $updatedRows . ' records has been approved.',
	                'target_group' => 'user',
	                'target_specific' => $recordId,
	                'channel' => env('APP_ENV'),
	                'action' => 'none',
	                'date' => date('Y-m-d'),
	                'time' => date('H:i:s')
	                )
	            )
	        )
	    ));
    
 ## Sample Usage - Receiver
 Receive message via Javascript
 
	const messageContainer = document.getElementById('message-container');
	const webSocket = new WebSocket('wss://api-dq-sadtelite.onrender.com/socket'); 
	webSocket.onopen = () => { console.log('WebSocketToast-Identified') }; 
	webSocket.onclose = () => { console.log('WebSocketToast-Disconnected') }; 
	webSocket.onerror = (error) => { console.log(`WebSocketToast-Disconnected: ${error.message}`) };
	webSocket.onmessage = (event) => {
	    const message = event.data; 
	    let notif = JSON.parse(message) 

	    if(notif.channel == "{{env('APP_ENV')}}"){
	      if(notif.target_group == 'user'){
	        if(notif.target_specific == '{{Auth::user()->id}}'){
	          Render(notif)
	        }
	      }
	    }

	    function Render(notif){
	      /* --- RENDERER --- */
	      messageContainer.innerHTML += `
	      <div class="bs-toast toast fade show mb-4 bg-primary" role="alert" aria-live="assertive" aria-atomic="true">
	        <div class="toast-header">
	          <i class="bx bx-bell"></i>&nbsp;
	          <span class="fw-medium me-auto">${notif.title}</span>
	          <small>${notif.date} ${notif.time}</small>
	          <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
	        </div>
	        <div class="toast-body">
	          ${notif.body}
	        </div>
	      </div>`;
	      /* !-- RENDERER --- */
	    }
	};
	    
# Deployment 
## Tunnel Local via Ngrok (Optional)
Ngrok is a cross-platform tool that creates secure tunnels between your local development server and the internet, allowing you to expose locally hosted services to the web. It’s often used for testing and development purposes.

#### 1. Download Ngrok
[![Ngrok](https://img.shields.io/badge/Ngrok-purple?style=for-the-badge&logo=ngrok)](https://ngrok.com/download)

#### 2. Register and get your Auth token
#### 3. Run this script on your Ngrok directory.
	ngrok config add-authtoken <token>
#### 4. Start a tunnel
	ngrok http 1430

## Or Deploy via Render (Optional)
Create an account on Render and setup environment variable before you click the button below. 

 [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/surelle-ha/SatellineAPI.git)

## WebSocket Server Testing
To test your Satelline API, click the button below and paste your WS URL. It should be in `wss://ws-server-url/socket` format.

#### SatellineAPI Tester Page
[![Github Pages](https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white)](https://surelle-ha.github.io/SatellineAPI/)

## Developer

 - Surelle-ha -- [Twitter](https://twitter.com/escolidista1)
 
 _I'm currently looking for contributors to help improve projects. Contact me on [Twitter](https://twitter.com/escolidista1), if you're interested._
