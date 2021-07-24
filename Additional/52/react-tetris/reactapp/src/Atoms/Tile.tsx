import styled from 'styled-components';
// yarn add styled-components でインストールする
// yarn add -D styled-components @types/styled-components


//***********************************
// タイル コンポーネント
//***********************************
interface Props {
  bgcolor: string
}
export const Tile = styled.div<Props>`
  width: 20px;
  height: 20px;
  border-width: 2px;
  background-color: ${(props:Props) => {return props.bgcolor}};
  border-style:outset;
  box-sizing: border-box;
  display: table-cell;
`