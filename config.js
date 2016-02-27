var configs = {
    "dev": {
        dbHost: "127.0.0.1",
        dbPort: 27017,
        dbName: "njs-auth-app-db",
        dbUser: "njs-auth-app-user",
        dbPassword: "njs-auth-app-user"
    },
    "heroku": {
        dbHost: "ds017678.mlab.com",
        dbPort: "17678",
        dbName: "njs-auth-app-db",
        dbUser: "njs-auth-app-user",
        dbPassword: "njs-auth-app-user"
    }
}

// change this heroku deployment
var currentEnv = "dev";

module.exports.configs = function() {
    return configs.currentEnv;
}