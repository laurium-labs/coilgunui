import React from 'react';
import './App.css';
import { Typography } from 'antd'
import Plots from './Plots'
import { Link } from '@material-ui/core';
const { Text } = Typography

function App() {
  return (
    <div className="App">
      <div className="App">
        <header className="App-header">
          <Text style={{ fontSize: 45, color: 'white', marginTop: 30, marginBottom: 0 }}>Coil Gun Simulator</Text>
          <Text style={{ fontSize: 18, color: 'white', marginBottom: 40 }}>Brought to you by Laurium Labs</Text>

          <div style={{ alignContent: 'center', flexDirection: 'row' }}>
            <div style={{ flexDirection: 'row' }}>
              <Plots />
            </div>
            <Typography style={{ paddingTop: 100, paddingBottom: 100, color: 'white' }}>Read about the coil gun simulator <Link
              href={"https://github.com/laurium-labs/CoilGun.jl"}
              target="_blank"
            >
              here
                </Link></Typography>
          </div>
        </header >
      </div >

    </div >

  );
}

export default App;
