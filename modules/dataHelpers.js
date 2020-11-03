/**
 * Get a single column out of a dataset
 * @param {array} dataset - Array containing dataset
 * @param {string} column - The name of the column you want from the dataset
 * @return {array} array containing values from the selected column
 */
const getColumn = (dataset, column) => {
  return dataset.map((value) => value[column]);
};

/**
 * Get multiple columns out of a dataset
 * @param {array} dataset - Array containing dataset
 * @param {array} columns - Array containing the names of the columns you want
 * @return {array} array containing values from the selected column
 */
const getColumns = (dataset, columns) => {
  return dataset.map((value) => {
    const data = {};

    for (let i = 0; i < columns.length; i++) {
      data[columns[i]] = value[columns[i]];
    }

    return data;
  });
};

/**
 * Normalize numbers inside an array
 * @param {array} dataset - Array containing dataset columns
 * @param {string} column - The name of the column you want from the dataset
 * @return {array} array containing normalized numbers
 */
const convertToNumbers = (dataset, column)=> {
  return dataset.map((value) => Number(value[column]));
};

/**
 * Get Latatude and Longitude from dataset
 * @param {array} dataset -
 * Objects containing coordinates you want inside a location object
 * @return {array} array containing coordinate from the dataset in geoJSON
 */
const getCoords = (dataset) => {
  return dataset.map((value) => {
    return [value.location.latitude, value.location.longitude];
  } );
};

/**
 * Convert polygon coordinate to a single coordinate
 * @param {array} coords - Array containing coordinates of poligon
 * @return {array} array containing center coordinate of the poligon
 */
const polygonCentroid = (coords) => {
  let xSum = 0;
  let ySum = 0;
  let len = 0;

  for (const coord of coords[0]) {
    xSum += coord[0];
    ySum += coord[1];
    len++;
  }

  return [xSum / len, ySum / len];
};

/**
 * Get locations coordinates from a given areaId
 * @param {array} dataset - Array containing dataset columns
 * @return {array} Object array containing areaId, Location and garage capacity
 */
const getLocationByAreaId = (dataset) => {
  // refactor into:
  // function (dataset1, dataset2, key)
  // returns dataset 2 added to dataset 1 (no duplicate values)

  const filePath = 'output/geoParkeerGarages.json';
  const locationData = require(`./../${filePath}`);

  // use reduce instead of map to prevent undefined values
  return locationData.reduce((result, value) => {
    // console.log(result, value);

    const temp = dataset.find((element) => {
      return element.areaid == value.areaid;
    });

    if (temp) {
      const obj = {
        areaid: value.areaid,
        location: [value.location.latitude, value.location.longitude],
        capacity: temp.capacity,
      };

      result.push(obj);
    } else {
      // error, no match was found
    };
    return result;
  }, []);
};


/**
 * Combine 2 datasets based on a certain key value
 * @param {array} dataset1 - Array containing dataset
 * @param {array} dataset2 - Array containing dataset
 * @param {string} key - The value you want to link datasets with
 * @return {array} A new object with the two combined datasets
 */
const combineDataset = (dataset1, dataset2, key) => {
  return dataset1.reduce((result, value)=> {
    const dataMatch = dataset2.find((item) => {
      return item[key] === value[key];
    });

    if (dataMatch) {
      for (const [key, val] of Object.entries(value)) {
        if (!dataMatch[key]) {
          dataMatch[key] = val;
        }
      }

      result.push(dataMatch);
    } else {
      // no match was found
    }
    return result;
  }, []);
};

module.exports = {
  getColumn,
  getColumns,
  convertToNumbers,
  getCoords,
  polygonCentroid,
  getLocationByAreaId,
  combineDataset,
};
