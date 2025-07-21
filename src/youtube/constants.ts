export const YOUTUBE_ROUTES = {
  route: {
    url: 'youtube',
    method: 'GET',
    subroute: {
      video: {
        downloadInfo: { url: 'download', method: 'POST' },
        search: { url: 'search', method: 'GET' },
      },
    },
  },
};

export const YoutubeFilters = ['channel', 'video', 'playlist'] as Array<
  'channel' | 'video' | 'playlist'
>;
