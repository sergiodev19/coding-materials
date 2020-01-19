const canvas = require('canvas');
const faceapi = require('face-api.js');

const { Canvas, Image, ImageData } = canvas;
faceapi.env.monkeyPatch({ Canvas, Image, ImageData });

module.exports = canvas;