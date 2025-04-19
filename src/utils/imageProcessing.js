// src/utils/imageProcessing.js

// Tesseract.js Text Extraction
import { createWorker } from 'tesseract.js';

/**
 * Loads OpenCV.js dynamically if not already loaded
 * @returns {Promise<void>}
 */
async function loadOpenCV() {
  if (window.cv) return;

  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://docs.opencv.org/4.5.5/opencv.js';
    script.async = true;
    script.onload = () => {
      // Wait for OpenCV to fully initialize
      const checkReady = setInterval(() => {
        if (window.cv?.getBuildInformation) {
          clearInterval(checkReady);
          console.log('OpenCV.js ready:', window.cv.getBuildInformation());
          resolve();
        }
      }, 100);
    };
    document.body.appendChild(script);
  });
}

/**
 * Processes an image (cropping, enhancement) using OpenCV.js
 * @param {string} imageSrc - Base64 or URL of the image
 * @returns {Promise<string>} - Processed image as base64
 */
export const processImage = async (imageSrc) => {
  try {
    await loadOpenCV();
    const cv = window.cv;

    return new Promise((resolve) => {
      const img = new Image();
      img.src = imageSrc;
      img.onload = () => {
        // Create OpenCV Mat from image
        const src = cv.imread(img);
        
        // Convert to grayscale
        const gray = new cv.Mat();
        cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
        
        // Apply adaptive threshold
        const threshold = new cv.Mat();
        cv.adaptiveThreshold(
          gray, 
          threshold, 
          255, 
          cv.ADAPTIVE_THRESH_GAUSSIAN_C, 
          cv.THRESH_BINARY, 
          11, 
          2
        );
        
        // Find contours
        const contours = new cv.MatVector();
        const hierarchy = new cv.Mat();
        cv.findContours(
          threshold, 
          contours, 
          hierarchy, 
          cv.RETR_EXTERNAL, 
          cv.CHAIN_APPROX_SIMPLE
        );
        
        // Find largest contour (assumed to be document)
        let maxArea = 0;
        let bestContour = null;
        for (let i = 0; i < contours.size(); i++) {
          const contour = contours.get(i);
          const area = cv.contourArea(contour);
          if (area > maxArea) {
            maxArea = area;
            bestContour = contour;
          }
        }

        let result = src;
        if (bestContour) {
          // Apply perspective transform if document found
          const perimeter = cv.arcLength(bestContour, true);
          const approx = new cv.Mat();
          cv.approxPolyDP(bestContour, approx, 0.02 * perimeter, true);
          
          if (approx.rows === 4) {
            const srcPoints = cv.matFromArray(4, 1, cv.CV_32FC2, approx.data32F);
            const dstPoints = cv.matFromArray(4, 1, cv.CV_32FC2, [
              0, 0, 500, 0, 500, 700, 0, 700
            ]);
            const perspectiveMatrix = cv.getPerspectiveTransform(srcPoints, dstPoints);
            const warped = new cv.Mat();
            cv.warpPerspective(
              src, 
              warped, 
              perspectiveMatrix, 
              new cv.Size(500, 700)
            );
            result = warped;
          }
        }

        // Convert back to image
        const processedImage = new Image();
        cv.imshow('tempCanvas', result);
        const canvas = document.getElementById('tempCanvas');
        const processedImageSrc = canvas.toDataURL('image/jpeg');
        
        // Cleanup
        src.delete();
        gray.delete();
        threshold.delete();
        contours.delete();
        hierarchy.delete();
        
        resolve(processedImageSrc);
      };
    });
  } catch (error) {
    console.error('Image processing failed:', error);
    return imageSrc; // Return original if processing fails
  }
};

/**
 * Extracts text from an image using Tesseract.js
 * @param {string} image - Image URL or base64
 * @param {string} [language='eng+ben'] - Languages for OCR
 * @returns {Promise<string>} - Extracted text
 */
export const extractText = async (image, language = 'eng+ben') => {
  const worker = await createWorker({
    logger: (m) => console.log(m.status),
  });

  try {
    await worker.loadLanguage(language);
    await worker.initialize(language);
    const { data } = await worker.recognize(image);
    return data.text;
  } finally {
    await worker.terminate();
  }
};