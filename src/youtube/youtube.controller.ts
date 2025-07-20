import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common';
import { YoutubeService } from './youtube.service';
import { YoutubeVideoRequestDto } from './dto/youtube.dto';
import { ALL_ROUTES, VIDEO_POST, YOUTUBE_ROOT_GET } from './constants';
import { Request, Response } from 'express';

@Controller(YOUTUBE_ROOT_GET.url)
export class YoutubeController {
  constructor(private readonly youtubeService: YoutubeService) {}

  @Get()
  root(@Req() req: Request) {
    return {
      data: ALL_ROUTES.map((route) => ({
        url: req.get('host') + '/' + route.url + '/',
        method: route.method,
      })),
    };
  }

  @Post(VIDEO_POST.url)
  streamAndDownload(
    @Body() body: YoutubeVideoRequestDto,
    @Res() res: Response,
  ) {
    const { error, data } = this.youtubeService.getStreams(body.url);
    if (error) {
      res.status(500).json({ error });
    } else {
      res.set({
        'Content-Type': 'video/mp4',
      });
      data.pipe(res);
    }
  }
}
