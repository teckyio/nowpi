import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="loading">
        <p><i className="fas fa-spinner fa-spin"></i></p>
        <p>載入中</p>
      </div>
    </div>
  );
}

export default App;
