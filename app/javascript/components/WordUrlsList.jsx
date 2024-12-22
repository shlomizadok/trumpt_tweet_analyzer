import React, { useState, useEffect } from 'react';

const WordUrlsList = ({ word }) => {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`api/word_counts/${word}`)
      .then(response => response.json())
      .then(data => {
        setUrls(data);
        setLoading(false);
      });
  }, [word]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-4">URLs mentioning "{word}"</h2>
      <div className="space-y-4">
        {urls.map((item, index) => (
          <div key={index} className="border-b pb-2">
            <a href={item.url} 
               target="_blank" 
               rel="noopener noreferrer"
               className="text-blue-600 hover:text-blue-800">
              {item.url}
            </a>
            <span className="ml-2 text-gray-600">
              (mentioned {item.count} times)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WordUrlsList;