import React from 'react';
import Grid from '@mui/material/Grid';

function Socket() {
    return (
        <Grid id="chat-container">
            <div id="message-container"></div>
            <form id="send-container">
                <input type="text" id="message-input" />
                <button type="submit" id="sendBtn">Send Message</button>
            </form>
        </Grid>
    )
}

export default Socket;