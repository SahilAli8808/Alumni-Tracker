import React, { useState } from 'react';

const BulkImport = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      fetch('http://localhost:5000/api/alumni/bulk-import', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(result => {
          alert(result.message);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
    </div>
  );
};

export default BulkImport;
