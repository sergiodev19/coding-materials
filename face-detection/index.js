const faceapi = require('face-api.js');
const { save, canvas, faceDetectionNet, getFaceDetectorOptions } = require('./common');

const detectFace = require('./detectFace');
const recognizeAgeAndGender = require('./recognizeAgeAndGender');
const recognizeFace = require('./recognizeFace');

exports.detectFace = async () => {
  try {
    return await detectFace({
      save,
      canvas,
      faceapi,
      faceDetectionNet,
      getFaceDetectorOptions
    });
  } catch (error) {
    throw error;
  }
};

exports.recognizeAgeAndGender = async() => {
  try {
    return await recognizeAgeAndGender({
      save,
      canvas,
      faceapi,
      faceDetectionNet,
      getFaceDetectorOptions
    });
  } catch (error) {
    throw error;
  }
}

exports.recognizeFace = async({ referenceImage, queryImage }) => {
  try {
    return await recognizeFace({
      save,
      canvas,
      faceapi,
      faceDetectionNet,
      getFaceDetectorOptions,
      referenceImage,
      queryImage
    });
  } catch (error) {
    throw error;
  }
}