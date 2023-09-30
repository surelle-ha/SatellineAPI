

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
	  <img src="https://komarev.com/ghpvc/?username=surelle-ha&style=flat-square&color=blue" alt=""/>
	  <h3>Hey there! Welcome to Satelline API.</h3>
	  <p>You may also visit my <i><a href="https://www.linkedin.com/in/surellejs/">LinkedIn Profile</a></i> to learn more about the developer</p>
  <img src="https://visme.co/blog/wp-content/uploads/2020/02/header-1200.gif" width="600" height="300"/><br><br>
</div>

## Overview
This project involves the creation of a real-time WebSocket message broadcasting server using Node.js, Express.js, and the WebSocket library. The server allows clients to connect via WebSocket to send and receive messages in real-time. It also includes a RESTful API for checking the server's status and sending messages.

## Features
1. **WebSocket Integration:** The server establishes a WebSocket connection to enable real-time communication between clients and the server. Clients can send messages to the server, and the server broadcasts these messages to all connected clients.

2. **Cron-Based Server Restart:** The server employs a cron job that runs every 10 minutes to log a message indicating a server restart. This ensures server stability and uptime.

3. **RESTful API:** The server provides a set of RESTful API endpoints for external interactions:
   - `GET /`: Returns a JSON response indicating the server's status as "Active."
   - `GET /msg/send`: Accepts query parameters for sending messages to connected clients via WebSocket. It returns a JSON response indicating the success or failure of the message transmission.
   - `GET /msg/status`: Returns a JSON response with the server's status as "active."

## Code Highlights
- The server is built using Express.js and runs on port 1430.
- WebSocket connections are handled using the WebSocket library.
- The `broadcast` function is responsible for sending messages to all connected WebSocket clients.
- A cron job is set to restart the server every 10 minutes, logging a message each time it runs.
- CORS middleware is used to enable cross-origin requests.

## Usage
- Clients can connect to the WebSocket server at `ws://your_server_url:1430/socket`.
- To send a message, clients can make a GET request to `/msg/send` with the `message` query parameter.
- The server's status can be checked by making a GET request to `/msg/status`.

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
    
 ## Sample Usage - Sender
 Send message using PHP

    $APIReturn = file_get_contents(env('NOTIF_API_URL') . '?' . 
	    http_build_query(
	        array(
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
	    
 ## Quick Deploy
 Create an account on Render and setup environment variable before you click the button below. 
 
 [![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/surelle-ha/SatellineAPI.git)

## Developer

 - Surelle-ha -- [Twitter](https://twitter.com/escolidista1)
 
 _I'm currently looking for contributors to help improve projects. Contact me on [Twitter](https://twitter.com/escolidista1), if you're interested._
