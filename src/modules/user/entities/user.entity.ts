import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Column, Entity, OneToMany } from 'typeorm';

import { BlogPost } from '../../blog-post/entities/blog-post.entity';
import { AuthUtils } from '@lib/auth';
import { BaseEntity } from '@lib/database';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column()
  lastname: string;

  @ApiProperty({ format: 'email' })
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @ApiProperty({ format: 'password', writeOnly: true })
  @IsNotEmpty()
  @IsString()
  @Column({
    select: false,
    transformer: {
      from: (value: string): string => value,
      to: (value: string): string => AuthUtils.hash(value),
    },
  })
  password: string;

  @Column({ unique: true })
  something: string

  @OneToMany(() => BlogPost, (blogPost) => blogPost.user)
  blogPosts: BlogPost[];
}
