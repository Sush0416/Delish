// Required field validation
export const validateRequired = (value, fieldName = 'This field') => {
  if (!value || value.toString().trim() === '') {
    return `${fieldName} is required`;
  }
  return null;
};

// Email validation
export const validateEmail = (email) => {
  if (!email) {
    return 'Email is required';
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return 'Please enter a valid email address';
  }
  
  return null;
};

// Password validation
export const validatePassword = (password) => {
  if (!password) {
    return 'Password is required';
  }
  
  if (password.length < 6) {
    return 'Password must be at least 6 characters long';
  }
  
  // Optional: Add more password strength checks
  if (!/(?=.*[a-z])/.test(password)) {
    return 'Password must contain at least one lowercase letter';
  }
  
  if (!/(?=.*[A-Z])/.test(password)) {
    return 'Password must contain at least one uppercase letter';
  }
  
  if (!/(?=.*\d)/.test(password)) {
    return 'Password must contain at least one number';
  }
  
  return null;
};

// Phone number validation (Indian)
export const validatePhone = (phone) => {
  if (!phone) {
    return 'Phone number is required';
  }
  
  const cleaned = phone.replace(/\D/g, '');
  const phoneRegex = /^[6-9]\d{9}$/;
  
  if (!phoneRegex.test(cleaned)) {
    return 'Please enter a valid Indian phone number';
  }
  
  return null;
};

// Confirm password validation
export const validateConfirmPassword = (password, confirmPassword) => {
  if (!confirmPassword) {
    return 'Please confirm your password';
  }
  
  if (password !== confirmPassword) {
    return 'Passwords do not match';
  }
  
  return null;
};

// Number validation
export const validateNumber = (value, fieldName = 'This field') => {
  if (value === undefined || value === null || value === '') {
    return `${fieldName} is required`;
  }
  
  const num = Number(value);
  if (isNaN(num)) {
    return `${fieldName} must be a valid number`;
  }
  
  return null;
};

// Minimum value validation
export const validateMinValue = (value, min, fieldName = 'Value') => {
  const numError = validateNumber(value, fieldName);
  if (numError) return numError;
  
  if (Number(value) < min) {
    return `${fieldName} must be at least ${min}`;
  }
  
  return null;
};

// Maximum value validation
export const validateMaxValue = (value, max, fieldName = 'Value') => {
  const numError = validateNumber(value, fieldName);
  if (numError) return numError;
  
  if (Number(value) > max) {
    return `${fieldName} must be at most ${max}`;
  }
  
  return null;
};

// Range validation
export const validateRange = (value, min, max, fieldName = 'Value') => {
  const numError = validateNumber(value, fieldName);
  if (numError) return numError;
  
  const num = Number(value);
  if (num < min || num > max) {
    return `${fieldName} must be between ${min} and ${max}`;
  }
  
  return null;
};

// URL validation
export const validateUrl = (url, fieldName = 'URL') => {
  if (!url) {
    return `${fieldName} is required`;
  }
  
  try {
    new URL(url);
    return null;
  } catch {
    return 'Please enter a valid URL';
  }
};

// File validation
export const validateFile = (file, options = {}) => {
  const {
    required = true,
    maxSize = 5 * 1024 * 1024, // 5MB
    allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'],
    fieldName = 'File'
  } = options;

  if (!file) {
    return required ? `${fieldName} is required` : null;
  }

  // Check file type
  if (allowedTypes && !allowedTypes.includes(file.type)) {
    const types = allowedTypes.map(type => type.split('/')[1]).join(', ');
    return `File must be one of: ${types}`;
  }

  // Check file size
  if (file.size > maxSize) {
    const maxSizeMB = maxSize / (1024 * 1024);
    return `File size must be less than ${maxSizeMB}MB`;
  }

  return null;
};

// Array validation
export const validateArray = (array, options = {}) => {
  const {
    required = true,
    minLength = 0,
    maxLength = null,
    fieldName = 'Array'
  } = options;

  if (!array || !Array.isArray(array)) {
    return required ? `${fieldName} is required` : null;
  }

  if (array.length < minLength) {
    return `${fieldName} must have at least ${minLength} item${minLength !== 1 ? 's' : ''}`;
  }

  if (maxLength !== null && array.length > maxLength) {
    return `${fieldName} must have at most ${maxLength} item${maxLength !== 1 ? 's' : ''}`;
  }

  return null;
};

// Object validation
export const validateObject = (obj, fieldName = 'Object') => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) {
    return `${fieldName} is required`;
  }

  if (Object.keys(obj).length === 0) {
    return `${fieldName} cannot be empty`;
  }

  return null;
};

// Custom validation function creator
export const createValidator = (validationFn, errorMessage) => {
  return (value) => {
    return validationFn(value) ? null : errorMessage;
  };
};

// Compose multiple validators
export const composeValidators = (...validators) => {
  return (value) => {
    for (const validator of validators) {
      const error = validator(value);
      if (error) return error;
    }
    return null;
  };
};

// Form validation helper
export const validateForm = (values, validations) => {
  const errors = {};

  Object.keys(validations).forEach(field => {
    const value = values[field];
    const fieldValidations = validations[field];

    if (Array.isArray(fieldValidations)) {
      for (const validator of fieldValidations) {
        const error = validator(value);
        if (error) {
          errors[field] = error;
          break;
        }
      }
    } else if (typeof fieldValidations === 'function') {
      const error = fieldValidations(value);
      if (error) {
        errors[field] = error;
      }
    }
  });

  return errors;
};

// Check if form is valid
export const isFormValid = (errors) => {
  return Object.keys(errors).length === 0;
};

// Common validation patterns
export const commonValidations = {
  required: (fieldName) => (value) => validateRequired(value, fieldName),
  email: validateEmail,
  password: validatePassword,
  phone: validatePhone,
  number: (fieldName) => (value) => validateNumber(value, fieldName),
  min: (min, fieldName) => (value) => validateMinValue(value, min, fieldName),
  max: (max, fieldName) => (value) => validateMaxValue(value, max, fieldName),
  range: (min, max, fieldName) => (value) => validateRange(value, min, max, fieldName)
};