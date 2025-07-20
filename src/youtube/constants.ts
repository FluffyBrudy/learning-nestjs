export const YOUTUBE_ROOT_GET = { url: 'youtube', method: 'GET' };
export const STREAM_VIDEO_POST = { url: 'video', method: 'POST' };
export const SEARCH_VIDEO_GET = { url: 'search', method: 'GET' };

export const ALL_ROUTES = [
  YOUTUBE_ROOT_GET,
  STREAM_VIDEO_POST,
  SEARCH_VIDEO_GET,
];

export const YoutubeFilters = ['channel', 'video', 'playlist'] as Array<
  'channel' | 'video' | 'playlist'
>;
