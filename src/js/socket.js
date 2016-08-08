import io from 'socket.io-client';

let uri = process.env.DEVELOPMENT ? `${location.protocol}//${location.hostname}:9000` : '';

export const socketClient = io(uri);

socketClient.on('we have connected', () => {

    // handle in redux
    console.log("We're connected!");
});

socketClient.on('quiz has begun', () => {

    // handle in redux
});
