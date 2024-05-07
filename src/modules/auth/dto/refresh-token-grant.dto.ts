import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsString, ValidateIf } from 'class-validator';

import { GrantType } from './grant-type.enum';

export class RefreshTokenGrantDto {
  @ApiProperty({ example: GrantType.refresh_token })
  @IsIn([GrantType.refresh_token])
  @IsString()
  grant_type: GrantType.refresh_token;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @ValidateIf((obj) => obj.grant_type === 'refresh_token')
  refresh_token: string;
}
