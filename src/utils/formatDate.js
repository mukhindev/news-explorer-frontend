const formatDate = (date) => {
  if (!(date instanceof Date)) throw Error('Нет объекта даты');
  const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'];
  return `${date.getDate()} ${months[date.getMonth()]}, ${date.getFullYear()}`;
};

export default formatDate;
