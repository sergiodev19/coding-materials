const faceapi = require('face-api.js');

exports.faceDetectionNet = faceapi.nets.ssdMobilenetv1;

exports.getFaceDetectorOptions = net => {
  const minConfidence = 0.2;
  const inputSize = 200;
  const scoreThreshold = 0.3;

  return net === faceapi.nets.ssdMobilenetv1
    ? new faceapi.SsdMobilenetv1Options({ minConfidence })
    : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold })
}