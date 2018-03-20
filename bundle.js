/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__cleanData_js__ = __webpack_require__(2);


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
      return Object(__WEBPACK_IMPORTED_MODULE_0__cleanData_js__["a" /* cleanerData */])(res)
    })
    const data = Object(__WEBPACK_IMPORTED_MODULE_0__cleanData_js__["b" /* singleStock */])(stockData[0])

    const margin = { top: 20, bottom: 100, left: 50, right: 10};

    const width = 700 - margin.right - margin.left ;
    const height = 500 - margin.top - margin.bottom ;
    const color = d3.scaleOrdinal(d3.schemeCategory10);


    data.forEach(function(d) {
      d.date = d.date;
      d.close = +d.close;
      d.ticker = d.ticker;
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
        .attr("stroke", function(d) {
           return color(d[0].ticker)})
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


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const cleanerData = data => {
  let finalData = [];
  let obj = data["Time Series (Daily)"];
  let lastSevenDates = Object.keys(obj).sort().slice(-7);
  lastSevenDates.forEach((date) => {
    finalData.push(Object.assign({}, obj[date], {date}, {ticker: data["Meta Data"]["2. Symbol"]}));
  });
  return finalData;
};
/* harmony export (immutable) */ __webpack_exports__["a"] = cleanerData;



const singleStock = array => {
  return array.map((obj) => {
    return { date: obj["date"].slice(5), close: obj["4. close"], ticker: obj["ticker"]};
  });
};
/* harmony export (immutable) */ __webpack_exports__["b"] = singleStock;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map