const userRoutes = require('./people');

const userMethod = (app) => {
    app.use('/api/people', userRoutes);
    
    app.use("*", (req, res) => {
        res.status(404).json({error: "Page not found"});
    });
}

module.exports = userMethod;