import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { EntityNotFoundError } from 'typeorm';

@Catch(EntityNotFoundError)
export class EntityNotFoundFilter implements ExceptionFilter {
  catch(exception: EntityNotFoundError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();
    const entityName = exception.message.match(/type\s"(\w+)"\smatching/);

    response.status(HttpStatus.NOT_FOUND).send({
      error: exception.name,
      statusCode: HttpStatus.NOT_FOUND,
      message: `${entityName?.[1] ?? 'Entity'} not found`,
    });
  }
}
