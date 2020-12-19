import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

@ObjectType()
@Entity()
export class Restaurant {
  @PrimaryGeneratedColumn()
  @Field((is) => Number)
  @IsNumber()
  id: number;

  @Field((is) => String)
  @Column()
  @IsString()
  @Length(5, 10)
  name: string;

  @Field((is) => Boolean, { defaultValue: true })
  @Column({ default: true })
  @IsBoolean()
  @IsOptional()
  isVegan: boolean;

  @Field((is) => String)
  @Column()
  @IsString()
  address: string;

  @Field((is) => String, { defaultValue: 'anonymous' })
  @Column()
  @IsString()
  @IsOptional()
  ownersName: string;

  @Field((type) => String, { defaultValue: 'unknown' })
  @Column()
  @IsString()
  @IsOptional()
  categoryName: string;
}
