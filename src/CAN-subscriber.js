import { io } from 'socket.io-client'

// features to implement:
// - keep track of time between data updates
//   display this on screen for lag determination

// - rewrite all code so only specific elements are
//   updates when certain CAN messages are recieved

// - move websocket duties to individual components
//   rather than in App.js
//   a la https://github.com/VTBOLT/BOLT_V_Dash/tree/master

// - add a database stored on the pi to keep track of
//   odometer, SoC, expected range, average kW, etc

// - add heat sink to raspi, flip raspi mount location
//   upside down a la controls box to keep watertight
// - add "CAN OK" statuses to check which packets are coming in
// - add realtime kW consumption RO for motor & battery,
//   also show percentage efficiency
// - change shape of acrylic (head bend) to not reflect sunlight


class Socket {
    constructor(port) {
        this.socket = io(`http://localhost:${port}/`)

        // Retry connection upon disconnect
        this.socket.on('connect', () => {
            this.subscribeToCAN()
            console.log('connected')
        })
        this.socket.on('disconnect', () => {
            console.log('disconnected')
        })
    }

    subscribeToCAN() {
        this.socket.emit('subscribeToCAN')
    }

    getSocket() {
        return this.socket;
    }

    disconnect() {
        this.socket.disconnect();
    }
}

export default Socket