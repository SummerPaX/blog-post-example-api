import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  ValidateIf,
} from 'class-validator';

import { GrantType } from './grant-type.enum';

export class PasswordGrantDto {
  @ApiProperty({ example: GrantType.password })
  @IsIn([GrantType.password])
  @IsString()
  grant_type: GrantType.password;

  @ApiProperty({ format: 'email' })
  @IsNotEmpty()
  @IsEmail()
  @ValidateIf((obj) => obj.grant_type === 'password')
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((obj) => obj.grant_type === 'password')
  password: string;
}
