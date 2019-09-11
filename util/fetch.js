export const fetchStock = async ticker => {
  try {
  //   let data = await (await fetch(
  //   `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toUpperCase()}&apikey=0FYYBJVW8H7H8BCY`
  // ), {mode: 'no-cors'}).json();
  let data = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toUpperCase()}&apikey=0FYYBJVW8H7H8BCY`);
    // debugger
    data = await data.json();
    // debugger
  return data;
  } catch (err) {
    // debugger
    console.log(err)
  }
};
