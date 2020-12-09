import Api from './Api';
import { NEWS_API_SERVER, NEWS_API_KEY } from './constants';

const newsApi = new Api(NEWS_API_SERVER);

const getNews = (search) => {
  const date = new Date();
  const dateTo = date.toISOString().split('T')[0];
  date.setDate(date.getDate() - 7);
  const dateFrom = date.toISOString().split('T')[0];

  return newsApi.get({
    handle: '/everything',
    params: {
      q: search,
      language: 'ru',
      from: dateFrom,
      to: dateTo,
      pageSize: 100,
      apiKey: NEWS_API_KEY,
    },
  });
};

export default getNews;
