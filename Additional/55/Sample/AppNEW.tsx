import React, { useState, useEffect, useCallback, useMemo } from 'react'
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

interface MainTextProps {
  color: string
}

const MainText = styled.Text<MainTextProps>`
  font-size: 20px;
  text-align: center;
  margin: 10px;
  color: ${(props:MainTextProps) => {return props.color}};
`;

interface TileProps {
  bgcolor: string
}
const Tile = styled.View<TileProps>`
  width: 20px;
  height: 20px;
  border-width: 1px;
/*  border-style:outset;*/
/*  box-sizing: border-box;*/
/*  display: table-cell;*/
  background-color: ${(props:TileProps) => {return props.bgcolor}};
`;


//***********************************
// ブロックのパターン別色設定
//***********************************
const toColor = (code: number) : string => {
  switch (code) {
    case 1:   // The cube tile (block 2x2)
      return "grey";
    case 2:   // The I tile
      return "red";
    case 3:   // The T tile
      return "green";
    case 4:   // The inverse L tile
      return "blue";
    case 5:   // The L tile
      return "orange";
    case 6:   // The Z tile
      return "purple";
    case 7:   // The inverse Z tile
      return "maroon";
    default:  // Space
      return "white";
  };
};

interface Props {}
interface State {}
export default class App extends React.Component<Props, State> {

  // const infos: number[][] = new Array<number[]>(25);
  // for (let i=0; i < infos.length; i++){
  //   infos[i] = new Array<number>(11).fill(0);
  // }
  
  // const [tilesInfo, setTilesInfo] = useState(infos);

  // //***********************************
  // // タイルを並べる(列)
  // //***********************************
  // const tilesRow = (rowInfo: number[]) => (rowInfo.map((info, index) => 
  //   <Tile bgcolor={toColor(info)} key={index}/>
  // ));

  // //***********************************
  // // タイルを並べる(行)
  // //***********************************
  // const tilesAll = tilesInfo.map((rowInfo: number[], index: number) => 
  // <div key={index}>
  //   {tilesRow(rowInfo)}
  // </div>
  // );


  render() {
    return (
      <Container>
        <MainText color="navy">BAUWORKS</MainText>
        <Tile bgcolor="red"></Tile>
      </Container>
    );
  }
}
