import React from 'react'
import { YubarbaContext } from "./YubarbaContext";

const Serif:React.FC = () => {

  const style = {
    margin: "20px",
    padding: "5px",
    backgroundColor: "rgba(255,255,255,0.7)",
    border: "5px solid rgba(0,0,0,0.4)",
    backdropFilter: "blur(5px)",
  };

  //const { serif } = useYubarbaContext();
  const { serif } = React.useContext(YubarbaContext);
  const formated = serif.split('\n').map((str, index) => (
    <React.Fragment key={index}>{str}<br /></React.Fragment>
  ))
  return(
    <div style={style}>
      {formated}
    </div>
  );
}

export default Serif;