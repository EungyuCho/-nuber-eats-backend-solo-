import { InputType, PartialType, Field, ArgsType } from '@nestjs/graphql';
import { CreateRestaurantDto } from './create-restaurant.dto';

@InputType()
class UpdateRestaurantInputType extends PartialType(CreateRestaurantDto) {}

@InputType()
export class UpdateRestaurantDto {
  @Field((is) => Number)
  id: number;

  @Field((is) => UpdateRestaurantInputType)
  data: UpdateRestaurantInputType;
}
