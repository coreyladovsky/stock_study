import { makeSvg, color2 } from "./util/d3_methods.js";

const hideModal = () => {
  d3.selectAll(".svg-single-stock").remove();
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
    d.number = +d.number;
    d.word = d.word;
    d.date = d.date;
  });

  let margin = { top: 20, right: 10, bottom: 100, left: 40 };
  let width = 700 - margin.right - margin.left;
  let height = 525 - margin.top - margin.bottom;
  let color = d3.scaleOrdinal(d3.schemeCategory10);

  let svg = makeSvg("svg-single-stock", "#root2", margin, height, width + 200);

  d3.select("#single-stock-container").on("click", hideModal);

  svg
    .append("text")
    .attr("transform", "translate(" + (width / 2 + 40) + "," + 10 + ")")
    .text(ticker)
    .attr("class", "stock-header");

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
    g
      .append("g")
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        return x(d.date) + idx * 15 + 11;
      })
      .attr("y", function(d) {
        return 425 - y(d.number);
      })
      .attr("fill", color2(idx))
      .attr("width", 15)
      .attr("height", function(d) {
        return y(d.number);
      })
      .on("mouseover", function(d, i) {
        d3.select(`#toolbox-${d.word}-${i}`)
          .attr("opacity", .8)
          .attr("visibility", "visible")

        d3.select(`#tooltext-${d.word}-${i}`)
        .attr("visibility", "visible")

      })
      .on("mouseout", function(d, i) {
        d3.select(`#toolbox-${d.word}-${i}`)
          .attr("visibility", "hidden")

        d3.select(`#tooltext-${d.word}-${i}`)
        .attr("visibility", "hidden")

      })
      // .append("svg:title")
      // .text(function(d) { return d.number});


    let a = g.append("g").attr("transform", function(d) {
      return "translate(700," + (100 + 30 * idx) + ")";
    });

    a
      .append("rect")
      .data(data)
      .attr("width", 15)
      .attr("height", 15)
      .style("fill", function(d) {
        return color2(idx);
      });

    a
      .append("text")
      .data(data)
      .attr("dy", ".8em")
      .attr("x", 25)
      .attr("fill", "black")
      .text(function(d) {
        return d.word;
      });
  };

  const drawToolTip = (g, data, idx) => {

    var q =  g
      .append("g")
      .selectAll("rect")
      .attr("class", "tooltip")
      .data(data)
      .enter()

      .append("rect")
      .attr("x", function(d) {
        return x(d.date) + idx * 15 - 29;
      })
      .attr("y", function(d) {
        return 400 - y(d.number);
      })
      .attr("id", function(d, i) {
        return `toolbox-${d.word}-${i}`;
      })
      .attr("rx", 5)
      .attr("width", 100)
      .attr("height", 25)
      .attr("fill", "#cc2be2")
      .attr("visibility", "hidden")

      g
      .append("g")
      .selectAll("text")
      .data(data)
      .enter()
      .append("text")
      .attr("id", function(d, i) {
        return `tooltext-${d.word}-${i}`;
      })
      .attr("x", function(d) {
        return x(d.date) + idx * 15 - 5;
      })
      .attr("y", function(d) {
        return 425 - y(d.number) - 7;
      })
      .attr("fill", "white")
      .attr("visibility", "hidden")


      .text(function(d) {
        return d.number;
      });

  }

  for (let idx = 0; idx < allData.length; idx++) {
    data = allData[idx];
    drawBar(g, data, idx);
  }
  for (let idx = 0; idx < allData.length; idx++) {
    data = allData[idx];
    drawToolTip(g, data, idx);
  }

  g
    .append("g")
    .attr("class", "x-axis-bar")
    .attr("transform", "translate(0," + (height + margin.top) + ")")
    .call(d3.axisBottom(x));

  g
    .append("g")
    .attr("class", "y-axis-bar")
    .attr("transform", "translate(0," + margin.top + ")")
    .call(d3.axisLeft(y2));
};
