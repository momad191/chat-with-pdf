import React from "react";
  
const PDFViewer = ( pdf_url ) => {
    return (
      <iframe
        src={`http://localhost:3000/uploads/Mohammed%20Emad%20/Resume%20_MohammedEmad_AI_Developer.pdf`}
        className="w-full h-full"
      ></iframe>
    );
  };
 

  export default PDFViewer;