const express = require('express');
const router = express.Router();
const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../Database/db');
const User = db.User;
const userService = require('../services/userService');

// routes
router.post('/authenticate', async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({ email });
    let message='';
    let token='';
    if(user){
        if (bcrypt.compareSync(password, user.password)) {
            const { password, ...userWithoutPassword } = user.toObject();
            token = jwt.sign({ sub: user.id }, config.secret);
        }
        else{
            message = 'Password is not valid.';
        }
    }
    else{
        message = 'User with email "' + email + '" doesn\'t exist ';
    }
    res.json({token:token, message: message});
});
router.post('/register',   async(req, res) => {
    
});
router.get('/',   async(req, res) => {
    
});
router.get('/:id', async(req, res) => {
    
});
router.get('/current', async(req, res) => {
    
});
router.put('/:id', async(req, res) => {
    
});
router.delete('/:id', async(req, res) => {
    
});

module.exports = router;

