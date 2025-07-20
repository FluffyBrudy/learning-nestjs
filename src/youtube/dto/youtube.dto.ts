import { IsUrl } from 'class-validator';

export class YoutubeVideoRequestDto {
  @IsUrl()
  url: string;
}
