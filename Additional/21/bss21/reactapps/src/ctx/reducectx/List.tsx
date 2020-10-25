import React from "react";

import { Item } from "./Item";
import { useItemsContext } from "./ItemsProvider";

export const List = () => {
  const { items } = useItemsContext();

  return (
    <div>
      {items.map((o, index) => (
        <Item data={o} index={index} />
      ))}
    </div>
  );
};
