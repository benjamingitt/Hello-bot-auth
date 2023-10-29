import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/common/entity/user.entity';
import { ContextMsg } from 'src/common/interfaces/context.interface';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  echo(text: string): string {
    return `Echo: ${text}`;
  }
  async addUser(ctx: ContextMsg | any) {
    const userById = await this.findById(ctx.message?.from?.id);
    console.log(ctx.message?.from?.id);
    if (userById) {
      return;
    }
    const user = new UserEntity();
    const createUser = {
      id: ctx.message?.from?.id,
      firstName: ctx.message?.from?.first_name,
      username: ctx.message?.from?.username,
      langCode: ctx.message?.from?.language_code,
    };
    Object.assign(user, createUser);
    return await this.userRepository.save(user);
  }
  async findById(id) {
    return await this.userRepository.findOne({
      where: { id },
    });
  }
  async findAllId() {
    return await this.userRepository.find({
      select: {
        id: true,
      },
    });
  }
}
