import { IsIn, IsOptional, IsString, IsUrl, Length } from 'class-validator';
import { YoutubeFilters } from '../constants';

export class YoutubeVideoRequestDto {
  @IsUrl()
  url: string;
}

export class YoutubeSearchRequestDto {
  @IsString()
  @Length(1)
  query: string;

  @IsOptional()
  @IsString()
  @IsIn(YoutubeFilters)
  filter: string;
}
