import winston from 'winston';

function loggerProd() {
    const loggerProd = winston.createLogger({
        transports: [
            new winston.transports.Console({ level: 'info' }),
            new winston.transports.Console({ level: 'warn' }),
            new winston.transports.Console({ level: 'error' }),
            new winston.transports.File({ filename: 'warn.log', level: 'warn' }),
            new winston.transports.File({ filename: 'error.log', level: 'error' })
        ]
    });

    return loggerProd;
}

let logger = loggerProd();

export default logger;