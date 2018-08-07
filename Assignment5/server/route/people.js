const express = require("express"); 
const nrpSender = require("../nrp-sender-shim");
const { promisify } = require('util');
const router = express.Router();

router.get("/:id", async(req,res)=> { 
    try{
        let response= await nrpSender.sendMessage({
            eventName: "get-people-by-id",
            data:{
                id:req.params.id,
                messageBody:req.body
            }
        });
        //console.log("R:"+JSON.stringify(response));
        res.json(response);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: err || 'Internal Error'
        });
    }
});

router.post("/", async(req,res)=> {
    //console.log("DATA:"+ JSON.stringify(req.body));
    try{
        let response=await nrpSender.sendMessage({
            eventName: "post-people",
            data:{
                id:req.params.id,
                messageBody:req.body
            }
        });
        res.json(response)
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: err || 'Internal Error'
        });    
    }
});

router.put("/:id", async(req,res)=> {
    try{
        let response=await nrpSender.sendMessage({
            eventName: "put-people",
            data:{
                id:req.params.id,
                messageBody:req.body
            }
        });
        res.json(response);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: err || 'Internal Error'
        });    
    }
});

router.delete("/:id", async(req,res)=> {
    try{
        let response=await nrpSender.sendMessage({
            eventName: "delete-people-by-id",
            data:{
                id:req.params.id,
                messageBody:req.body
            }
        });
        res.json(response);
    }
    catch(err){
        console.error(err);
        res.status(500).json({
            error: err || 'Internal Error'
        });
    }
});

module.exports = router;