import { cleanerData, singleStock } from "./util/cleanData.js";
import { changePage } from "./barGraph.js";
import { fetchStock } from "./util/fetch.js";
import { makeSvg, margin, width, height, color } from "./util/d3_methods.js";

document.addEventListener("DOMContentLoaded", () => {
  defaultStocks();
});

const defaultStocks = () => {
  let defaults = ["CHFS", "SPI", "DF", "MRNS", "NOG"];
  // let promises = [];
  // for (let i = 0; i < defaults.length; i++) {
  //   promises.push(fetchStock(defaults[i]));
  // }
  // console.log(promises)
  Promise.all(defaults.map(fetchStock)).then(results => {
    // debugger
    var stockData = results.map(res => {
      return cleanerData(res);
    });

    const data = singleStock(stockData[0]);

    data.forEach(function(d) {
      d.date = d.date;
      d.ticker = d.ticker;
    });

    const maxAndMin = () => {
      let max;
      let min;
      for (let i = 0; i < stockData.length; i++) {
        for (var j = 0; j < stockData[i].length; j++) {
          if (!min || parseFloat(stockData[i][j]["4. close"]) < min) {
            min = parseFloat(stockData[i][j]["4. close"]);
          }

          if (!max || parseFloat(stockData[i][j]["4. close"]) > max) {
            max = parseFloat(stockData[i][j]["4. close"]);
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


    let svg = makeSvg("svg-all-stocks", "#root", margin, height, "100%");

    let g = svg
      .append("g")
      .attr("tranform", "translate(" + 50 + "," + 10 + ")");
    //

    g
      .append("g")
      .attr("class", "x-axis")
      .attr("fill", "white")
      .attr("transform", "translate(100, " + (height + margin.top) + ")")
      .call(d3.axisBottom(x));
    //
    g
      .append("g")
      .attr("class", "y-axis")
      .attr("fill", "white")
      .attr("transform", "translate(150," + margin.top + ")")
      .call(d3.axisLeft(y2));

    g.append("text")
      .attr("transform", "translate(70," + (height / 2 + 70) + ") rotate(-90)")
      .text("PRICE")
      .attr("fill", "white")
      .attr("class", "price-text")

    g.append("text")
      .attr("transform", "translate("+ (width/ 2 + 75) +"," + (height + 95) + ")")
      .text("DATE")
      .attr("fill", "white")
      .attr("class", "date-text")

    g.append("text")
      .attr("transform", "translate("+ (width) +"," + margin.top + ")")
      .text("Click on a Stock for more Info")
      .attr("fill", "white")
      .attr("class", "info-text")

    const makePath = (stockData, g, i, data) => {
      let path =
      g
        .append("path")
        .data([data])
        .attr("d", drawLine)
        .attr("class", "line2")
        .attr("transform", "translate(140," + margin.top + ")")
        .attr("stroke", function(d) {
          return color(d[0].ticker);
        })
        .attr("stroke-width", "4px")
        .attr("fill", "none")
        .on("click", function(d) {
          changePage(stockData, d[0].ticker);
        })

        let length = path.node().getTotalLength();

        path
        .attr("stroke-dasharray", length + " " + length)
        .attr("stroke-dashoffset", length)
        .transition()
        .duration(1000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0)




      var a = g.append("g").attr("transform", function(d) {
        return "translate(800," + (100 + 30 * i) + ")";
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
        .on("click", function(d) {
          changePage(stockData, d.ticker);
        });

      a
        .append("text")
        .data(data)
        .attr("dy", ".8em")
        .attr("x", 25)
        .attr("fill", "white")
        .attr("class", function(d) {
          return d.ticker + " normal ";
        })
        .text(function(d) {
          return d.ticker;
        })
        .on("click", function(d) {
          changePage(stockData, d.ticker);
        });
    };

    for (var i = 0; i < stockData.length; i++) {
      let data = singleStock(stockData[i]);
      makePath(stockData, g, i, data);
    }
  });
};

const makeG = svg => {
  return svg
    .append("g")
    .attr("tranform", "translate(" + (margin.left) + "," + margin.top + ")")
    .attr("height", height)
    .attr("width", width);
};
