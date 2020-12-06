import Api from './Api';

const newsApi = new Api('https://nomoreparties.co/news/v2');

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
      apiKey: '6c4dba1d28d94b279d53efb88c7230c1',
    },
  });
};

export default getNews;
