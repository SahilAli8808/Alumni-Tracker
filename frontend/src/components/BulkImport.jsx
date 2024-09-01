import React, { useState } from 'react';
import { Box, Button, Callout, Card, Text } from '@radix-ui/themes';
import { InfoCircledIcon } from '@radix-ui/react-icons';

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
        .then((response) => response.json())
        .then((result) => {
          alert(result.message);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    } else {
      alert('Please select a file to upload.');
    }
  };

  return (
    <>
      <Callout.Root>
        <Callout.Icon>
          <InfoCircledIcon />
        </Callout.Icon>
        <Callout.Text>
          This feature allows you to bulk import alumni data from an Excel file. The file must be in .xlsx or .xls format.
        </Callout.Text>
      </Callout.Root>

      <div className="flex flex-col items-center mt-6 h-screen">
        <Box maxWidth="500px">
          <Card asChild>
            <div className="p-6 border w-full max-w-md">
              <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Bulk Import Alumni Data
              </h1>

              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileChange}
                className="mb-4 w-full p-2 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:border-indigo-500"
              />

              <Button
                onClick={handleFileUpload}
                className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300"
              >
                Upload
              </Button>
            </div>
          </Card>
        </Box>
      </div>
    </>
  );
};

export default BulkImport;
