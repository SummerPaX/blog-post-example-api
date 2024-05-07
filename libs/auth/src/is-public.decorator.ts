import { SetMetadata } from '@nestjs/common';

export const PUBLIC = Symbol('PUBLIC');
export const IsPublic = () => SetMetadata(PUBLIC, true);
