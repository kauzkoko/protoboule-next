'use client';

import { useState, useEffect, useRef } from 'react';
import { InferenceEngine } from "inferencejs";

const RoboflowPage = () => {
  const [imageUrl, setImageUrl] = useState('/soll.jpeg');
  const [predictions, setPredictions] = useState([]);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runInference = async () => {
      const inferEngine = new InferenceEngine();
      const workerId = await inferEngine.startWorker(
        "boule",
        "1",
        "rf_IbpeOEdY2eeRHcc2O40Wfbuy9mC3"
      );

      const img = document.getElementById("image") as HTMLImageElement;
      if (img && img.complete) {
        const canvas = canvasRef.current;
        // Add a type assertion here
        const ctx = (canvas as HTMLCanvasElement).getContext('2d')!;
        (canvas as HTMLCanvasElement).width = img.width;
        (canvas as HTMLCanvasElement).height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const predictions = await inferEngine.infer(workerId, imageData);
        console.log(predictions);
        setPredictions(predictions);
      }
    };

    const img = document.getElementById("image") as HTMLImageElement;
    if (img) {
      if (img.complete) {
        runInference();
      } else {
        img.onload = runInference;
      }
    }
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
      <canvas ref={canvasRef} style={{ display: 'none' }} />
      {predictions.length > 0 && (
        <pre>{JSON.stringify(predictions, null, 2)}</pre>
      )}
    </div>
  );
};

export default RoboflowPage;
