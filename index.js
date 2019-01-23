let app = require('express')();
let server = require('http').createServer(app);

const port = process.env.PORT || 8000;

app.get('/', function(req, res) {
    res.send('OK');
});

server.listen(port, function() {
    console.log('Server is running at port', port);
})