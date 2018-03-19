import { cleanerData } from "./cleanData.js";

document.addEventListener("DOMContentLoaded", () => {
  defaultStocks();
});

const defaultStocks =  () => {
  let defaults = ["ROBO", "XLK", "VGT", "FDN", "IYW"]
  let promises = []
  for (var i = 0; i < defaults.length; i++) {
    promises.push(fetchStock(defaults[i]))
  }
  Promise.all(promises).then((results) => {
    let stockData = results.map((res) => {
      return cleanerData(res)
    })
    debugger
  })

}

const fetchStock = async ticker => {
  let data = await (await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toUpperCase()}&apikey=0FYYBJVW8H7H8BCY`
  )).json();
  return data;
};
