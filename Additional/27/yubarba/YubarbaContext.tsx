import * as React from "react";


//--------------------------------
// コンテキストの生成 & エクスポート
//--------------------------------
// コンテキストの型定義
type YubarbaContextType = {
  serif: string;
  requestYubarba: React.Dispatch<Action>;
};
// createContext()のためのダミーオブジェクト
const dummy:YubarbaContextType = {
  serif: "",
  requestYubarba: () => {}
}
// 生成とエクスポート
export const YubarbaContext = React.createContext<YubarbaContextType>(dummy);


//--------------------------------
// Reducer定義
//--------------------------------
type State = string;
type Action = { type: string, value: string };
const serifReducer = (state: State, action: Action) => {
  if (action.type === "signed" && action.value !== "") {
    // const newName = action.value.substr(Math.floor(Math.random() * action.value.length), 1);
    const randamIndex = Math.round(Math.random() * (Array.from(action.value).length - 1));
    const newName = Array.from(action.value)[randamIndex];    
    return "フン。" + action.value + "というのかい。\n贅沢な名だねぇ。\n今からお前の名前は" + newName + "だ。\nいいかい、" + newName + "だよ。\n分かったら返事をするんだ、" + newName + "!!";
  }
  return "サインしろって言っただろ!!";
};


//--------------------------------------------
// 関数コンポーネント：SerifContextのプロパイダを返す
//--------------------------------------------
export const YubarbaContextProvider: React.FC = ({ children }) => {

  // useReducer：コンテキスト実体とコンテキスト編集関数を取得
  const [serif, requestYubarba] = React.useReducer(serifReducer, "契約書だよ。\nそこに名前を書きな。");

  return (
    // SerifContextをプロバイド
    <YubarbaContext.Provider value={{ serif, requestYubarba }}>
      {children}
    </YubarbaContext.Provider>
  );
};

