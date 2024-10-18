'use client';

import { useState, useEffect } from 'react';
import { InferenceEngine } from "inferencejs";

export default function RoboflowPage() {
  const [imageUrl, setImageUrl] = useState('/soll.jpeg');
  const [predictions, setPredictions] = useState([]);
  const inferEngine = new InferenceEngine();


  useEffect(() => {
    const runInference = async () => {
      const workerId = await inferEngine.startWorker(
        "boule",
        "1",
        "rf_IbpeOEdY2eeRHcc2O40Wfbuy9mC3"
      );
      console.log(workerId);

      const image = document.getElementById("image");
      if (image) {
        const _predictions = await inferEngine.infer(workerId, image);
        console.log(_predictions);
        setPredictions(_predictions);
      }
    };

    runInference();
  }, []);

  return (
    <div>
      <h1>Simple Roboflow Inference Example</h1>
      <img
        id="image"
        src={imageUrl}
        alt="Input image"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
      {predictions.length > 0 && (
        <pre>{JSON.stringify(predictions, null, 2)}</pre>
      )}
    </div>
  );
}