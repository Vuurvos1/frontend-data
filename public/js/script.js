// import this to use async with parcel
import 'regenerator-runtime/runtime';

import {
  event,
  max,
  select,
  geoPath,
  geoMercator,
  scaleSequential,
  interpolateViridis,
  scaleLinear,
  scaleBand,
  hierarchy,
  axisLeft,
  axisBottom,
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

  // Container SVG
  const margin = {top: 30, right: 30, bottom: 30, left: 30};
  const width = 960 - margin.left - margin.right;
  const height = 500 - margin.top - margin.bottom;

  const svg =
        select('#map')
            .append('svg')
            .attr('width', width + margin.left + margin.top)
            .attr('height', height + margin.top + margin.bottom);

  // Projection and path
  const projection = geoMercator().fitSize([width, height], geoData);
  const geoPath1 = geoPath().projection(projection);

  // Prep user data
  points.forEach((site) => {
    const coords = projection([+site.lng, +site.lat]);
    site.x = coords[0];
    site.y = coords[1];
  });

  // Create a hexgrid generator
  const hexgrid1 =
        hexgrid()
            .extent([width, height])
            .geography(geoData)
            .pathGenerator(geoPath1)
            .projection(projection)
            .hexRadius(4);

  // Instantiate the generator
  const hex = hexgrid1(points);

  // Put data into hexgrid data
  for (const i of hex.grid.layout) {
    if (i.datapoints > 0) {
      for (let j = 0; j < i.datapoints; j++) {
        const z = points.find((item) => {
          return (i[j].x == item.x && i[j].y == item.y);
        });

        if (z) {
          // https://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
          i[j] = {...i[j], ...z};
        }
      }
    }
  }

  // Create exponential colorScale
  const colourScale =
        scaleSequential(function(t) {
          const tNew = Math.pow(t, 10);
          return interpolateViridis(tNew);
        })
            .domain([...hex.grid.extentPointDensity].reverse());

  // Draw the hexes
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
      .style('stroke', '#F4EB9F')
      .on('click', (e, d) => {
        if (d.datapoints > 0) {
          drawBarChart(e, d);
        }
      })
      .append('title').text((d) => {
        let totalCapacity = 0;
        for (let i= 0; i < d.length; i++) {
          totalCapacity += Number(d[i].capacity);
        }
        return `Total capacity: ${totalCapacity}`;
      });


  /**
 * Drawing a barchart
 * @param {object} e - Mouse Event
 * @param {object} d - object containg data from the hexagon
 */
  function drawBarChart(e, d) {
    console.log(e, d);

    // const chart = select('#bar').append('svg');
    const chart = select('#bar svg');

    const w = chart.attr('width');
    const h = chart.attr('height');

    const render = (data) => {
      const xValue = (d) => {
        return d.capacity;
      };
      const yValue = (d) => {
        return d.areadesc;
      };

      const margin = {
        left: 100,
        right: 20,
        top: 20,
        bottom: 20,
      };

      const innerWidth = w - margin.left - margin.right;
      const innerHeight = h - margin.top - margin.bottom;

      const xScale = scaleLinear()
          .domain([0, max(data, xValue)])
          .range([0, innerWidth]);

      const yScale = scaleBand()
          .domain(data.map(yValue))
          .range([0, innerHeight])
          .padding(.1);

      const g = chart.append('g')
          .attr('transform', `translate(${margin.left}, ${margin.top})`);

      // setup axises
      g.append('g').call(axisLeft(yScale));
      g.append('g').call(axisBottom(xScale))
          .attr('transform', `translate(0, ${innerHeight})`);

      g.selectAll('rect')
          .data(data)
          .enter()
          .append('rect')
          .attr('y', (d) => {
            return yScale(yValue(d));
          } )
          .attr('width', (d) => {
            return xScale(xValue(d));
          })
          .attr('height', yScale.bandwidth());
      // .attr('height', Math.min(yScale.bandwidth(), 100));
    };

    render(d);
  }


  // drawCircles(svg, projection, points);
}

mainCode();
