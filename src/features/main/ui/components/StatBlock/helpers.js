import dayjs from 'dayjs';
import _ from 'lodash';

export const getDates = (list = []) => {
  if (!list) return null;
  const maxDate = dayjs();
  const arr = _.range(7).map(i => maxDate.add(-i, 'day')).reverse();
  return {
    labels: arr.map(date => date.format('DD.MM')),
    values: arr,
  }
}

export const getErrorsData = (list = [], datesArray = []) => {
  if (!list) return null;
  const dataByDates = { before: 0 };

  datesArray.forEach(date => dataByDates[date.format('DD.MM.YYYY')] = 0);
  list
    .map(error => dayjs(error.fired_at.server.split('T')[0]))
    .forEach(date => {
      const formattedDate = date.format('DD.MM.YYYY');
      if (dataByDates[formattedDate] || dataByDates[formattedDate] === 0) dataByDates[formattedDate] += 1;
      else dataByDates.before += 1;
    });

  return Object.keys(dataByDates).map(key => dataByDates[key]);
}

export const getUsersData = (list = [], datesArray = []) => {
  if (!list) return null;
  const dataByDates = { before: 0 };

  datesArray.forEach(date => dataByDates[date.format('DD.MM.YYYY')] = 0);
  list
    .map(user => dayjs(user.session_start.split('T')[0]))
    .forEach(date => {
      const formattedDate = date.format('DD.MM.YYYY');
      if (dataByDates[formattedDate] || dataByDates[formattedDate] === 0) dataByDates[formattedDate] += 1;
      else dataByDates.before += 1;
    });

  return Object.keys(dataByDates).map(key => dataByDates[key]);
}