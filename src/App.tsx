import React from 'react';
import './App.css';
import WashList from './components/wash/WashList';

function App() {
  return (
    <div className="App">
      <header className="App-header"> 
        <WashList></WashList>
      </header>
    </div>
  );
}

export default App;
