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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const margin = { top: 30, bottom: 50, left: 50, right: 10 };
/* harmony export (immutable) */ __webpack_exports__["e"] = margin;


const width = 700 - margin.right - margin.left;
/* harmony export (immutable) */ __webpack_exports__["f"] = width;

const height = 500 - margin.top - margin.bottom;
/* harmony export (immutable) */ __webpack_exports__["c"] = height;

const color = d3.scaleOrdinal(d3.schemeCategory10);
/* harmony export (immutable) */ __webpack_exports__["a"] = color;

const color2 = d3.scaleOrdinal(d3.schemeCategory10);
/* harmony export (immutable) */ __webpack_exports__["b"] = color2;


const makeSvg = (className, rootId, obj, h, w) => {
  return d3
    .select(rootId)
    .append("svg")
    .attr("height", h + obj.left + obj.right + 50)
    .attr("width", w)
    .attr("class", className);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = makeSvg;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_cleanData_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__barGraph_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_fetch_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__ = __webpack_require__(0);





document.addEventListener("DOMContentLoaded", () => {
  defaultStocks();
});

const defaultStocks = () => {
  let defaults = ["CHFS", "SPI", "DF", "MRNS", "NOG"];

  Promise.all(defaults.map(__WEBPACK_IMPORTED_MODULE_2__util_fetch_js__["a" /* fetchStock */])).then(results => {
    var stockData = results.map(res => {
      return Object(__WEBPACK_IMPORTED_MODULE_0__util_cleanData_js__["a" /* cleanerData */])(res);
    });

    const data = Object(__WEBPACK_IMPORTED_MODULE_0__util_cleanData_js__["b" /* singleStock */])(stockData[0]);

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
      .rangeRound([0, __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["f" /* width */]])
      .padding(0.1)
      .domain(
        data.map(function(d) {
          return d.date;
        })
      );

    const y = d3
      .scaleLinear()
      .range([0, __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["c" /* height */]])
      .domain([0, max]);

    var y2 = d3
      .scaleLinear()
      .rangeRound([0, __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["c" /* height */]])
      .domain([max, 0]);
    //

    const drawLine = d3
      .line()
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["c" /* height */] + __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["e" /* margin */].top - y(d.close);
      });


    let svg = Object(__WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["d" /* makeSvg */])("svg-all-stocks", "#root", __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["e" /* margin */], __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["c" /* height */], "100%");

    let g = svg
      .append("g")
      .attr("tranform", "translate(" + 50 + "," + 10 + ")");
    //

    g
      .append("g")
      .attr("class", "x-axis")
      .attr("fill", "white")
      .attr("transform", "translate(100, " + (__WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["c" /* height */] + __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["e" /* margin */].top) + ")")
      .call(d3.axisBottom(x));
    //
    g
      .append("g")
      .attr("class", "y-axis")
      .attr("fill", "white")
      .attr("transform", "translate(150," + __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["e" /* margin */].top + ")")
      .call(d3.axisLeft(y2));

    g.append("text")
      .attr("transform", "translate(70," + (__WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["c" /* height */] / 2 + 70) + ") rotate(-90)")
      .text("PRICE")
      .attr("fill", "white")
      .attr("class", "price-text")

    g.append("text")
      .attr("transform", "translate("+ (__WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["f" /* width */]/ 2 + 75) +"," + (__WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["c" /* height */] + 95) + ")")
      .text("DATE")
      .attr("fill", "white")
      .attr("class", "date-text")

    g.append("text")
      .attr("transform", "translate("+ (__WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["f" /* width */]) +"," + __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["e" /* margin */].top + ")")
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
        .attr("transform", "translate(140," + __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["e" /* margin */].top + ")")
        .attr("stroke", function(d) {
          return Object(__WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["a" /* color */])(d[0].ticker);
        })
        .attr("stroke-width", "4px")
        .attr("fill", "none")
        .on("click", function(d) {
          Object(__WEBPACK_IMPORTED_MODULE_1__barGraph_js__["a" /* changePage */])(stockData, d[0].ticker);
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
          return Object(__WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["a" /* color */])(d.ticker);
        })
        .on("click", function(d) {
          Object(__WEBPACK_IMPORTED_MODULE_1__barGraph_js__["a" /* changePage */])(stockData, d.ticker);
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
          Object(__WEBPACK_IMPORTED_MODULE_1__barGraph_js__["a" /* changePage */])(stockData, d.ticker);
        });
    };

    for (var i = 0; i < stockData.length; i++) {
      let data = Object(__WEBPACK_IMPORTED_MODULE_0__util_cleanData_js__["b" /* singleStock */])(stockData[i]);
      makePath(stockData, g, i, data);
    }
  })
  .catch(err => {
    // setTimeout(defaultStocks, 5000)
  })
};

const makeG = svg => {
  return svg
    .append("g")
    .attr("tranform", "translate(" + (__WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["e" /* margin */].left) + "," + __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["e" /* margin */].top + ")")
    .attr("height", __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["c" /* height */])
    .attr("width", __WEBPACK_IMPORTED_MODULE_3__util_d3_methods_js__["f" /* width */]);
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const cleanerData = data => {
  let finalData = [];
  let obj = data["Time Series (Daily)"];
  if(!obj) return [];
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



/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_d3_methods_js__ = __webpack_require__(0);


const hideModal = () => {
  d3.selectAll(".svg-single-stock").remove();
  let modal = document.getElementById("single-stock-container");
  modal.style.display = "none";
};

const changePage = (stockData, ticker) => {
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

  let svg = Object(__WEBPACK_IMPORTED_MODULE_0__util_d3_methods_js__["d" /* makeSvg */])("svg-single-stock", "#root2", margin, height, width + 200);

  d3.select("#single-stock-container").on("click", hideModal);

  svg
    .append("text")
    .attr("transform", "translate(" + (width / 2 + 40) + "," + 40 + ")")
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
      .attr("height", 0)
      .attr("x", function(d) {
        return x(d.date) + idx * 15 + 11;
      })
      .attr("y", height)
      .on("mouseover", function(d, i) {
        d3
          .select(`#toolbox-${d.word}-${i}`)
          .attr("opacity", 0.8)
          .attr("visibility", "visible");

        d3.select(`#tooltext-${d.word}-${i}`).attr("visibility", "visible");
      })
      .on("mouseout", function(d, i) {
        d3.select(`#toolbox-${d.word}-${i}`).attr("visibility", "hidden");

        d3.select(`#tooltext-${d.word}-${i}`).attr("visibility", "hidden");
      })
      .transition()
      .duration(1000)
      .attr("x", function(d) {
        return x(d.date) + idx * 15 + 11;
      })
      .attr("y", function(d) {
        return 425 - y(d.number);
      })
      .attr("fill", Object(__WEBPACK_IMPORTED_MODULE_0__util_d3_methods_js__["b" /* color2 */])(idx))
      .attr("width", 15)
      .attr("height", function(d) {
        return y(d.number);
      });

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
        return Object(__WEBPACK_IMPORTED_MODULE_0__util_d3_methods_js__["b" /* color2 */])(idx);
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
    var q = g
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
      .attr("visibility", "hidden");

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
  };

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
/* harmony export (immutable) */ __webpack_exports__["a"] = changePage;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const fetchStock = async ticker => {
  try {
    let data = await fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker.toUpperCase()}&apikey=0FYYBJVW8H7H8BCY`
    );
    data = await data.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
/* harmony export (immutable) */ __webpack_exports__["a"] = fetchStock;



/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map