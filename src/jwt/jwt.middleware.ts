import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export function jwtMiddleware(req: Request, res: Response, next: NextFunction) {
  console.log(req.headers);
  next();
}
