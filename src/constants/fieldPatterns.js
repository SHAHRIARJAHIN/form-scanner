// src/constants/fieldPatterns.js
export const FIELD_PATTERNS = {
    name: /Name[:]?\s*([A-Za-z\s]+)/i,
    yearOfStudy: /Year of Study[:]?\s*([1-4])(?:st|nd|rd|th)?/i,
    faculty: /Faculty[:]?\s*([A-Za-z\s]+)/i,
    email: /Email[:]?\s*([^\s@]+@[^\s@]+\.[^\s@]+)/i,
    mobile: /Mobile[:]?\s*(\+?[0-9\s-]{10,15})/i,
    // Add more fields...
  };