module.exports = async ({
  save,
  canvas,
  faceapi,
  faceDetectionNet,
  getFaceDetectorOptions
}) => {
  try {
    const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet);

    await faceDetectionNet.loadFromDisk(`${__dirname}/models`);
    const img = await canvas.loadImage(`${__dirname}/images/2.jpg`);
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions);
    if (detections.length) {
      const out = faceapi.createCanvasFromMedia(img);
      faceapi.draw.drawDetections(out, detections);
      save(`faceDetection_${Date.now()}.jpg`, out.toBuffer("image/jpeg"));
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};