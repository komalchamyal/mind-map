import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

const Main = () => {
  const [headers, setHeaders] = useState([]);
  const [importClicked, setImportClicked] = useState(false);

  useEffect(() => {
    const fileInput = document.getElementById('fileInput');

    fileInput.addEventListener('change', function (event) {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const content = e.target.result;
          const lines = content.split('\n');
          const newHeaders = lines[0].split(',');

          setHeaders(newHeaders);
        };
        reader.readAsText(file);
      }
    });

    window.removeTag = function (tag, name) {
      tag.remove();
      let newHeaders = headers.filter(item => item !== name);
      setHeaders(newHeaders)
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty dependency array ensures this effect runs once when the component mounts


const handleImportClick = () => {
  setImportClicked(!importClicked);
};

const removeTag = (name) => {
  let newHeaders = headers.filter((item) => item !== name);
  setHeaders(newHeaders);
};
return (
  <React.StrictMode>
    <div className='importbox'>
      <h2>Step 2</h2>
      {headers.map((header) => (
        <div key={header} className="tag" onClick={() => removeTag(header)}>
          {header}
          <span className="close-btn" onClick={() => removeTag(header)}>
            ×
          </span>
        </div>
      ))}
      <button onClick={handleImportClick}>Import Tags</button>
    </div>
    {importClicked && <App key={importClicked} headers={headers} />}
  

  </React.StrictMode>
);
};


ReactDOM.createRoot(document.getElementById('root')).render(<Main />);

