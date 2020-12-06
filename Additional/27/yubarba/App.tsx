import React from 'react'
import { YubarbaContextProvider } from "./YubarbaContext";
import Serif from './Serif';
import Contract from './Contract';

const App:React.FC = () => {

  const AppStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    height: "600px",
    background: "url(http://www.ghibli.jp/gallery/chihiro016.jpg)",
    backgroundSize: "cover",
  };
  return(
    <div style={AppStyle} >
      <YubarbaContextProvider>
        <Serif/>
        <Contract/>
      </YubarbaContextProvider>
    </div>
  );
}

export default App;