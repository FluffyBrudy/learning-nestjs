import { PartialType } from '@nestjs/mapped-types';
import { CreateCityDto } from './create-city.dto';

export class UpdateCityDto extends PartialType(CreateCityDto) {
  description?: string | undefined;
  active?: boolean | undefined;
  name?: string | undefined;
}
