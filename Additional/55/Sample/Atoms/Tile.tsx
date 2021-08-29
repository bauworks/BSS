import styled from 'styled-components/native';

//***********************************
// タイル コンポーネント
//***********************************
interface Props {
  bgcolor: string
}
export const Tile = styled.View`
  "width": "20px";
  "height": "20px";
  "border-width": "2px";
  "border-style":"outset";
  "box-sizing": "border-box";
  "display": "table-cell";
`