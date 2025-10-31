import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dtos/user.dto';
import { hashPassword } from 'src/common/utils/password.util';


@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}

  async create(dto: CreateUserDto) {
    const hashed = await hashPassword(dto.password);
    const user = this.repo.create({ ...dto, password: hashed });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find({ relations: ['posts'] });
  }

  findByEmail(email: string) {
    return this.repo.findOne({ where: { email } });
  }
}
