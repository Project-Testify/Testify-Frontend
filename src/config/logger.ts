// logger.ts
import winston from 'winston';

// Create a logger instance
const logger = winston.createLogger({
    level: 'info', // Set the default log level
    format: winston.format.combine(
        winston.format.timestamp(), // Add timestamps to logs
        winston.format.printf((info: winston.Logform.TransformableInfo) => {
            const { level, message, timestamp } = info;
            return `${timestamp} [${level}]: ${message}`;
        }) // Customize log format
    ),
    transports: [
        new winston.transports.Console({ 
            format: winston.format.combine(
                winston.format.colorize(), // Add colors to the console output
                winston.format.simple()
            )
        }),
        new winston.transports.File({ filename: 'combined.log' }) // Log to a file
    ],
});

export default logger;
