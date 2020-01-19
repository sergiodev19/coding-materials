module.exports = async ({
  save,
  canvas,
  faceapi,
  faceDetectionNet,
  getFaceDetectorOptions,
  referenceImage,
  queryImage
}) => {
  try {
    const faceDetectionOptions = getFaceDetectorOptions(faceDetectionNet);

    await faceapi.nets.faceLandmark68Net.loadFromDisk(`${__dirname}/models`);
    await faceapi.nets.faceRecognitionNet.loadFromDisk(`${__dirname}/models`);
    await faceDetectionNet.loadFromDisk(`${__dirname}/models`);

    const REFERENCE_IMAGE = await canvas.loadImage(`${__dirname}/images/${referenceImage}`);
    const QUERY_IMAGE = await canvas.loadImage(`${__dirname}/images/${queryImage}`);
    
    const resultsRef = await faceapi.detectAllFaces(REFERENCE_IMAGE, faceDetectionOptions)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const resultsQuery = await faceapi.detectAllFaces(QUERY_IMAGE, faceDetectionOptions)
      .withFaceLandmarks()
      .withFaceDescriptors();

    const faceMatcher = new faceapi.FaceMatcher(resultsRef);
    const labels = faceMatcher.labeledDescriptors.map(ld => ld.label);

    const refDrawBoxes = resultsRef
      .map(res => res.detection.box)
      .map((box, i) => new faceapi.draw.DrawBox(box, { label: labels[i] }));

    const outRef = faceapi.createCanvasFromMedia(REFERENCE_IMAGE);
    refDrawBoxes.forEach(drawBox => drawBox.draw(outRef));
    
    const queryDrawBoxes = resultsQuery.map(res => {
      const bestMatch = faceMatcher.findBestMatch(res.descriptor);

      if (bestMatch._label !== 'unknown') {
        return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() });
      }
    });
    
    if (queryDrawBoxes.length === 1 && queryDrawBoxes[0] === undefined) {
      return false;
    }

    const outQuery = faceapi.createCanvasFromMedia(QUERY_IMAGE);
    queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery));

    save(`recognizeReferenceFace${Date.now()}.jpg`, outRef.toBuffer("image/jpeg"));
    save(`recognizeQueryFace${Date.now()}.jpg`, outQuery.toBuffer("image/jpeg"));
    return true;
  } catch (error) {
    throw error;
  }
};