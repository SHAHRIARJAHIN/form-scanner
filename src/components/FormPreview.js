import { validateFields } from '../utils/validation';

const FormPreview = ({ formData, onSave }) => {
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    const validationErrors = validateFields(formData);
    if (Object.keys(validationErrors).length === 0) {
      onSave(formData); // Proceed to save
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="form-preview">
      <div className="form-field">
        <label>Name:</label>
        <input value={formData.name || ''} readOnly />
        {errors.name && <span className="error">{errors.name}</span>}
      </div>

      <div className="form-field">
        <label>Email:</label>
        <input value={formData.email || ''} readOnly />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>

      {/* Add other fields... */}

      <button onClick={handleSave}>Save Form</button>
    </div>
  );
};