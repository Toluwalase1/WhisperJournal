


// const recorderController = async (req, res) => {
//     try {
//         const deepgramURl = 'wss://api.deepgram.com/v1/listen'
//         const deepgramToken = process.env.DEEPGRAM_API_KEY

//          const deepgramSocket = new WebSocket(deepgramURl,['token', deepgramToken])

//          //unique ID for each user
//          const connectionId = Date.now().toString()

//          sockets[connectionId] = deepgramSocket

//          res.json({ connectionId });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: 'Failed to create Deepgram connection' });
//     }

// }

// module.exports = recorderController