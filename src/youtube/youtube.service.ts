import { Injectable } from '@nestjs/common';
import * as ytdl from '@distube/ytdl-core';
import { Readable } from 'stream';

type TGetStream =
  | { data: Readable; error: null }
  | { data: null; error: string };

@Injectable()
export class YoutubeService {
  getStreams(watchUrl: string): TGetStream {
    try {
      const res = ytdl(watchUrl, { quality: 'highest' });
      return {
        data: res,
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        error: (err as Error).message,
      };
    }
  }
}
