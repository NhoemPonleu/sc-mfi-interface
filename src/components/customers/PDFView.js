import React from 'react';
import PDFViewer from './PDFViewer'; // Adjust the path to your PDFViewer component

const ViewHello = () => {
  // Use forward slashes (/) or double backslashes (\\) in the path
  const pdfUrl = 'https://www.nbc.gov.kh/download_files/publication/annual_rep_eng/NBC%20Annual%20Report%202023%20Eng.pdf'; // Replace with your actual PDF file URL

  return (
    <div>
      <h2>View Hello World</h2>
      <PDFViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default ViewHello;
