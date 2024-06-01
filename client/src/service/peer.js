class peerService {
    constructor() {
        if (!this.peer) {
            this.peer = new RTCPeerConnection({
                iceServers: [{
                    urls: [
                        "stun4.l.google.com:19302",
                        "stun.rapidnet.de:3478"
                    ]
                }]
            })
        }
    }


    getOffer() {

    }
}