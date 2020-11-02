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


module.exports = {
  fetchData,
  getLocalData,
};
