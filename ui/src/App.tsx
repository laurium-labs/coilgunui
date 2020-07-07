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
          <Text style={{ fontSize: 45, color: 'white' }}>Coil Gun Simulator</Text>
          <div style={{ alignContent: 'center', flexDirection: 'row' }}>
            <div style={{ flexDirection: 'row' }}>
              <Plots />
            </div>
            <Typography style={{ paddingTop: 15, color: 'white' }}>Read about the coil gun simulator <Link
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
// class App extends React.Component {
//   public render() {
//     return (<div className="App">
//       <header className="App-header">
//         <Text style={{ color: "white", paddingBottom: 10 }}>CoilGun</Text>
//         {Main}
//       </header>
//     </div>
//     );
//   }
// }

export default App;
