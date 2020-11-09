// import this to use async with parcel
import 'regenerator-runtime/runtime';

import {
  select,
  geoPath,
  geoMercator,
  scaleSequential,
  interpolateViridis,
} from 'd3';

import {hexgrid} from 'd3-hexgrid';

import {drawCircles} from './modules/circle';

/**
 * Main code loop
 */
async function mainCode() {
  const url = `${window.location.origin}`;

  const geoDataUrl = 'https://cartomap.github.io/nl/wgs84/arbeidsmarktregio_2020.geojson';
  const pointsUrl = `${url}/garageGeo`;

  // get data
  const [geoData, points] = await Promise.all([
    await (await fetch(geoDataUrl)).json(),
    await (await fetch(pointsUrl, {
      method: 'POST',
    })).json(),
  ]);

  // do d3 stuff

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
  const projection = geoMercator().fitSize([width, height], geoData);
  const geoPath1 = geoPath().projection(projection);

  // Prep user data.
  points.forEach((site) => {
    const coords = projection([+site.lng, +site.lat]);
    site.x = coords[0];
    site.y = coords[1];
  });

  // Create a hexgrid generator.
  const hexgrid1 =
        hexgrid()
            .extent([width, height])
            .geography(geoData)
            .pathGenerator(geoPath1)
            .projection(projection)
            .hexRadius(4);

  // Instantiate the generator.
  const hex = hexgrid1(points);

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


  // drawCircles(svg, projection, points);
}

mainCode();
