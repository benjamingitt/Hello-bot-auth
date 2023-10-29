import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdate } from './user.update';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [UserService, UserUpdate],
})
export class UserModule {}
