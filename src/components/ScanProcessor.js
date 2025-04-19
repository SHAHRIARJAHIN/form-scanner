import { extractText } from '../utils/ocr';
import { parseFormText } from '../utils/formParser';
import { generateUniqueId } from '../utils/idGenerator';

const ScanProcessor = ({ imageFile }) => {
  const [formData, setFormData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const processScan = async () => {
    setIsProcessing(true);
    try {
      // Step 1: OCR Extraction
      const rawText = await extractText(imageFile);
      
      // Step 2: Parse Fields
      const parsedData = parseFormText(rawText);
      parsedData.unique_id = generateUniqueId();
      
      setFormData(parsedData);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <button onClick={processScan} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Extract Text'}
      </button>
      {formData && <FormPreview formData={formData} />}
    </div>
  );
};