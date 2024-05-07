import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

export const TokenUser = createParamDecorator(
  (property: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    if (property && !request.user[property]) {
      throw new ForbiddenException(`Missing ${property} on user`);
    }

    return property ? request.user?.[property] : request.user;
  },
);
