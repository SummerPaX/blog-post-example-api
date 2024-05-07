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

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDetailResponseDto } from './dto/user-detail-response.dto';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { IsPublic, TokenUser } from '@lib/auth';

@ApiTags('User')
@ApiUnauthorizedResponse()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiCreatedResponse({ type: () => User })
  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'List user' })
  @ApiOkResponse({ type: () => User, isArray: true })
  @ApiBearerAuth()
  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'Get a users profile' })
  @ApiOkResponse({ type: () => UserDetailResponseDto })
  @ApiBearerAuth()
  @Get('profile')
  getProfile(@TokenUser('id') id: number): Promise<UserDetailResponseDto> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Get a user' })
  @ApiOkResponse({ type: () => UserDetailResponseDto })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBearerAuth()
  @Get(':id')
  findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserDetailResponseDto> {
    return this.userService.findOne(id);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiOkResponse({ type: () => User })
  @ApiNotFoundResponse({ description: 'User not found' })
  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiNoContentResponse({ description: 'User deleted' })
  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    return this.userService.remove(id);
  }
}
