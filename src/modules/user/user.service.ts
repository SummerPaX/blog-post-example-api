import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDetailResponseDto } from './dto/user-detail-response.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async create(body: CreateUserDto): Promise<User> {
    const email = await this.userRepository.count({
      where: { email: body.email },
    });

    if (email) {
      throw new BadRequestException('Email already taken');
    }

    const user = this.userRepository.create(body);

    return this.userRepository.save(user);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: number): Promise<UserDetailResponseDto> {
    return this.userRepository.findOneOrFail({
      where: { id },
      relations: { blogPosts: true },
    });
  }

  getUserReference(id: number): Promise<User> {
    return this.userRepository.findOneOrFail({
      where: { id },
    });
  }

  async update(id: number, body: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id });
    this.userRepository.merge(user, body);

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}
