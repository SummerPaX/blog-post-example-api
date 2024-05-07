import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';

import { PasswordGrantDto } from './dto/password-grant.dto';
import { RefreshTokenGrantDto } from './dto/refresh-token-grant.dto';
import { TokenResponseDto } from './dto/token-response.dto';
import { User } from '../user/entities/user.entity';
import { AuthUtils } from '@lib/auth';
import { ConfigUtil } from '@lib/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  token(
    body: PasswordGrantDto | RefreshTokenGrantDto,
  ): Promise<TokenResponseDto> {
    return body.grant_type === 'password'
      ? this.tokenByPassword(body)
      : this.tokenByRefreshToken(body);
  }

  protected async tokenByPassword(
    body: PasswordGrantDto,
  ): Promise<TokenResponseDto> {
    const user = await this.userRepository.findOne({
      where: { email: body.username },
      select: ['id', 'password', 'lastname'],
    });

    if (!user) {
      this.throwInvalidGrant();
    }

    if (!AuthUtils.compare(user.password, body.password)) {
      this.throwInvalidGrant();
    }

    return {
      access_token: await this.generateAccessToken(user),
      refresh_token: await this.generateRefreshToken(user),
    };
  }

  protected async tokenByRefreshToken(
    body: RefreshTokenGrantDto,
  ): Promise<TokenResponseDto> {
    const payload = await this.jwtService.verifyAsync(body.refresh_token, {
      secret: ConfigUtil.get('jwt.refreshToken.secret'),
    });

    const user = await this.userRepository.findOne({
      where: { id: payload.sub },
      select: ['id', 'lastname'],
    });

    return {
      access_token: await this.generateAccessToken(user),
      refresh_token: await this.generateRefreshToken(user),
    };
  }

  protected async generateAccessToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: user.id,
        iat: Math.round(new Date().getTime() / 1000),
        jti: randomUUID(),
        lastname: user.lastname,
      },
      {
        ...ConfigUtil.get<JwtSignOptions>('jwt.accessToken'),
      },
    );
  }

  protected async generateRefreshToken(user: User): Promise<string> {
    return this.jwtService.signAsync(
      {
        sub: user.id,
        iat: Math.round(new Date().getTime() / 1000),
        jti: randomUUID(),
      },
      {
        ...ConfigUtil.get<JwtSignOptions>('jwt.refreshToken'),
      },
    );
  }

  protected throwInvalidGrant(): void {
    throw new UnauthorizedException({
      error: 'invalid_grant',
      statusCode: HttpStatus.UNAUTHORIZED,
      message: 'Invalid credentials or refresh_token',
    });
  }
}
