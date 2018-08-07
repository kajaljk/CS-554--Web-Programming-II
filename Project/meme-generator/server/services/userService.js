const config = require('config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../Database/db');
const User = db.User;

module.exports = {
    authenticate,
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

async function authenticate({ email, password }) { 

    const user = await User.findOne({ email });
    if(user){
        if (bcrypt.compareSync(password, user.password)) {
            const { password, ...userWithoutPassword } = user.toObject();
            const token = jwt.sign({ sub: user.id }, config.secret);
            return ({
                token: token,
                message: "User login successfully."
            });
        }
        else{
            return({message : 'Password is not valid.'});
        }
    }
    else{
        return({message :  'User with email "' + email + '" doesn\'t exist '});
    }
}

async function getAll() {
    return await User.findOne().select('-password');
}

async function getById(id) {
    return await User.findById(id).select('-password');
}

async function create(userParam) {
    // validate
    if (await User.findOne({ email: userParam.email })) {
        return({message :  'Email "' + userParam.email + '" is already taken',isSuccess: false});
    }

    const user = new User(userParam); 

    // hash password
    if (userParam.password) {
        user.password = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

    return ({ message : "User created successfully.",isSuccess: true});
}

async function update(id, userParam) {
    const user = await User.findById(id);

    // validate
    if (!user) throw 'User not found';
    if (user.email !== userParam.email && await User.find({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    // hash password if it was entered
    if (userParam.password) {
        userParam.password = bcrypt.hashSync(userParam.password, 10);
    }

    // copy userParam properties to user
    Object.assign(user, userParam);

    await user.save();
}

async function _delete(id) {
    await User.findByIdAndRemove(id);
}