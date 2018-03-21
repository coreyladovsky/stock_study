import { cleanerData, singleStock } from "./cleanData.js";

document.addEventListener("DOMContentLoaded", () => {
  defaultStocks();
});

const defaultStocks = () => {
  // let defaults = ["ROBO", "XLK", "VGT", "FDN", "IYW"]
  let defaults = ["CHFS", "SLS", "NFEC", "MRNS", "NOG"];
  let promises = [];
  for (var i = 0; i < defaults.length; i++) {
    promises.push(fetchStock(defaults[i]));
  }
  Promise.all(promises).then(results => {
    let stockData = results.map(res => {
      return cleanerData(res);
    });

    const data = singleStock(stockData[0]);

    const margin = { top: 30, bottom: 50, left: 50, right: 10 };

    const width = 700 - margin.right - margin.left;
    const height = 500 - margin.top - margin.bottom;
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    data.forEach(function(d) {
      d.date = d.date;
      d.close = +d.close;
      d.ticker = d.ticker;
    });

    const makeSvg = () => {
      return d3
        .select("#root")
        .append("svg")
        .attr("height", height + margin.left + margin.right + 50)
        .attr("width", "100%")
        .attr("class", "svg-all-stocks");
    };

    const maxAndMin = () => {
      let max;
      let min;
      for (let i = 0; i < stockData.length; i++) {
        for (var j = 0; j < stockData[i].length; j++) {
          if (!min || parseInt(stockData[i][j]["4. close"]) < min) {
            min = parseInt(stockData[i][j]["4. close"]);
          }

          if (!max || parseInt(stockData[i][j]["4. close"]) > max) {
            max = parseInt(stockData[i][j]["4. close"]);
          }
        }
      }
      return [max, min];
    };

    var [max, min] = maxAndMin();

    var x = d3
      .scaleBand()
      .rangeRound([0, width])
      .padding(0.1)
      .domain(
        data.map(function(d) {
          return d.date;
        })
      );

    const y = d3
      .scaleLinear()
      .range([0, height])
      .domain([0, max]);

    var y2 = d3
      .scaleLinear()
      .rangeRound([0, height])
      .domain([max, 0]);
    //

    const drawLine = d3
      .line()
      // .curve(d3.curveBasis)
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return height + margin.top - y(d.close);
      });


    let svg = makeSvg();

    let g = svg
      .append("g")
      .attr("tranform", "translate(" + 50 + "," + 10 + ")");
    //

    g
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", "translate(0, " + (height + margin.top) + ")")
      .call(d3.axisBottom(x));
    //
    g
      .append("g")
      .attr("class", "y-axis")
      .attr("transform", "translate(50," + margin.top + ")")
      .call(d3.axisLeft(y2));

    const makePath = (g, i, data) => {
      g
        .append("path")
        .data([data])
        .attr("d", drawLine)
        .attr("class", "line2")
        .attr("transform", "translate(40," + margin.top + ")")
        .attr("stroke", function(d) {
          return color(d[0].ticker);
        })
        .attr("stroke-width", "2px")
        .attr("fill", "none");

        var a = g
          .append("g")
          .attr("transform", function(d) {
          return "translate(700," + (100 + (30 * i)) + ")";
        });

        a
      .append("rect")
      .data(data)
      .attr("width", 15)
      .attr("height", 15)
      .attr("class", function(d) {
        return d.ticker + " normal";
      })
      .style("fill", function(d) {
        return color(d.ticker);
      })


    a
      .append("text")
      .data(data)
      .attr("dy", ".8em")
      .attr("x", 25)
      .attr("fill", "black")
      .attr("class", function(d) {
        return d.ticker + " normal ";
      })
      .text(function(d) {
        return d.ticker;
      })



    };

    for (var i = 0; i < stockData.length; i++) {
      let data = singleStock(stockData[i]);
      makePath(g, i, data);
    }

  });
};

const makeG = svg => {
  return svg
    .append("g")
    .attr("tranform", "translate(" + margin.left + "," + margin.top + ")")
    .attr("height", height)
    .attr("width", width);
};

const fetchStock = async ticker => {
  let data = await (await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toUpperCase()}&apikey=0FYYBJVW8H7H8BCY`
  )).json();
  return data;
};
