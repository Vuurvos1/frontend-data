/**
 * Normalize all colors inside a dataset to hex colors
 * @param {array} dataset - Array containing dataset columns
 * @param {string} value - The name of the value you want from the dataset
 * @return {array} array containing normalized hex colors
 */
const convertToHex = (dataset, value) => {
  return dataset.map((val) => {
    // normalize values
    let color = val[value].trim().toLowerCase().replace(/ /g, '');

    // test if hex is already valid
    if (color.match(/^#[a-f0-9]{6}$/i)) {
      return color;
    }

    // convert rgb to hex
    if (color.includes('rgb')) {
      // remove unnecessary symbols
      color = color.replace(/\./g, ',').replace(/[a-z\(\)]/g, '');
      // convert values to array
      color = color.split(',', 3);

      color = rgbToHex(color);
    }

    // convert named color to hex
    const eyeColors = {
      blauw: '#0000ff',
      bruin: '#a52a2a',
      grijs: '#808080',
      groen: '#008000',
      lichtblauw: '#add8e6',
      rood: '#ff0000',
    };

    if (eyeColors[color]) {
      return eyeColors[color];
    }

    // try prefixing hex values without #
    if (color[0] != '#') {
      color = `#${color}`;
    }

    // check if hex is still valid after converting else undefined
    if (!color.match(/^#[a-f0-9]{6}$/i)) {
      return undefined;
    }

    return color;
  });
};

/**
 * Normalize all colors inside a dataset to hex colors
 * @param {array} rgb - Array containing R, G and B values
 * @return {string} Hex color representing the RGB input
 */
const rgbToHex = (rgb) => {
  // make sure value is inside valid range
  rgb.map((el) => el = Math.min(255, Math.max(0, el)));

  // this has to be in a for loop for some reason
  for (let i = 0; i < rgb.length; i++) {
    rgb[i] = (+rgb[i]).toString(16).padStart(2, '0');
  }

  // create and return hex value
  return `#${rgb.join('')}`;
};


module.exports = {
  convertToHex,
  rgbToHex,
};
