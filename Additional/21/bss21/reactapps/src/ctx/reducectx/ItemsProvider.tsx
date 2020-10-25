import * as React from "react";

//型定義
type ItemsType = string[];
type ActionType = { index: number };
type ItemsContextType = {
  items: ItemsType;
  deleteItem: React.Dispatch<ActionType>;
};

//Itemsコンテキストを生成してエクスポート
const ItemsContext = React.createContext<ItemsContextType>({
  items: [],
  deleteItem: () => {}
});
export const useItemsContext = () => React.useContext<ItemsContextType>(ItemsContext);

//ItemsコンテキストのReducer関数を定義
const itemsReducer = (items: ItemsType, action: ActionType):string[] => {
  return items.filter((_, i) => i !== action.index);
};

//--------------------
//関数コンポーネント
//--------------------
export const ItemsContextProvider: React.FC = ({children}) => {

  //useReducer()でItemsコンテキストの初期値とReducer関数を紐付ける
  const [items, deleteItem] = React.useReducer(itemsReducer, [
    "DATA-00",
    "DATA-01",
    "DATA-02",
    "DATA-03",
    "DATA-04",
    "DATA-05",
    "DATA-06",
    "DATA-07",
    "DATA-08",
    "DATA-09",
    "DATA-10",
  ]);

  return (
    //Itemsコンテキストを提供可能にする
    <ItemsContext.Provider value={{items, deleteItem}}>
      {children}
    </ItemsContext.Provider>
  );
};
