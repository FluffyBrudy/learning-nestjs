import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import {
  YoutubeSearchRequestDto,
  YoutubeVideoRequestDto,
} from './dto/youtube.dto';
import { YOUTUBE_ROUTES } from './constants';
import { Request } from 'express';
import { constructUrlFromRouteDefination } from '../common/route.utils';

@Controller(YOUTUBE_ROUTES.route.url)
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get()
  root(@Req() req: Request) {
    const protocol = req.protocol;
    const host = req.get('host');
    return {
      data: constructUrlFromRouteDefination(protocol, host, YOUTUBE_ROUTES),
    };
  }

  @Post(YOUTUBE_ROUTES.route.subroute.video.downloadInfo.url)
  async downloadVideo(@Body() body: YoutubeVideoRequestDto) {
    const { data, error } = await this.youtubeService.getDownloadInfo(body.url);
    if (error) throw new InternalServerErrorException(error);
    return { data };
  }

  @Get(YOUTUBE_ROUTES.route.subroute.video.search.url)
  async searchVideo(@Query() query: YoutubeSearchRequestDto) {
    const { data, error } = await this.youtubeService.searchVideo(query.query);
    if (error) throw new InternalServerErrorException(error);
    return { data };
  }
}
