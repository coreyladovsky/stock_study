import { cleanerData, singleStock } from "./cleanData.js";

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
    const data = singleStock(stockData[0])

    const margin = { top: 20, bottom: 100, left: 50, right: 10};

    const width = 700 - margin.right - margin.left ;
    const height = 500 - margin.top - margin.bottom ;
    const color = d3.scaleOrdinal(d3.schemeCategory20);


    data.forEach(function(d) {
      d.date = d.date;
      d.close = +d.close;
    })

    const makeSvg = () => {
      return  d3.select("#root").append("svg")
      .attr("height", height + margin.left + margin.right)
      .attr("width", width + margin.top + margin.bottom)
      .attr("class", "svg-all-stocks")
    }

    const maxAndMin = () => {
      let max;
      let min;
      for (let i = 0; i < stockData.length; i++) {
        for (var j = 0; j < stockData[i].length; j++) {
          if(!min || parseInt(stockData[i][j]["4. close"]) < min) {
            min = parseInt(stockData[i][j]["4. close"])
          }

          if(!max || parseInt(stockData[i][j]["4. close"]) > max) {
            max = parseInt(stockData[i][j]["4. close"])
          }

        }
      }
      return [max, min]
    }

    var [max, min] = maxAndMin();
    console.log(data);

    // const x = d3.scaleTime().range([0, width])
    // .domain(d3.extent(data, function(d) {return d.date}))

    var x = d3
    .scaleBand()
    .rangeRound([0, width])
    .padding(0.1)
    .domain(
      data.map(function(d) {
        return d.date;
      })
    );

    const y = d3.scaleLinear()
    .range([0, height])
    .domain([min, max])


    var y2 = d3
      .scaleLinear()
      .rangeRound([0, height])
      .domain([
        max, min
      ]);
//

    const drawLine = d3.line()
        .x(function(d) {
          return x(d.date)})
        .y(function(d) { return height - y(d.close)})

        // x.domain(d3.extent(data, function(d) {return d.date}))
        // y.domain([0, d3.max(data, function(d) { return d.close; })])
    // console.log(stockData);
      let svg = makeSvg();

      let g = svg.append("g")
      .attr("tranform", "translate(" + (50) + "," +  10 + ")")

  //     g
  // .selectAll("path")
  // .data(data)
  // .enter()
  // .append("path")
  // .attr("class", "bar")
  // .attr("x", function(d) {
  //   return x(d.date);
  // })
  // .attr("y", function(d) {
  //   return 425 - y(d.close);
  // })
  // .attr("width", x.bandwidth())
  // .attr("height", function(d) {
  //   return y(d.close);
  // })
  // .attr("fill", "blue");

      g.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", drawLine)
        .attr("transform", "translate(40," + (margin.top) + ")")
        .attr("stroke", "blue")
        .attr("stroke-width", "2px")
        .attr("fill", "none")

      //
        g.append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(0, " +  (height + margin.top) + ")")
          .call(d3.axisBottom(x));
      //
        g.append("g")
        .attr("class", "y-axis")
        .attr("transform", "translate(50," + margin.top + ")")
          .call(d3.axisLeft(y2));


      // makeG(svg)
    //   .selectAll(".all-stocks")
    //   .data(data)
    //   .enter()
    //   .append("path")
    //   .attr("class", "all-stocks")
    //   .attr("d", drawLine)
    //   .attr("stroke", "blue")
    //   .attr("stroke-width", "5")
  })
}





const makeG = (svg) => {
 return svg.append("g")
 .attr("tranform", "translate(" + margin.left + "," +  margin.top + ")")
 .attr("height", height)
 .attr("width", width)
}




const fetchStock = async ticker => {
  let data = await (await fetch(
    `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toUpperCase()}&apikey=0FYYBJVW8H7H8BCY`
  )).json();
  return data;
};
