// src/utils/export.js
import * as XLSX from 'xlsx';
export const exportToCSV = (forms) => {
    const headers = ['ID', 'Name', 'Email', 'Faculty', 'Status'];
    const csvRows = [];
    
    // Add headers
    csvRows.push(headers.join(','));
    
    // Add data
    forms.forEach(form => {
      const row = [
        form.unique_id,
        `"${form.form_data.name}"`, // Wrap in quotes to handle commas
        form.form_data.email,
        form.form_data.faculty,
        form.status
      ];
      csvRows.push(row.join(','));
    });
  
    // Download
    const csvContent = csvRows.join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'forms_export.csv';
    link.click();
  };
  // src/utils/export.js


export const exportToExcel = (forms) => {
  const worksheet = XLSX.utils.json_to_sheet(
    forms.map(form => ({
      ID: form.unique_id,
      Name: form.form_data.name,
      Email: form.form_data.email,
      Faculty: form.form_data.faculty,
      Status: form.status
    }))
  );
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Forms');
  XLSX.writeFile(workbook, 'forms_export.xlsx');
};