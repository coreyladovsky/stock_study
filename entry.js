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

    const width = 700 ;
    const height = 500 ;
    const color = d3.scaleOrdinal(d3.schemeCategory20);

    const makeSvg = () => {
      return  d3.select("#root").append("svg")
      .attr("height", height + margin.left + margin.right)
      .attr("width", width + margin.top + margin.bottom)
      .attr("class", "svg-all-stocks")
      .append("g")
      .attr("tranform", "translate(" + (50 + margin.left) + "," +  margin.top + ")")
    }

    data.forEach(function(d) {
      d.date = d.date;
      d.close = +d.close;
    })

    console.log(data);

    const x = d3.scaleTime().range([0, width])
    // .domain(d3.extent(data, function(d) {return d.date}))

    const y = d3.scaleLinear().rangeRound([0, height])
    // .domain([0, d3.max(data, function(d) { return d.close; })])


    var y2 = d3
      .scaleLinear()
      .rangeRound([0, height])
      .domain([
        d3.max(data, function(d) {
          return d.close;
        }),
        0
      ]);
//

    const drawLine = d3.line()
        .x(function(d) {
          return x(d.date)})
        .y(function(d) { return y(d.close)})

        x.domain(d3.extent(data, function(d) {return d.date}))
        y.domain([0, d3.max(data, function(d) { return d.close; })])
    // console.log(stockData);
      let svg = makeSvg();


      svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("d", drawLine)
        .attr("stroke", function(d) {
        return color(d.ticker)
        })
        .attr("stroke-width", "2px")

        svg.append("g")
          .attr("class", "x-axis")
          .attr("transform", "translate(50, " +  (height + 20) + ")")
          .call(d3.axisBottom(x));

        svg.append("g")
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
