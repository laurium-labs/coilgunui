import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Typography, InputNumber, Button } from 'antd'

const { Text } = Typography

const apiUrl = "http://localhost:8888/server/4/5?narg1=6&narg2=4"

async function getSim() {
  await fetch(`${apiUrl}/params`).then((response) => {
    return response.json();
  })
}
function App() {
  return (
    <div className="App">
      <div className="App">
        <header className="App-header">
          <div>
            <Text>Number of coils</Text>
            <InputNumber></InputNumber>
            <Button title="Graph" onClick={() => {
              getSim()
            }} />
          </div>
        </header>
      </div>

    </div>
  );
}

export default App;
