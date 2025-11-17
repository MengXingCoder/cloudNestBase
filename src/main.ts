import * as crypto from 'crypto';
(global as any).crypto = crypto;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { createLogger } from 'winston';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import 'winston-daily-rotate-file';
import { HttpExceptionFilter } from './filters/http-exception.filter';
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
        maxFiles: '14d',
      }),
      // other transports...
    ],
  });
  const logger = WinstonModule.createLogger({
    instance,
  });
  const app = await NestFactory.create(AppModule, {});
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  await app.listen(3000, '0.0.0.0');
  // logger.log('logger level is log')
  // logger.warn('logger level is warn')
  // logger.error('logger level is error')
}
bootstrap();
