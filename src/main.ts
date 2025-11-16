console.log('Node version:', process.version);
console.log('Object.hasOwn exists:', typeof Object.hasOwn === 'function');
import * as crypto from 'crypto';
(global as any).crypto = crypto;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { createLogger } from 'winston';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston'
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import 'winston-daily-rotate-file'
async function bootstrap() {
    // const logger = new Logger()
    const instance = createLogger({
        // options of Winston
        transports: [
            new winston.transports.Console({
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.ms(),
                    nestWinstonModuleUtilities.format.nestLike('MyApp', {
                        colors: true,
                        prettyPrint: true,
                        processId: true,
                        appName: true,
                    }),
                ),
            }),
            new winston.transports.DailyRotateFile({
                level: 'info',
                dirname: 'logs',
                filename: 'application-%DATE%.log',
                datePattern: 'YYYY-MM-DD-HH',
                zippedArchive: true, //文件压缩
                maxSize: '20m',
                maxFiles: '14d'
            })
            // other transports...
        ],
    });
    const app = await NestFactory.create(AppModule, {
        logger: WinstonModule.createLogger({
            instance,
        }),
        // logger: false,//关闭了整个nestjs的日志,默认情况是开启的
        // logger: ['error', 'warn']
    })
    // console.log('Max memory:', v8.getHeapStatistics().heap_size_limit / 1024 / 1024, 'MB');
    await app.listen(3000, '0.0.0.0');
    // logger.log('logger level is log')
    // logger.warn('logger level is warn')
    // logger.error('logger level is error')
}
bootstrap();
