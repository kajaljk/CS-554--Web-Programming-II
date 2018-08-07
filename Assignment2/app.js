const express = require("express")
const app = express()

app.use(express.static('public'));

app.get('/', function(req,res){
    res.sendFile(path.join(__dirname + '/public/index.html'))
})

app.get('*', (req, res) => {
    res.sendStatus(404);
});

app.listen(3000, ()=>{
    console.log("your routes will be running on http://localhost:3000")
});
