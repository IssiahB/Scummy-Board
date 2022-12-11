const {app, config} = require('./src/app');

const port = config.server.port;

const server = app.listen(port, () => {
    console.log('Server Started On Port ' + port);
});

module.exports = server;