var path = require("path");
var log4js = require("log4js");


const configure = {
    replaceConsole: true,
    appenders: {
        stdout: {//控制台输出
            type: 'stdout'
        },
        req: {//请求日志
            type: 'dateFile',
            filename: 'logs/reqlog/',
            pattern: 'req-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        err: {//错误日志
            type: 'dateFile',
            filename: 'logs/errlog/',
            pattern: 'err-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        oth: {//其他日志
            type: 'dateFile',
            filename: 'logs/othlog/',
            pattern: 'oth-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        dberr: {
            type: 'dateFile',
            filename: 'logs/dberr/',
            pattern: 'dberr-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        },
        info: {
            type: 'dateFile',
            filename: 'logs/info/',
            pattern: 'info-yyyy-MM-dd.log',
            alwaysIncludePattern: true
        }

    },
    categories: {
        default: { appenders: ['stdout', 'req'], level: 'debug' },//appenders:采用的appender,取appenders项,level:设置级别
        err: { appenders: ['stdout', 'err'], level: 'error' },
        oth: { appenders: ['stdout', 'oth'], level: 'info' },
        dberr: { appenders: ['stdout', 'dberr'], level: 'info' },
        info: { appenders: ['stdout', 'info'], level: 'info' }
    }
}

/**
 * 日志配置
 */
export function setConfigure() {
    log4js.configure(configure);
    // log4js.configure(path.join(__dirname, "log4js.json"));
}

setConfigure();


/**
 * 获取Loger信息，调用该方法前必须确保已经configure过
 * @param {*} name name取categories项
 */
exports.getLogger = function (name) {//
    return log4js.getLogger(name || 'default')
}

/**
 * 用来与express结合,用于express中间件，调用该方法前必须确保已经configure过
 * @param {*} app 
 * @param {*} logger 
 */
exports.useLogger = function (app, logger) {
    app.use(log4js.connectLogger(logger || log4js.getLogger('default'), {
        format: '[:remote-addr :method :url :status :response-timems][:referrer HTTP/:http-version :user-agent]'//自定义输出格式
    }))
}