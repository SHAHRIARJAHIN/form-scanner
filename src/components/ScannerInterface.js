import { useState, useRef } from 'react';
import { supabase } from '../lib/supabaseClient';
import Webcam from 'react-webcam';
import { processImage, extractText } from '../utils/imageProcessing';

export default function ScannerInterface() {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  };

  const processForm = async () => {
    setIsProcessing(true);
    try {
      // 1. Process image (cropping, enhancement)
      const processedImage = await processImage(imgSrc);
      
      // 2. Extract text via OCR
      const text = await extractText(processedImage);
      
      // 3. Parse form data (simplified)
      const data = {
        name: extractField(text, 'Name'),
        email: extractField(text, 'Email'),
        faculty: extractField(text, 'Faculty'),
        unique_id: generateId()
      };
      
      setFormData(data);
    } finally {
      setIsProcessing(false);
    }
  };

  const saveForm = async () => {
    const { error } = await supabase
      .from('forms')
      .insert([{ 
        ...formData,
        form_image_url: imgSrc,
        status: 'pending'
      }]);
    
    if (!error) {
      alert('Form saved successfully!');
      resetScanner();
    }
  };

  const resetScanner = () => {
    setImgSrc(null);
    setFormData(null);
  };

  return (
    <div className="scanner-container">
      {!imgSrc ? (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'environment' }}
          />
          <button onClick={capture}>Capture Photo</button>
        </>
      ) : (
        <>
          <img src={imgSrc} alt="Captured form" />
          {!formData ? (
            <button onClick={processForm} disabled={isProcessing}>
              {isProcessing ? 'Processing...' : 'Extract Data'}
            </button>
          ) : (
            <div className="form-preview">
              <h3>Extracted Data</h3>
              <p><strong>Name:</strong> {formData.name}</p>
              <p><strong>Email:</strong> {formData.email}</p>
              <p><strong>Faculty:</strong> {formData.faculty}</p>
              <p><strong>ID:</strong> {formData.unique_id}</p>
              <div className="action-buttons">
                <button onClick={saveForm}>Save</button>
                <button onClick={resetScanner}>Rescan</button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Helper functions
function extractField(text, fieldName) {
  const regex = new RegExp(`${fieldName}[:\s]*(.*)`,'i');
  const match = text.match(regex);
  return match ? match[1].trim() : 'Not found';
}

function generateId() {
  return `FORM-${Date.now().toString(36).toUpperCase()}`;
}