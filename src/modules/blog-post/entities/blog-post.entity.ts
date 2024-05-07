import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, ManyToOne } from 'typeorm';

import { User } from '../../user/entities/user.entity';
import { BaseEntity } from '@lib/database';

@Entity({ name: 'blog_posts' })
export class BlogPost extends BaseEntity {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column()
  body: string;

  @ManyToOne(() => User, (user) => user.blogPosts, { onDelete: 'CASCADE' })
  user: User;
}
