import React, { useState } from 'react';
import WordUrlsList from '../components/WordUrlsList';

const WordExplorerPage = () => {
  const [selectedWord, setSelectedWord] = useState('conspiracy');
  const words = ['conspiracy', 'russia', 'scandal', 'outrage', 'china'];

  return (
    <div className="max-w-7xl mx-auto py-6 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">
        Word Explorer
      </h1>
      
      <div className="mb-4">
        <select 
          value={selectedWord}
          onChange={(e) => setSelectedWord(e.target.value)}
          className="border rounded px-5 py-2"
        >
          {words.map(word => (
            <option key={word} value={word}>{word}</option>
          ))}
        </select>
      </div>
      
      <WordUrlsList word={selectedWord} />
    </div>
  );
};

export default WordExplorerPage;