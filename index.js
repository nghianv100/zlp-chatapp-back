require('./db/Database');

const app = require('express')();
const server = require('http').createServer(app);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const io = require('socket.io')(server);

const registerRouter = require('./routes/Register');
const authRouter = require('./routes/Authenticate');
const getListRouter = require('./routes/GetList');
const getMessagesRouter = require('./routes/GetMessages');
const sendMessageRouter = require('./routes/SendMessage');
const sendGroupMessageRouter = require('./routes/SendGroupMessage');
const createGroupRouter = require('./routes/CreateGroup');

const Group = require('./db/Group');

const checkAuth = require('./middlewares/CheckAuth');

const port = process.env.PORT || 8000;

app.use(cookieParser());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', function (req, res) {
    res.send('OK');
});

app.use('/api/register', registerRouter);
app.use('/api/authenticate', authRouter);
app.use('/api/get-list', getListRouter);
app.use('/api/get-messages', getMessagesRouter);
app.use('/api/send-message', sendMessageRouter);
app.use('/api/send-group-message', sendGroupMessageRouter);
app.use('/api/create-group', createGroupRouter);

let wsStore = {};

io.on('connection', function (socket) {
    console.log('a user connected', socket.id);

    socket.on('disconnect', function () {
        console.log('user disconnected', socket.id);
    });

    socket.on('set-login', function(data) {
        console.log('set-login', data);
        wsStore[data.username] = socket;
    });

    socket.on('set-logout', function(data) {
        console.log('set-logout', data);
        delete wsStore[data.username];
    });

    socket.on('personal-message', function(data) {
        console.log('personal-message', data);
        if(wsStore[data.sender_u]) {
            wsStore[data.sender_u].emit('personal-message', data);
        }
        if(wsStore[data.receiver_u]) {
            wsStore[data.receiver_u].emit('personal-message', data);
        }
    });

    socket.on('group-message', function(data) {
        console.log('group-message', data);
        Group.find({id: data.group_id}).then(function(docs) {
            for(let i = 0; i < docs[0].members.length; i++) {
                if(wsStore[docs[0].members[i]]) {
                    wsStore[docs[0].members[i]].emit('group-message', data);
                }
            }
        });
    });

    socket.on('user-signup', function(data) {
        console.log('user-signup', data);
        io.emit('user-signup', data);
    });

    socket.on('create-group', function(data) {
        console.log('create-group', data);
        for(let i = 0; i < data.members.length; i++) {
            if(wsStore[data.members[i]]) {
                wsStore[data.members[i]].emit('create-group', data);
            }
        }
    });
});

server.listen(port, function () {
    console.log(`Server is running at port ${port} ...`);
})