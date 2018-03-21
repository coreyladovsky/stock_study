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
  let data = singleStockData;
  data.forEach(function(d) {
    d.date = d.date.slice(5);
    d.close = +d["4. close"];
    d.open = +d["1. open"];
    d.low = +d["3. low"];
    d.high = +d["2. high"];
  });

  let margin = { top: 20, right: 10, bottom: 100, left: 40 };
  let width = 700 - margin.right - margin.left;
  let height = 525 - margin.top - margin.bottom;
  let color = d3.scaleOrdinal(d3.schemeCategory10);

  let svg = d3
    .select("#root2")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%")
    .attr("class", "svg-single-stock")
    .on("click", hideModal);

  let g = svg.append("g").attr("transform", "translate(" + 50 + "," + 10 + ")");

  let x = d3
  .scaleBand()
  .rangeRound([0, width])
  .padding(0.1)
  .domain(
    data.map(function(d) {
      return d.date;
    })
  );

  let y = d3
    .scaleLinear()
    .rangeRound([0, height])
    .domain([
      0,
      d3.max(data, function(d) {
        return d.open;
      })
    ]);

  let y2 = d3
    .scaleLinear()
    .rangeRound([0, height])
    .domain([
      d3.max(data, function(d) {
        return d.high;
      }),
      0
    ]);

  g
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", function(d) {
      return x(d.date);
    })
    .attr("y", function(d) {
      return 425 - y(d.open);
    })
    .attr("fill", function(d) {
      return color(d.open);
    })
    .attr("width", x.bandwidth())
    .attr("height", function(d) { return y(d.open); });

  g
    .append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + (height + margin.top) + ")")
    .call(d3.axisBottom(x));

  g
    .append("g")
    .attr("class", "y-axis")
    .attr("transform", "translate(0," + margin.top + ")")
    .call(d3.axisLeft(y2));
};
