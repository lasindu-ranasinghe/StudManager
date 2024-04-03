import React from 'react'
import Table from "../../Components/Table/LogsTable"

export default function LogPage() {

  const handleDownload = () => {
    // Fetch the .log file
    fetch('http://localhost:8080/api/courses/logs')
      .then(response => response.text()) // Read the content as text
      .then(logContent => {
        // Convert .log content to .txt format (if needed)
        const txtContent = logContent.replace(/\r?\n/g, '\r\n'); // Convert line endings if necessary

        // Create a Blob with the converted text content
        const blob = new Blob([txtContent], { type: 'text/plain' });

        // Create a temporary URL for the blob
        const url = window.URL.createObjectURL(blob);

        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = url;
        a.download = 'your-file.txt'; // Set the filename for the downloaded file
        document.body.appendChild(a);

        // Trigger the click event on the anchor element to start the download
        a.click();

        // Cleanup
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        console.error('Error downloading file:', error);
        // Handle error
      });
  };

  const currentDate = new Date();
  return (
    <div style={{marginTop:"50px"}}>
      <h1>VIEW LOGS</h1>
      <span>{currentDate.toDateString()}</span>
      <span>Download Log file :</span>
      <button onClick={handleDownload}>Download .txt File</button>
    </div>
  )
}
