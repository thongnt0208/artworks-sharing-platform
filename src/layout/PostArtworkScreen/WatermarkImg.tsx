/* eslint-disable react-hooks/exhaustive-deps */
import Watermark from "watermark-image";

function imageToCanvas(image: HTMLImageElement): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Could not get 2d context from canvas");
  }

  canvas.width = image.width;
  canvas.height = image.height;

  // Wait for image to load before drawing
  image.onload = () => {
    ctx.drawImage(image, 0, 0);
  };

  return canvas;
}

function canvasToImage(canvas: HTMLCanvasElement): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;

    image.src = canvas.toDataURL(); // Get data URL from canvas
  });
}

export async function imageToFile(
  image: HTMLImageElement & { type?: string },
  filename: string,
  mimeType = image.type || "image/jpeg"
): Promise<File> {
  const response = await fetch(image.src);

  if (!response.ok) {
    throw new Error(`Failed to fetch image: ${response.statusText}`);
  }

  const blob = await response.blob();
  return new File([blob], filename, { type: mimeType });
}

const WatermarkedImage = (image: HTMLImageElement, opacity: number = 0.5) => {
  // Create the canvas element before drawing
  const watermarkCanvas = document.createElement("canvas");

  const drawWatermark = async () => {
    try {
      const wtm = new Watermark(watermarkCanvas);
      await image.decode(); // Ensure image is loaded before drawing
      wtm.draw(image.src, {
        text: "Artworkia",
        fontSize: 23,
        fillStyle: `rgba(0, 0, 0, ${opacity})`,
        watermarkHeight: 180,
        watermarkWidth: 280,
      });
    } catch (error) {
      console.error("Error watermarking image:", error);
    }
  };

  if (image.src && Watermark) {
    drawWatermark();
  }

  return canvasToImage(watermarkCanvas);
};

export default WatermarkedImage;
