import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { ConfigService } from '@nestjs/config';
import { Verification } from './entities/verification.entity';
import { Order } from '../orders/entities/order.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Verification]),
    ConfigService,
    Order,
  ],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
