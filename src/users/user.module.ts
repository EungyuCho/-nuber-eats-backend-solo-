import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { UserResolver } from './userResolver';
import { ConfigService } from '@nestjs/config';
import { Verification } from './entities/verification.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Verification]), ConfigService],
  providers: [UserResolver, UserService],
  exports: [UserService],
})
export class UserModule {}
