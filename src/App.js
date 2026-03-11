import React, { useState } from 'react';

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus('');
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setStatus('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      setStatus('error:Please select a file');
      return;
    }

    if (!email) {
      setStatus('error:Please enter an email address');
      return;
    }

    setLoading(true);
    setStatus('loading:Processing your request...');

    // Simulate API call with delay
    setTimeout(async () => {
      try {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('email', email);

        await fetch('https://api.sales-automator.example/upload', {
          method: 'POST',
          body: formData,
        });

        setStatus('success:File uploaded successfully!');
      } catch (error) {
        setStatus('error:Unable to process request. Backend service unavailable.');
      } finally {
        setLoading(false);
      }
    }, 2000);
  };

  const getStatusMessage = () => {
    if (!status) return null;

    const [type, message] = status.split(':');
    const className = type === 'error' ? 'status-error' : 
                     type === 'success' ? 'status-success' : 
                     'status-loading';

    return <div className={`status-message ${className}`}>{message}</div>;
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Sales Insight Automator</h1>
        <p className="subtitle">Upload your sales data for automated insights</p>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="file-upload">Select File (.csv or .xlsx)</label>
            <input
              id="file-upload"
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              disabled={loading}
            />
            {file && <span className="file-name">{file.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={handleEmailChange}
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Processing...' : 'Submit'}
          </button>
        </form>

        {getStatusMessage()}
      </div>
    </div>
  );
}

export default App;
