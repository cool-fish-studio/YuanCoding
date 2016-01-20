module.exports = {
    appName: 'YuanCoding',
    SITENAME: '猿Coding',
    LOG4JS: {
        appenders: [
            {type: 'console'}
        ]
    },
    NODEENV: 'testing',
    EXPRESS: {
        PORT: process.env.port || '****',
    },
    HOST: '*******',
    MONGO: {
        URL: 'mongodb://127.0.0.1:27017/***',
    },
    MD5_SUFFIX : 'Encryption',
    PASSPORT: {
        GITHUB: {
            CLIENTID: 'f6fbdf06449f******',
            CLIENTSECRET: 'a873e58f400e7a1b162f76c*****'
        }
    }
};
