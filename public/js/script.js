// 'https://bl.ocks.org/larsvers/7f856d848e1f5c007553a9cea8a73538'
import {
  select,
  json,
  geoPath,
  geoMercator,
  scaleSequential,
  interpolateViridis,
  scaleSqrt,
  max,
} from 'd3';
import {hexgrid} from 'd3-hexgrid';

const url = `${window.location.origin}`;

/**
 * Main code
 * @param {array} geo - topojson
 * @param {array} userData - array containing data points
 */
function ready(geo, userData) {
  // Container SVG.
  const margin = {top: 30, right: 30, bottom: 30, left: 30};
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg =
      select('#container')
          .append('svg')
          .attr('width', width + margin.left + margin.top)
          .attr('height', height + margin.top + margin.bottom)
          .append('g');

  // Projection and path.
  const projection = geoMercator().fitSize([width, height], geo);
  const geoPath1 = geoPath().projection(projection);

  // Prep user data.
  userData.forEach((site) => {
    const coords = projection([+site.lng, +site.lat]);
    site.x = coords[0];
    site.y = coords[1];
  });

  // Create a hexgrid generator.
  const hexgrid1 =
      hexgrid()
          .extent([width, height])
          .geography(geo)
          .pathGenerator(geoPath1)
          .projection(projection)
          .hexRadius(4);

  // Instantiate the generator.
  const hex = hexgrid1(userData);

  // Create exponential colorScale.
  const colourScale =
      scaleSequential(function(t) {
        const tNew = Math.pow(t, 10);
        return interpolateViridis(tNew);
      })
          .domain([...hex.grid.extentPointDensity].reverse());

  // Draw the hexes.
  svg
      .append('g')
      .selectAll('path')
      .data(hex.grid.layout)
      .enter()
      .append('path')
      .attr('d', hex.hexagon())
      .attr('transform', (d) => `translate(${d.x} ${d.y})`)
      .style('fill', (d) =>
      !d.pointDensity ? '#fff' : colourScale(d.pointDensity),
      )
      .style('stroke', '#F4EB9F');

  // Circle radius
  const radiusScale = scaleSqrt();
  const radiusValue = (d) => {
    if (d.capacity) {
      return d.capacity;
    }
  };

  radiusScale
      .domain([0, max(userData, radiusValue)])
      .range([0, 5]);

  // console.log(userData);
  console.log( radiusScale
      .domain([0, max(userData, radiusValue)]));

  // Draw circles
  svg.append('g')
      .selectAll('circle')
      .data(userData)
      .enter()
      .append('circle')
      .attr('class', 'garageCircle')
      .attr('cx', (d) => {
        const lat = Number(d.location.latitude);
        const long = Number(d.location.longitude);
        return projection([long, lat])[0];
      })
      .attr('cy', (d) => {
        const lat = Number(d.location.latitude);
        const long = Number(d.location.longitude);
        return projection([long, lat])[1];
      })
      .attr('r', (d) => radiusScale(radiusValue(d)));
}

// load data
const geoData = json(
    'https://cartomap.github.io/nl/wgs84/arbeidsmarktregio_2020.geojson',
);
const points = json(
    `http://localhost:3000/garageGeo`,
);
// 'https://raw.githubusercontent.com/larsvers/data-store/master/farmers_markets_us.json',

Promise.all([geoData, points]).then((res) => {
  const [geoData, userData] = res;

  ready(geoData, userData);
});


// fetch(`${url}/garageGeo`, {
//   method: 'POST',
// })
//     .then((response) => response.json())
//     .then((data) => (console.log(data)));

