import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  getSchemaPath,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { PasswordGrantDto } from './dto/password-grant.dto';
import { RefreshTokenGrantDto } from './dto/refresh-token-grant.dto';
import { TokenRequestDto } from './dto/token-request.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { IsPublic } from '@lib/auth';

@ApiTags('Auth')
@ApiExtraModels(PasswordGrantDto, RefreshTokenGrantDto)
@IsPublic()
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Get an access-token' })
  @ApiBody({
    schema: {
      oneOf: [
        { $ref: getSchemaPath(PasswordGrantDto) },
        { $ref: getSchemaPath(RefreshTokenGrantDto) },
      ],
    },
  })
  @ApiOkResponse({ type: () => TokenResponseDto })
  @ApiUnauthorizedResponse()
  @Post('token')
  token(@Body() body: TokenRequestDto): Promise<TokenResponseDto> {
    return this.authService.token(body);
  }
}
