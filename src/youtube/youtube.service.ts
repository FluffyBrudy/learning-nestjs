import { Injectable } from '@nestjs/common';
import ytdl from '@distube/ytdl-core';
import { search as ytSearch } from 'play-dl';
import { Readable } from 'stream';
import {
  TFailureResponse,
  TResponse,
  TSuccessResponse,
} from '../types/shared.types';
import { YoutubeFilters } from './constants';

type TYoutubeFilter = (typeof YoutubeFilters)[number];

@Injectable()
export class YoutubeService {
  getStreams(watchUrl: string): TResponse<Readable> {
    try {
      const res = ytdl(watchUrl, { quality: 'highest' });
      return {
        data: res,
        error: null,
      };
    } catch (err) {
      return {
        data: null,
        error: (err as Error)?.message || 'something went wrong',
      };
    }
  }

  async searchVideo(query: string, filter_?: string) {
    try {
      const filter = filter_
        ? { source: { youtube: filter_ as TYoutubeFilter } }
        : undefined;
      const res = await ytSearch(query, filter);
      return { data: res, error: null } as TSuccessResponse<typeof res>;
    } catch (error) {
      return {
        data: null,
        error: (error as Error)?.message || error || 'something went wrong',
      } as TFailureResponse;
    }
  }
}
