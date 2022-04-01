import React from 'react';

function Socket({name}) {
    return (
        <div id="chat-container">
            <h3>You can send message to {name}</h3>
            <div id="message-container"></div>
            <form id="send-container">
                <input type="text" id="message-input" />
                <button type="submit" id="sendBtn">Send Message</button>
            </form>
        </div>
    )
}

export default Socket;