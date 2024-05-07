import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { BlogPostController } from './blog-post.controller';
import { BlogPostService } from './blog-post.service';
import { BlogPost } from './entities/blog-post.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([BlogPost]), UserModule],
  controllers: [BlogPostController],
  providers: [BlogPostService],
})
export class BlogPostModule {}
