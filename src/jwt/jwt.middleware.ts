import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from './jwt.service';
import { UserService } from '../users/user.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    if ('x-jwt' in req.headers) {
      const token = req.headers['x-jwt'];
      const decode = this.jwtService.verify(token.toString());
      if (typeof decode === 'object' && decode.hasOwnProperty('id')) {
        try {
          const user = await this.userService.findById(decode['id']);
          req['user'] = user;
        } catch (e) {}
      }
    }
    next();
  }
}
