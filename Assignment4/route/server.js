const express = require("express");
const bluebird = require("bluebird");
const redis = require("redis");
const app = express();
const data = require("../data/index");

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

app.get("/api/people/history", async (req, res) => {
    res.json(data.history.slice(0,20));
});

app.get("/api/people/:id", async (req, res) => {
    try{
        let result = await data.getById(req.params.id); 
        res.json(result);   
    }
    catch(error){
        console.log(error);
        res.json(error.message); 
    }
});

module.exports = app;