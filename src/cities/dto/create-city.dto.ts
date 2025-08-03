/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @Length(2)
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(0, 1000)
  description: string;

  @IsOptional()
  active: boolean;
}
