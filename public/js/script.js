// import this to use async with parcel
import 'regenerator-runtime/runtime';

import {
  max,
  geoPath,
  geoMercator,
  scaleSequential,
  interpolateViridis,
  scaleLinear,
  scaleBand,
  axisLeft,
  axisBottom,
} from 'd3';

import {hexgrid} from 'd3-hexgrid';

import {bindHexData, chartSetup} from './modules/chartHelpers';

/**
 * Main code loop
 */
async function mainCode() {
  const url = `${window.location.origin}`;

  const geoDataUrl = 'https://cartomap.github.io/nl/wgs84/arbeidsmarktregio_2020.geojson';
  const pointsUrl = `${url}/garageGeo`;

  // fetch data
  const [geoData, points] = await Promise.all([
    await (await fetch(geoDataUrl)).json(),
    await (await fetch(pointsUrl, {
      method: 'POST',
    })).json(),
  ]);

  // do d3 stuff
  const mapSvg = chartSetup('#map svg', {top: 30, right: 30, bottom: 30, left: 30});

  // Projection and path
  const projection = geoMercator().fitSize([mapSvg.w, mapSvg.h], geoData);
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
            .extent([mapSvg.w, mapSvg.h])
            .geography(geoData)
            .pathGenerator(geoPath1)
            .projection(projection)
            .hexRadius(5.2);

  // Instantiate the generator
  const hex = hexgrid1(points);

  // bind dataset to hexgrid hexagons
  bindHexData(hex, points);


  // Create exponential colorScale
  const colourScale =
        scaleSequential(function(t) {
          const tNew = Math.pow(t, 10);
          return interpolateViridis(tNew);
        })
            .domain([...hex.grid.extentPointDensity].reverse());

  // Draw the hexes
  mapSvg
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
      .attr('class', (d) => {
        if (d.length > 0) {
          return 'point';
        }
      })
      .style('stroke', '#F4EB9F')
      .on('click', (e, d) => {
        d.datapoints > 0 ? drawBarChart(d) : null;
      })
      .append('title').text((d) => {
        let totalCapacity = 0;
        for (let i= 0; i < d.length; i++) {
          totalCapacity += Number(d[i].capacity);
        }
        return `Total capacity: ${totalCapacity}`;
      });


  // initialize barchart
  const barMargin = {
    left: 240,
    right: 30,
    top: 20,
    bottom: 40,
  };

  const barSvg = chartSetup('#bar svg', barMargin);

  // setup barchart scales
  const xScale = scaleLinear()
      .range([0, barSvg.w]);

  const yScale = scaleBand()
      .range([0, barSvg.h])
      .padding(.1);

  const g = barSvg.append('g')
      .attr('transform', `translate(${barMargin.left}, ${barMargin.top})`);

  // setup axises
  const barY = g.append('g').call(axisLeft(yScale));
  const barX = g.append('g').call(axisBottom(xScale))
      .attr('transform', `translate(0, ${barSvg.h})`);

  /**
 * Update an existing barchart with new data
 * @param {object} data - object array containg data from the hexagon
 */
  function drawBarChart(data) {
    const xValue = (d) => {
      return Number(d.capacity);
    };

    const yValue = (d) => {
      return d.areadesc;
    };

    const xScale = scaleLinear()
        .domain([0, max(data, xValue)])
        .range([0, barSvg.w]);

    const yScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, barSvg.h])
        .padding(.1);

    barY.call(axisLeft(yScale));
    barX.call(axisBottom(xScale));

    const u = g.selectAll('rect').data(data);

    u
        .enter()
        .append('rect')
        .merge(u)
        .transition()
        .attr('y', (d) => {
          return yScale(yValue(d));
        } )
        .attr('width', (d) => {
          return xScale(xValue(d));
        })
        .attr('height', yScale.bandwidth());

    u.exit().remove();
  }
}

mainCode();
