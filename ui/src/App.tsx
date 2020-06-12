import React from 'react';
import './App.css';
import { Typography, InputNumber, Button, Avatar } from 'antd'
import Main from './Main'
const { Text } = Typography

// const apiUrl = "julia/packages/HTTP/BOJmV/src/Servers.jl:273"

// async function getSim() {
//   await fetch(`${apiUrl}`).then((response) => {
//     if (response) {
//       return response.json();
//     }
//   })
// }
// function trees() {
//   return <Text>Trees</Text>
// }
function App() {
  return (
    <div className="App">
      <div className="App">
        <header className="App-header">
          <div>
            <Text>Number of coils</Text>
            <InputNumber></InputNumber>
            <img>
              {Main()}
            </img>
          </div>
        </header>
      </div>

    </div>
  );
}

export default App;
