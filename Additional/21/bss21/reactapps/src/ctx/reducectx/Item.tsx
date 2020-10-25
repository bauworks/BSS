import React from "react";
import { useItemsContext } from "./ItemsProvider";

type Props = {
  data: string;
  index: number;
};

export const Item = (props: Props) => {
  const { data, index } = props;
  const { deleteItem } = useItemsContext();

  const clickHandler = () => deleteItem({ index });

  return (
    <div onClick={clickHandler}>
      Item({index}) : {data} 
    </div>
  );
};
