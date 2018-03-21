export const cleanerData = data => {
  let finalData = [];
  let obj = data["Time Series (Daily)"];
  let lastSevenDates = Object.keys(obj).sort().slice(-7);
  lastSevenDates.forEach((date) => {
    finalData.push(Object.assign({}, obj[date], {date}, {ticker: data["Meta Data"]["2. Symbol"]}));
  });
  return finalData;
};


export const singleStock = array => {
  return array.map((obj) => {
    return { date: obj["date"].slice(5), close: obj["4. close"], ticker: obj["ticker"]};
  });
};
