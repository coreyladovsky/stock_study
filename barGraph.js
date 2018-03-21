const hideModal = () => {
  let modal = document.getElementById("root2");
  modal.style.display = "none";
};


export const changePage = (stockData, ticker) => {
  let modal = document.getElementById("root2");
  modal.style.display = "block";
  let singleStockData = [];
  for (let i = 0; i < stockData.length; i++) {
    for (var j = 0; j < stockData[i].length; j++) {
      if (stockData[i][j].ticker === ticker) {
        singleStockData.push(stockData[i][j]);
      }
    }
  }



  d3
   .select("#root2")
   .append("svg")
   .attr("height", "100%")
   .attr("width", "100%")
   .attr("class", "svg-single-stock")
   .on("click", hideModal);








};
