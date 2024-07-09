import React from 'react';
import PDFViewer from './PDFViewer'; // Adjust the path based on your file structure

const App = () => {
    const pdfUrl = '/path/to/your/pdf/nhoem.pdf'; // Replace with your actual PDF URL or path

    return (
        <div>
            <PDFViewer pdfUrl={pdfUrl} />
        </div>
    );
};

export default App;
