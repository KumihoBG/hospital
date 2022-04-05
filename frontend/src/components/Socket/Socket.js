import React from 'react';

function Socket() {
    const name = sessionStorage.getItem('chatName');

    return (
        <div id="chat-container">
            <h5>You can send message to {name}</h5>
            <div id="message-container"></div>
            <form id="send-container">
                <input type="text" id="message-input" placeholder='Type your message here'/>
                <button type="submit" id="sendBtn">Send Message</button>
            </form>
        </div>
    )
}

export default Socket;