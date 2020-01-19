module.exports = async ({
  save,
  canvas,
  faceapi,
  faceDetectionNet,
  getFaceDetectorOptions
}) => {
  try {
    const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet);

    await faceapi.nets.faceLandmark68Net.loadFromDisk(`${__dirname}/models`);
    await faceapi.nets.ageGenderNet.loadFromDisk(`${__dirname}/models`);
    await faceDetectionNet.loadFromDisk(`${__dirname}/models`);

    const img = await canvas.loadImage(`${__dirname}/images/2.jpg`);
    const detections = await faceapi.detectAllFaces(img, faceDetectionOptions)
      .withFaceLandmarks()
      .withAgeAndGender();
    if (detections.length) {
      const out = faceapi.createCanvasFromMedia(img);

      faceapi.draw.drawDetections(out, detections.map(res => res.detection))
      detections.forEach(result => {
        const { age, gender, genderProbability } = result
        new faceapi.draw.DrawTextField(
          [
            `${faceapi.utils.round(age, 0)} years`,
            `${gender} (${faceapi.utils.round(genderProbability)})`
          ],
          result.detection.box.bottomLeft
        ).draw(out)
      });

      save(`faceDetection_${Date.now()}.jpg`, out.toBuffer("image/jpeg"));
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};