const getDateOffSetValue = (date: Date) => new Date(date).getTimezoneOffset();

const getDate = (date: Date, offSet = 0) => new Date(new Date(date).getTime() + offSet * 1000);

const getDateLocaleString = (date: Date) => {
  const currentDateOffSet = getDateOffSetValue(date);

  return getDate(date, currentDateOffSet)
    .toLocaleString("en-GB", {
      timeZone: "Europe/London",
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
    .replace(",", "");
};

const getDateLocaleDateString = (date: Date) => {
  let currentDateOffSet = getDateOffSetValue(date);

  return getDate(date, currentDateOffSet).toLocaleDateString("en-GB", { timeZone: "Europe/London" });
};

const timeDelayInMs = (time: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, time));

const getDateTimeDiff = (datePast: Date, dateEnd?: Date) => {
  const dateEndTime = dateEnd ? dateEnd.getTime() : new Date().getTime();

  let diffInMilliSeconds = Math.abs(datePast.getTime() - dateEndTime) / 1000;

  const days = Math.floor(diffInMilliSeconds / 86400);
  diffInMilliSeconds -= days * 86400;

  const hours = Math.floor(diffInMilliSeconds / 3600) % 24;
  diffInMilliSeconds -= hours * 3600;

  const minutes = Math.floor(diffInMilliSeconds / 60) % 60;
  diffInMilliSeconds -= minutes * 60;

  let difference = "";

  if (days > 0) {
    difference += days === 1 ? `${days} day, ` : `${days} days, `;
  }

  difference += hours === 0 || hours === 1 ? `${hours} hour, ` : `${hours} hours, `;

  difference += minutes === 0 || hours === 1 ? `${minutes} minutes` : `${minutes} minutes`;

  return difference;
};

export { getDateLocaleDateString, getDateLocaleString, getDateTimeDiff, timeDelayInMs };
