const getDateOffSetValue = (date: Date) => new Date(date).getTimezoneOffset();

const getDate = (date: Date, offSet = 0) => new Date(new Date(date).getTime() + offSet * 1000);

const getDateLocaleString = (date: Date) => {
  const currentDateOffSet = getDateOffSetValue(date);

  return getDate(date, currentDateOffSet).toLocaleString("en-GB");
};

const getDateLocaleDateString = (date: Date) => {
  let currentDateOffSet = getDateOffSetValue(date);

  return getDate(date, currentDateOffSet).toLocaleDateString("en-GB");
};

export { getDateLocaleDateString, getDateLocaleString };
