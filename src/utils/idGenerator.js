// src/utils/idGenerator.js
export const generateFacultyId = (faculty) => {
    const facultyCodes = {
      science: 'SCI',
      engineering: 'ENG',
      arts: 'ART',
    };
    const code = facultyCodes[faculty.toLowerCase()] || 'GEN';
    return `${code}-${generateUniqueId()}`;
  };