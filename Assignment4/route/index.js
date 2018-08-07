const userRoutes = require('./server');

const userMethod = (app) => {
    app.use('/', userRoutes);
    
    app.use("*", (req, res) => {
        res.status(404).json({error: "Page not found"});
    });
}

module.exports = userMethod;