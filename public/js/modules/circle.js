import {
  scaleSqrt,
  max,
} from 'd3';

/**
 * Combine 2 datasets based on a certain key value
 * @param {object} svg - D3 selection you want your dots in
 * @param {object}  projection - D3 map projection
 * @param {Array} points - Array containing the points you want to draw
 */
const drawCircles = (svg, projection, points) => {
  // Circle radius
  const radiusScale = scaleSqrt();
  const radiusValue = (d) => {
    if (d.capacity) {
      return d.capacity;
    }
  };

  radiusScale
      .domain([0, max(points, radiusValue)])
      .range([0, 5]);

  // Draw circles
  svg.append('g')
      .selectAll('circle')
      .data(points)
      .enter()
      .append('circle')
      .attr('class', 'garageCircle')
      .attr('cx', (d) => {
        return projection([Number(d.lng), Number(d.lat)])[0];
      })
      .attr('cy', (d) => {
        return projection([Number(d.lng), Number(d.lat)])[1];
      })
      .attr('r', (d) => radiusScale(radiusValue(d)));
};

module.exports = {
  drawCircles,
};
