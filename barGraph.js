const hideModal = () => {
  let modal = document.getElementById("single-stock-container");
  modal.style.display = "none";
};

export const changePage = (stockData, ticker) => {
  let modal = document.getElementById("single-stock-container");
  modal.style.display = "block";
  let open = [];
  let close = [];
  let high = [];
  let low = [];
  for (let i = 0; i < stockData.length; i++) {
    for (let j = 0; j < stockData[i].length; j++) {
      if (stockData[i][j].ticker === ticker) {
        open.push({
          number: stockData[i][j]["1. open"],
          date: stockData[i][j].date.slice(5),
          word: "Open"
        });
        close.push({
          number: stockData[i][j]["4. close"],
          date: stockData[i][j].date.slice(5),
          word: "Close"
        });
        high.push({
          number: stockData[i][j]["2. high"],
          date: stockData[i][j].date.slice(5),
          word: "High"
        });
        low.push({
          number: stockData[i][j]["3. low"],
          date: stockData[i][j].date.slice(5),
          word: "Low"
        });
      }
    }
  }

  let max;
  for (let i = 0; i < high.length; i++) {
    if (!max || parseFloat(high[i].number) > max) {
      max = parseFloat(high[i].number);
    }
  }

  let allData = [open, low, high, close];

  let data = open;

  data.forEach(function(d) {
    // d.date = d.date.slice(5);
    // d.close = +d["4. close"];
    // d.open = +d["1. open"];
    // d.low = +d["3. low"];
    // d.high = +d["2. high"];
    d.number = +d.number;
    d.word = d.word;
    d.date = d.date;
  });

  let margin = { top: 20, right: 10, bottom: 100, left: 40 };
  let width = 700 - margin.right - margin.left;
  let height = 525 - margin.top - margin.bottom;
  let color = d3.scaleOrdinal(d3.schemeCategory10);

  let svg = d3
    .select("#root2")
    .append("svg")
    .attr("height", 700)
    .attr("width", 900)
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
    .domain([0, max]);

  let y2 = d3
    .scaleLinear()
    .rangeRound([0, height])
    .domain([max, 0]);

  const drawBar = (g, data, idx) => {
    //
    // data.forEach(function(d) {
    //   // d.date = d.date.slice(5);
    //   // d.close = +d["4. close"];
    //   // d.open = +d["1. open"];
    //   // d.low = +d["3. low"];
    //   // d.high = +d["2. high"];
    //   d.number = +d.number;
    //   d.word = d.word;
    //   d.date = d.date.slice(5);
    // });

    g
      .append("g")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        // debugger
        return x(d.date) + idx * 10;
      })
      .attr("y", function(d) {
        return 425 - y(d.number);
      })
      .attr("fill", color(idx))
      .attr("width", 15)
      .attr("height", function(d) {
        return y(d.number);
      });
  };

  for (let idx = 0; idx < allData.length; idx++) {
    data = allData[idx];
    drawBar(g, data, idx);
  }

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