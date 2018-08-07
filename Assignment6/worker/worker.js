const redisConnection = require("./redis-connection");
const axios = require("axios");

let baseURL = "https://pixabay.com/api/?key=9628218-6bfc61ef77fa4a45e2114f12d&q=";

redisConnection.on("search-images:request:*", async (message, channel) => {
    let requestId = message.requestId;
    let eventName = message.eventName;
    let requestPost = message.data;
  
    let apiRequestURL = baseURL + encodeURIComponent(requestPost.searchQuery);
  
    let res = await axios.get(apiRequestURL);
  
    let responseResult = res.data;
    let previewImages = responseResult.hits.map(function(obj) {
      return obj.webformatURL;
    });
    let successEvent = `${eventName}:success:${requestId}`;
  
    redisConnection.emit(successEvent, {
      requestId: requestId,
      data: {
        result: previewImages,
        message: requestPost.message,
        username: requestPost.username
      },
      eventName: eventName
    });
});