import React from 'react'
import { YubarbaContext } from "./YubarbaContext";

const Contract:React.FC = () => {

  const { requestYubarba } = React.useContext(YubarbaContext);


  const [sign, setSign] = React.useState<string>("");
  const handleSign = (event:any) => {
    setSign(event.target.value);
  }

  const handlePushButton = () => {
    requestYubarba({type: "signed", value: sign})
  }

  // 全体のスタイル
  const style = {
    alignSelf: "flex-end",
    margin: "20px",
    padding: "15px",
    backgroundColor: "#ffffff",
  };

  // 「契約書」のスタイル
  const titleStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "5em",
  };

  // 署名入力欄のスタイル
  const signStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    width: "16em",
  };


  return(
    <div style={style}>
      <p style={titleStyle}><b><u>契 約 書</u></b></p>
      <p>乙在甲的指导下在这家温泉酒店工作。</p>
      <p style={signStyle}>
        甲：温泉旅馆老板 湯婆婆<br/>
        乙：<input type="text" name="sign" value={sign} onChange={handleSign} />
        <button type="button" onClick={handlePushButton}>
        印
        </button>
      </p>
    </div>
  );
}

export default Contract;