import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TelegrafModule } from 'nestjs-telegraf';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './common/entity/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5438,
      database: 'postgres',
      username: 'postgres',
      password: 'fa4sd#fas2452cvb',
      entities: [UserEntity],
      synchronize: true,
    }),
    TelegrafModule.forRoot({
      token: '6140130693:AAEA_DYo6T0HNfZjLlZUfuLtvReKUyA9eFY',
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
