// https://qiita.com/seira/items/fccdf4e73c59c491558d から引用、改訂

import React, {createContext, useState} from 'react'
import {CompA} from './CompA'

//UserContextとHobbyContextを作成
type UserContextType = {
  name: string;
  age: number;
};
export const UserContext = createContext<UserContextType>({} as UserContextType);
export const HobbyContext = createContext<string>("Default");


//------------------
// 関数コンポーネント
//------------------
export const Context:React.FC = () => {

  //useStateを使ってUserContextの初期値作成
  //（↓setUser未使用ワーニングの回避）
  // eslint-disable-next-line
  const [user, setUser] = useState<UserContextType>({
    name: '山田太郎',
    age: 22
  })

  //useStateを使ってhobbyを作成
  //const [hobby, setHobby] = useState('柔道')

  return (
    <div>
      <UserContext.Provider value={user}>
        <HobbyContext.Provider value="野球">
          <CompA/>
        </HobbyContext.Provider>
      </UserContext.Provider>
    </div>
  )
}
