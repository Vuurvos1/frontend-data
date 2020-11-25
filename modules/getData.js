const axios = require('axios');

/**
 * Fetch and return data from an api
 * @param {string} url - String containing api url
 * @return {string} Data fetched from the api
 */
const fetchData = async (url) => {
  const data = await axios.get(url);
  return data.data;
};

/**
 * Fetch and return data from an api
 * @param {string} filePath - String containing file path to local data
 * @return {string} Data from local file
 */
const getLocalData = (filePath) => {
  // add ../ because this is one folder deeper than the usual file
  const data = require(`./../${filePath}`);
  return data;
};

/**
 * !! WARNING THIS FUNCTION TAKES A LONG TIME TO EXECUTE !!
 * Fetch all 7500+ RDW garages separatly and save them
 *  @param {string} path - Path where to save the data to
 */
const fetchAllGarages = async (path) => {
  const allData = (await axios.get('https://npropendata.rdw.nl/parkingdata/v2/'))
      .data.ParkingFacilities;

  for (const i of allData) {
    const data = await getData.fetchData(i.staticDataUrl);
    fs.writeFileSync(`${path}/${i.identifier}.json`, JSON.stringify(data));
  }
};


module.exports = {
  fetchData,
  getLocalData,
  fetchAllGarages,
};
