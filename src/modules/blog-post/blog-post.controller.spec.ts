import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from './entities/blog-post.entity';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

describe('BlogPostController', () => {
  let controller: BlogPostController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BlogPostController],
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

    controller = module.get<BlogPostController>(BlogPostController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
