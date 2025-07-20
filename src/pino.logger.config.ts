import { Response } from 'express';
import { Params } from 'nestjs-pino';

export const pinoLoggerConfig: Params = {
  pinoHttp: {
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',

    autoLogging: {
      ignore: (req) => req.url === '/favicon.ico',
    },

    serializers: {
      req: (req) => ({ method: req.method, url: req.url }),
      res: (res: Response) => ({
        statusCode: res.statusCode,
      }),
      err: (err) => ({ message: err.message, stack: err.stack }),
    },

    customLogLevel: (res, err) => {
      if (err || res.statusCode >= 400) return 'error';
      return 'info';
    },
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
          options: {
            translateTime: 'SYS:standard',
            colorize: true,
            ignore: 'pid,hostname,req.headers,res.headers',
            messageFormat: '[{time}][{res.statusCode}][{res.error}] {msg}',
          },
        },
        {
          target: 'pino-pretty',
          level: 'warn',
          options: {
            translateTime: 'SYS:standard',
            colorize: false,
            destination: 'app.log',
            append: true,
            ignore: 'pid,hostname,req.headers,res.headers',

            messageFormat: '[{time}][{res.statusCode}][{err.message}] {msg}',
          },
        },
      ],
    },
  },
};
