var bcrypt = require('bcryptjs');
var mongo = require('mongodb');
var mongoose = require('mongoose');
var mongoUri = 'mongodb://njs-auth-app-user:njs-auth-app-user@ds017678.mlab.com:17678/njs-auth-app-db';

var MONGO = {
    username: "njs-auth-app-user",
    password: "njs-auth-app-user",
    server: 'ds017678.mlab.com',
    port: '17678',
    db: 'njs-auth-app-db',
    connectionString: function () {
        return 'mongodb://' + this.username + ':' + this.password + '@' + this.server + ':' + this.port + '/' + this.db;
    },
    options: {
        server: {
            auto_reconnect: true,
            socketOptions: {
                connectTimeoutMS: 30 * 1000,
                keepAlive: 350 * 1000
            }
        }
    }
};

console.log('Connecting to mongodb...');
var db = mongoose.createConnection(MONGO.connectionString(), MONGO.options);

db.on('error', function (err) {
    console.log("DB connection error: " + err);
});
db.on('open', function () {
    console.log("DB connected");
});
db.on('close', function (str) {
    console.log("DB disconnected: " + str);
});

// our schema
var userSchema = new mongoose.Schema({
    fullname: String,
    email: String,
    username: {
        type: String,
        index: true
    },
    password: {
        type: String,
        bcrypt: true
    },
    profileimage: String
});

var User = module.exports = db.model('User', userSchema);

User.create = function (newUser, callback) {
    var hash = bcrypt.hashSync(newUser.password, 8);
    newUser.password = hash;
    newUser.save(callback);
};

User.getByUserName = function (username, callback) {
    var query = {
        username: username
    };
    User.findOne(query, callback);
}

User.getByUserId = function (id, callback) {
    User.findById(id, callback);
}

User.comparePassword = function (enteredPassword, hash, callback) {
    bcrypt.compare(enteredPassword, hash, function (err, isMatch) {
        if (err) return callback(err);
        callback(null, isMatch);
    });
}

User.getAll = function (callback) {
    User.find({}, callback);
};