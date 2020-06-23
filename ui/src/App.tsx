import React, { useState } from 'react';
import './App.css';
import { Typography, InputNumber, Button, Radio } from 'antd'
import Plots from './Plots'
import Input from './Inputs'
import Column from 'rc-table/lib/sugar/Column';
const { Text } = Typography

function App() {
  const [value, setValue] = useState<boolean>(false)
  return (
    <div className="App">
      <div className="App">
        <header className="App-header">
          <div style={{ alignContent: 'center', flexDirection: 'row' }}>
            {Input()}
            {/* inputs for the coil gun will go here, idealy plots will refresh on value change,
            have defualt values in already to get certain plots, is there any animation?, or at minimum an image? */}
            <div style={{ flexDirection: 'row' }}>
              <Plots />
            </div>
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
