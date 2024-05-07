import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { BlogPostService } from './blog-post.service';
import { BlogPostDetailResponseDto } from './dto/blog-post-detail-response.dto';
import { CreateBlogPostDto } from './dto/create-blog-post.dto';
import { UpdateBlogPostDto } from './dto/update-blog-post.dto';
import { BlogPost } from './entities/blog-post.entity';
import { TokenUser } from '@lib/auth';

@ApiTags('BlogPost')
@ApiBearerAuth()
@ApiUnauthorizedResponse()
@Controller('blog-posts')
export class BlogPostController {
  constructor(private readonly blogPostService: BlogPostService) {}

  @ApiOperation({ summary: 'Create a new blog post' })
  @ApiCreatedResponse({ type: () => BlogPost })
  @Post()
  create(
    @TokenUser('id') userId: number,
    @Body() createBlogPostDto: CreateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostService.create(userId, createBlogPostDto);
  }

  @ApiOperation({ summary: 'List blog posts' })
  @ApiOkResponse({ type: () => BlogPost, isArray: true })
  @Get()
  findAll(): Promise<BlogPost[]> {
    return this.blogPostService.findAll();
  }

  @ApiOperation({ summary: 'Get one blog posts' })
  @ApiOkResponse({ type: () => BlogPostDetailResponseDto })
  @ApiNotFoundResponse({ description: 'Blog-Post not found' })
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<BlogPostDetailResponseDto> {
    return this.blogPostService.findOne(id);
  }

  @ApiOperation({ summary: 'Update blog posts' })
  @ApiOkResponse({ type: () => BlogPost })
  @ApiNotFoundResponse({ description: 'Blog-Post not found' })
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    return this.blogPostService.update(id, updateBlogPostDto);
  }

  @ApiOperation({ summary: 'Delete blog posts' })
  @ApiNoContentResponse({ description: 'Blog-Post deleted' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.blogPostService.remove(id);
  }
}
