import ScanProcessor from '../components/ScanProcessor';
import { useFormSave } from '../hooks/useFormSave';

const ScanPage = () => {
  const { saveForm } = useFormSave();
  const [imageFile, setImageFile] = useState(null);

  const handleSave = async (formData) => {
    const isSuccess = await saveForm(formData, imageFile);
    if (isSuccess) alert('Form saved successfully!');
  };

  return (
    <div>
      {/* Upload/Camera/Scanner components go here */}
      {imageFile && (
        <ScanProcessor 
          imageFile={imageFile} 
          onSave={handleSave} 
        />
      )}
    </div>
  );
};