import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography, InputNumber } from 'antd'

const { Text } = Typography
function App() {
  return (
    <div className="App">
      <div className="App">
        <header className="App-header">
          <div>
            <Text>Number of coils</Text>
            <InputNumber></InputNumber>
          </div>
        </header>
      </div>

    </div>
  );
}

export default App;
