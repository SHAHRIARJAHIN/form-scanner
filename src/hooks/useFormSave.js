import { supabase } from '../lib/supabaseClient';

export const useFormSave = () => {
  const saveForm = async (formData, imageFile) => {
    try {
      // Step 1: Upload image
      const fileName = `forms/${formData.unique_id}.jpg`;
      const { error: uploadError } = await supabase.storage
        .from('form-images')
        .upload(fileName, imageFile);

      if (uploadError) throw uploadError;

      // Step 2: Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('form-images')
        .getPublicUrl(fileName);

      // Step 3: Save to database
      const { error: dbError } = await supabase
        .from('forms')
        .insert({
          unique_id: formData.unique_id,
          form_data: formData,
          form_image_url: publicUrl,
          status: 'pending',
        });

      if (dbError) throw dbError;
      return true; // Success
    } catch (error) {
      console.error('Save failed:', error);
      return false;
    }
  };

  return { saveForm };
};