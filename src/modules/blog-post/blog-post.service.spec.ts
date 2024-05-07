import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BlogPostService } from './blog-post.service';
import { BlogPost } from './entities/blog-post.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

describe('BlogPostService', () => {
  let service: BlogPostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BlogPostService,
        UserService,
        {
          provide: getRepositoryToken(BlogPost),
          useValue: {
            find: () => [],
            findOne: () => {},
          },
        },
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: () => [],
            findOne: () => {},
          },
        },
      ],
    }).compile();

    service = module.get<BlogPostService>(BlogPostService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
