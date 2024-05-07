import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { JsonWebTokenError } from 'jsonwebtoken';

@Catch(JsonWebTokenError)
export class JwtErrorFilter implements ExceptionFilter {
  catch(exception: JsonWebTokenError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    response.status(HttpStatus.UNAUTHORIZED).send({
      error: exception.name,
      statusCode: HttpStatus.UNAUTHORIZED,
      message: exception.message,
    });
  }
}
