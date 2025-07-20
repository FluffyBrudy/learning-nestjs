import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import {
  YoutubeSearchRequestDto,
  YoutubeVideoRequestDto,
} from './dto/youtube.dto';
import {
  ALL_ROUTES,
  SEARCH_VIDEO_GET,
  STREAM_VIDEO_POST,
  YOUTUBE_ROOT_GET,
} from './constants';
import { Request, Response } from 'express';
import { constructUrl } from '../common/url.utils';

@Controller(YOUTUBE_ROOT_GET.url)
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get()
  root(@Req() req: Request) {
    return {
      data: ALL_ROUTES.map((route) => ({
        url: constructUrl(req, route.url),
        method: route.method,
      })),
    };
  }

  @Post(STREAM_VIDEO_POST.url)
  streamAndDownload(
    @Body() body: YoutubeVideoRequestDto,
    @Res() res: Response,
  ) {
    const { data, error } = this.youtubeService.getStreams(body.url);
    if (error) {
      res.status(500).json({ error });
    } else {
      res.set({
        'Content-Type': 'video/mp4',
      });
      data.pipe(res);
    }
  }

  @Get(SEARCH_VIDEO_GET.url)
  async searchVideo(@Query() query: YoutubeSearchRequestDto) {
    const { data, error } = await this.youtubeService.searchVideo(query.query);
    if (error) throw new InternalServerErrorException(error);
    return { data };
  }
}
