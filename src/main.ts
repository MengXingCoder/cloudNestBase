import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // console.log('Max memory:', v8.getHeapStatistics().heap_size_limit / 1024 / 1024, 'MB');
    await app.listen(3000, '0.0.0.0');
}
bootstrap();
