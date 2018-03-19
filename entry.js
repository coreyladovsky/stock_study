import LineGraph from "./lineGraph.js";

document.addEventListener("DOMContentLoaded", () => {
  fetchStock("ROBO").then(data => {
    let stock = new LineGraph(data);
  });
});

const fetchStock = async ticker => {
  let data = await (await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toUpperCase()}&apikey=0FYYBJVW8H7H8BCY`
  )).json();
  return data;
};
