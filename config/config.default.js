module.exports = {
    appName: 'YuanCoding',
    SITENAME: '猿Coding',
    LOG4JS: {
        appenders: [
            {type: 'console'}
        ]
    },
    EXPRESS: {
        PORT: process.env.port || '****',
    },
    HOST: '*******',
    MONGO: {
        URL: 'mongodb://127.0.0.1:27017/***',
    },
    MD5_SUFFIX : 'Encryption'
};