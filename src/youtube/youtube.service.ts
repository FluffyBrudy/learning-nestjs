import { Injectable } from '@nestjs/common';
import { getInfo, getURLVideoID, videoFormat } from '@distube/ytdl-core';
import { search as ytSearch } from 'play-dl';
import {
  TFailureResponse,
  TResponse,
  TSuccessResponse,
} from '../types/shared.types';
import { YoutubeFilters } from './constants';

type TYoutubeFilter = (typeof YoutubeFilters)[number];

@Injectable()
export class YoutubeService {
  async getDownloadInfo(url: string): Promise<
    TResponse<{
      embadeUrl: string;
      formats: videoFormat[];
    }>
  > {
    try {
      const videoId = getURLVideoID(url);
      const info = await getInfo(url);
      const data = {
        embadeUrl: 'https://www.youtube.com/embed/' + videoId,
        formats: info.formats,
      };
      return {
        data,
        error: null,
      };
    } catch (error) {
      return {
        data: null,
        error: (error as Error).message || 'something went wrong',
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
