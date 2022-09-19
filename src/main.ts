import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { sequelize } from '../models'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000 , async () => {
    console.log('Server OK! Listening on port 5000 :)');
    await sequelize.authenticate();
    console.log('Database connected!');
  });
}
bootstrap();
