// src/components/BatchProcessor.js
import { processForm } from '../utils/ocrPipeline';

const BatchProcessor = () => {
  const [files, setFiles] = useState([]);
  const [progress, setProgress] = useState(0);

  const handleBatchProcess = async () => {
    for (let i = 0; i < files.length; i++) {
      const formData = await processForm(files[i]);
      await saveForm(formData, files[i]);
      setProgress(((i + 1) / files.length) * 100);
    }
  };

  return (
    <div>
      <input 
        type="file" 
        multiple 
        onChange={(e) => setFiles([...e.target.files])} 
      />
      <button onClick={handleBatchProcess}>
        Process {files.length} Forms
      </button>
      {progress > 0 && (
        <progress value={progress} max="100" />
      )}
    </div>
  );
};