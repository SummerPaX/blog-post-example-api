import { ApiProperty } from '@nestjs/swagger';

import { BlogPost } from '../../blog-post/entities/blog-post.entity';
import { User } from '../entities/user.entity';

export class UserDetailResponseDto extends User {
  @ApiProperty({ type: () => BlogPost, isArray: true })
  blogPosts: BlogPost[];
}
