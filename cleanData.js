export const cleanerData = data => {
  let finalData = {
    ticker: data["Meta Data"]["2. Symbol"],
    dates: []
  };
  let obj = data["Time Series (Daily)"];
  let lastSevenDates = Object.keys(obj).sort().slice(-7);
  lastSevenDates.forEach((date) => {
    finalData["dates"].push(Object.assign({}, obj[date], {date}));
  });
  return finalData;
};
