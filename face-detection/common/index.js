const { faceDetectionNet, getFaceDetectorOptions} = require('./faceDetection');

exports.save = require('./saveFile');
exports.canvas = require('./canvas');
exports.faceDetectionNet = faceDetectionNet;
exports.getFaceDetectorOptions = getFaceDetectorOptions;