
import winston from 'winston';

// const fsPromise = fs.promises;

// async function log(logData) {
//     try {
//         logData = `\n\n${new Date().toString()} ${ logData}`;
//         // await fsPromise.writeFile('log.txt', logData); it will overwrite so change ot to appendFile,so that we can see all the log data
//         await fsPromise.appendFile('log.txt', logData);
//     } catch(err) {
//         console.log(err);
//     }
// }

const logger = winston.createLogger({
    level: 'info',
    format:winston.format.json(),
    defaultMeta: {service:'request-logging'},
    transports:[
        new winston.transports.File({filename:'logs.txt'})
    ]
});

const loggerMiddleware = async (
    req, 
    res, 
    next
) => { 
    // 1. Log request body.
    if (!req.url.includes('signin')){//do not peform when req is sign in, because it contains password
    const logData = `\n${"req URL:" + req.url}  \n${"reqBody:"+JSON.stringify(req.body)}` //converting to jason data
    logger.info(logData)
    }
    next();
};

export default loggerMiddleware;