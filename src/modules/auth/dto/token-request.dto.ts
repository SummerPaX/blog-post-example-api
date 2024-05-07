import { ApiProperty, IntersectionType, OmitType } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';

import { GrantType } from './grant-type.enum';
import { PasswordGrantDto } from './password-grant.dto';
import { RefreshTokenGrantDto } from './refresh-token-grant.dto';

export class TokenRequestDto extends IntersectionType(
  OmitType(PasswordGrantDto, ['grant_type']),
  OmitType(RefreshTokenGrantDto, ['grant_type']),
) {
  @ApiProperty({ enum: GrantType })
  @IsEnum(GrantType)
  grant_type: GrantType;
}
