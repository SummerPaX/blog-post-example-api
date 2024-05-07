import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { BlogPostDetailResponseDto } from './dto/blog-post-detail-response.dto';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost } from './entities/blog-post.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class BlogPostService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}

  async create(userId: number, body: CreateBlogPostDto): Promise<BlogPost> {
    const user = await this.userService.getUserReference(userId);
    const blogPost = this.blogPostRepository.create({ ...body, user });

    return this.blogPostRepository.save(blogPost);
  }

  findAll(): Promise<BlogPost[]> {
    return this.blogPostRepository.find();
  }

  findOne(id: number): Promise<BlogPostDetailResponseDto> {
    return this.blogPostRepository.findOneOrFail({
      where: { id },
      relations: { user: true },
    });
  }

  async update(id: number, body: UpdateBlogPostDto): Promise<BlogPost> {
    const blogPost = await this.blogPostRepository.findOneByOrFail({ id });
    this.blogPostRepository.merge(blogPost, body);

    return this.blogPostRepository.save(blogPost);
  }

  async remove(id: number): Promise<void> {
    await this.blogPostRepository.delete({ id });
  }
}
