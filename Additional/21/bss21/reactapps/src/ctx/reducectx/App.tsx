// https://codesandbox.io/s/reactcontext-example-57y7p?file=/src/App.tsx から引用および改訂

import * as React from "react";
import { ItemsContextProvider } from "./ItemsProvider";
import { Title } from "./Title";
import { List } from "./List";

export const App = () => {
  return (
    <ItemsContextProvider>
      <Title title="タイトル" />
      <List />
    </ItemsContextProvider>
  );
};

export default App;