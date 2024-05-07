import { ApiProperty } from '@nestjs/swagger';

import { User } from '../../user/entities/user.entity';
import { BlogPost } from '../entities/blog-post.entity';

export class BlogPostDetailResponseDto extends BlogPost {
  @ApiProperty({ type: () => User })
  user: User;
}
