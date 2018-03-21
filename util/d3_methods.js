export const margin = { top: 30, bottom: 50, left: 50, right: 10 };

export const width = 700 - margin.right - margin.left;
export const height = 500 - margin.top - margin.bottom;
export const color = d3.scaleOrdinal(d3.schemeCategory10);
export const color2 = d3.scaleOrdinal(d3.schemeCategory10);



export const makeSvg = (className, rootId, obj, h, w) => {
  return d3
    .select(rootId)
    .append("svg")
    .attr("height", h + obj.left + obj.right + 50)
    .attr("width", w)
    .attr("class", className);
};
