const app = require("express")();
const http = require("http").Server(app);
const io = require("socket.io")(http); 

const redisConnection = require("./redis-connection");
const nrpSender = require("./nrp-sender-shim");

const imageFeed = io.of("/pixabayImageFeed");

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

imageFeed.on("connection",socket => {
    socket.on("postImage", async postRequest => { 
        let response = await nrpSender.sendMessage({
          redis: redisConnection,
          eventName: "search-images",
          data: {
            username: postRequest.username,
            message: postRequest.message,
            searchQuery: postRequest.query
           }
        });
        imageFeed.emit("imageFeed", response);
    });
});

http.listen(3000, () => {
    console.log("Server Started");
    console.log("Starting listening on http://localhost:3000/");
});
  