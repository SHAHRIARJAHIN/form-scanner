// src/utils/validation.js
export const validateFields = (fields) => {
    const errors = {};
  
    if (!fields.name) errors.name = "Name is required";
    if (!fields.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
      errors.email = "Invalid email";
    }
    if (!fields.mobile || !/^\+?[0-9\s-]{10,15}$/.test(fields.mobile)) {
      errors.mobile = "Invalid phone number";
    }
    // Add more validations...
  
    return errors;
  };