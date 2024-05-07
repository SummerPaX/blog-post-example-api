import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from './entities/user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: () => [],
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  test('should be defined', () => {
    expect(service).toBeDefined();
  });

  test('should return array', async () => {
    expect(await service.findAll()).toBeInstanceOf(Array);
  });
});
