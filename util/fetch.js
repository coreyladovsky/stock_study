export const fetchStock = async ticker => {
  try {
    let data = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toUpperCase()}&apikey=0FYYBJVW8H7H8BCY`
    );
    data = await data.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
