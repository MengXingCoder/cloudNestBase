import * as crypto from 'crypto';
(global as any).crypto = crypto;
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
    const logger = new Logger()
    const app = await NestFactory.create(AppModule, {
        // logger: false,//关闭了整个nestjs的日志,默认情况是开启的
        // logger: ['error', 'warn']
    })
    // console.log('Max memory:', v8.getHeapStatistics().heap_size_limit / 1024 / 1024, 'MB');
    await app.listen(3000, '0.0.0.0');
    logger.log('logger level is log')
    logger.warn('logger level is warn')
    logger.error('logger level is error')
}
bootstrap();
