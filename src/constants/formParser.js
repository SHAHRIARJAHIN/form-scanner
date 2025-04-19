// src/utils/formParser.js
import { FIELD_PATTERNS } from '../constants/fieldPatterns';

export const parseFormText = (text) => {
  const fields = {};

  for (const [key, regex] of Object.entries(FIELD_PATTERNS)) {
    const match = text.match(regex);
    fields[key] = match ? match[1].trim() : null;
  }

  return fields;
};