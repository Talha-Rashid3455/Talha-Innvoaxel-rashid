import React, { useState } from 'react';
import axios from 'axios';

function App() {
  //To manage the states for URL access
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false); 

  //Function handle post API
  const handleSubmit = async () => {
    setLoading(true); 
    setError('');
    try {
      const response = await axios.post('http://localhost:8000/shorten', { url: longUrl });
      setShortUrl(`http://localhost:8000/shorten/${response.data.shortCode}`);
    } 
    catch (error) {
    setError('Error creating short URL. Please check the URL and try again.');
    } finally {
    setLoading(false); 
    }
  };

  // Function   to handle Get API
  const getOriginalUrl = async (shortCode) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8000/shorten/${shortCode}`);
      setLongUrl(response.data.originalurl);
    } 
    catch (error) {
    setError('Error retrieving original URL.');
    } 
    finally {
    setLoading(false);
    }
  };

  // Function to handle PUT  API
  const updateUrl = async (shortCode) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.put(`http://localhost:8000/shorten/${shortCode}`, { url: longUrl });
      setShortUrl(`http://localhost:8000/shorten/${response.data.shortCode}`);
    } 
    catch (error) {
    setError('Error updating URL.');
    } 
    finally {
    setLoading(false);
    }
  };

  // Functn to handle Delete API
  const deleteUrl = async (shortCode) => {
    setLoading(true);
    setError('');
    try {
      await axios.delete(`http://localhost:8000/shorten/${shortCode}`);
      setShortUrl('');
      setLongUrl('');
      alert('Short URL deleted successfully.');
    } 
    catch (error) {
    setError('Error deleting URL.');
    } 
    
    finally {
    setLoading(false);
    }
  };
  //Function to Handle Get API for stats 
  const getStats = async (shortCode) => {
    setLoading(true);
    setError('');
    try {
      const response = await axios.get(`http://localhost:8000/shorten/${shortCode}/stats`);
      alert(`Access count: ${response.data.accessCount}`);
    } 
    catch (error) {
    setError('Error retrieving stats.');
    } 
    
    finally {
    setLoading(false);
    }
  };
  return (
    
    <div className="App p-6 max-w-md mx-auto">
    <h1 className="text-3xl font-bold mb-4 text-center">URL Shortener</h1>
    <p className='text-purple-700 text-center underline text-2xl '> This will be shortening your URL also with other multiple options</p>

      {/* for taking input from user  */}
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        className="border p-2 w-full mb-4 rounded-md" />

      <div className="flex justify-between mb-4">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white py-2 px-4 rounded-md" > Shorten</button>
        <button
          onClick={() => getOriginalUrl(shortUrl)}
          className="bg-green-500 text-white py-2 px-4 rounded-md"> Get Original
        </button>
        </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading && <div className="flex justify-center mb-4">Loading...</div>}

      {/* Show generated  URL */}
      {shortUrl && (
        <div className="bg-gray-100 p-4 rounded-md">
          <p className="font-bold">Shortened URL:</p>
              <a href={shortUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                {shortUrl}
              </a>
        </div>
      )}

      {/* options */}
      <div className="flex justify-between mt-4">
        <button
          onClick={() => updateUrl(shortUrl.split('/').pop())}
          className="bg-yellow-700 text-white py-2 px-4 rounded-md">Update</button>

            <button
        onClick={() => deleteUrl(shortUrl.split('/').pop())}
          className="bg-red-500 text-white py-2 px-4 rounded-md">Delete</button>

    <button
          onClick={() => getStats(shortUrl.split('/').pop())}
          className="bg-purple-800 text-white py-2 px-4 rounded-md">Stats
      </button>
    </div>
    </div>
  );
}
export default App;
