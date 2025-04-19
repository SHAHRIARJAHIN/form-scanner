import { createWorker } from 'tesseract.js';

export const extractText = async (imageFile, language = 'eng+ben') => {
  const worker = await createWorker({
    logger: (m) => console.log(m), // Optional: Log progress
  });

  try {
    // Load languages (English + Bengali)
    await worker.loadLanguage(language);
    await worker.initialize(language);

    // Process image
    const { data } = await worker.recognize(imageFile);
    return data.text;
  } finally {
    await worker.terminate(); // Cleanup
  }
};