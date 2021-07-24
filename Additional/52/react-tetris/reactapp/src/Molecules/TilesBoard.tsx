import React, { useState, useEffect, useCallback, useMemo } from 'react'
import {Tile} from '../Atoms/Tile';


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

//***********************************
// ブロック種類をランダムに返す
//***********************************
const getRandomBlock = () : number =>   Math.floor(Math.random() * (6+1) +1);

//***********************************
// ブロックの回転をランダムに返す
//***********************************
const getRandomRotate = () : number =>  Math.floor(Math.random() * (3+1));

//***********************************
// ブロックのパターン
//***********************************
const blockPatterns: number[][][][] = [
  [
    // The default square
    [[0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0]],
    [[0, 0], [0, 0], [0, 0], [0, 0]]
  ],
  [
    // The cube tile (block 2x2)
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]],
    [[0, 0], [1, 0], [0, 1], [1, 1]]
  ],
  [
    // The I tile
    [[0, -1], [0, 0], [0, 1], [0, 2]],
    [[-1, 0], [0, 0], [1, 0], [2, 0]],
    [[0, -1], [0, 0], [0, 1], [0, 2]],
    [[-1, 0], [0, 0], [1, 0], [2, 0]]
  ],
  [
    // The T tile
    [[0, 0], [-1, 0], [1, 0], [0, -1]],
    [[0, 0], [1, 0], [0, 1], [0, -1]],
    [[0, 0], [-1, 0], [1, 0], [0, 1]],
    [[0, 0], [-1, 0], [0, 1], [0, -1]]
  ],
  [
    // The inverse L tile
    [[0, 0], [-1, 0], [1, 0], [-1, -1]],
    [[0, 0], [0, 1], [0, -1], [1, -1]],
    [[0, 0], [1, 0], [-1, 0], [1, 1]],
    [[0, 0], [0, 1], [0, -1], [-1, 1]]
  ],
  [
    // The L tile
    [[0, 0], [1, 0], [-1, 0], [1, -1]],
    [[0, 0], [0, 1], [0, -1], [1, 1]],
    [[0, 0], [1, 0], [-1, 0], [-1, 1]],
    [[0, 0], [0, 1], [0, -1], [-1, -1]]
  ],
  [
    // The Z tile
    [[0, 0], [1, 0], [0, -1], [-1, -1]],
    [[0, 0], [1, 0], [0, 1], [1, -1]],
    [[0, 0], [1, 0], [0, -1], [-1, -1]],
    [[0, 0], [1, 0], [0, 1], [1, -1]]
  ],
  [
    // The inverse Z tile
    [[0, 0], [-1, 0], [0, -1], [1, -1]],
    [[0, 0], [0, -1], [1, 0], [1, 1]],
    [[0, 0], [-1, 0], [0, -1], [1, -1]],
    [[0, 0], [0, -1], [1, 0], [1, 1]]
  ]
]

//***********************************
// ブロックを置けるかチェックする
//***********************************
const checkPutBlock = (
  props: putBlockProps,
  allTiles:　number[][]) :boolean => {

    const x = props.x;
    const y = props.y;
    const block = props.block;
    const rotate = props.rotate;
  
    if (
      // ボードを上下にはみ出すタイルがあるか？（配列の上下限に達しないか？）
      y + blockPatterns[block][rotate][0][1] > allTiles.length -1 ||
      y + blockPatterns[block][rotate][1][1] > allTiles.length -1 ||
      y + blockPatterns[block][rotate][2][1] > allTiles.length -1 ||
      y + blockPatterns[block][rotate][3][1] > allTiles.length -1 ||
      y + blockPatterns[block][rotate][0][1] < 0 ||
      y + blockPatterns[block][rotate][1][1] < 0 ||
      y + blockPatterns[block][rotate][2][1] < 0 ||
      y + blockPatterns[block][rotate][3][1] < 0 ||
      // ボードを左右にはみ出すタイルがあるか？（配列の上下限に達しないか？）
      x + blockPatterns[block][rotate][0][0] > allTiles[0].length -1 ||
      x + blockPatterns[block][rotate][1][0] > allTiles[0].length -1 ||
      x + blockPatterns[block][rotate][2][0] > allTiles[0].length -1 ||
      x + blockPatterns[block][rotate][3][0] > allTiles[0].length -1 ||
      x + blockPatterns[block][rotate][0][0] < 0 ||
      x + blockPatterns[block][rotate][1][0] < 0 ||
      x + blockPatterns[block][rotate][2][0] < 0 ||
      x + blockPatterns[block][rotate][3][0] < 0 ||
      // ブロックのセット予定の位置にすでに色付き(≠0)のタイルがあるか？
      allTiles[ y + blockPatterns[block][rotate][0][1] ][ x + blockPatterns[block][rotate][0][0] ] !== 0 ||
      allTiles[ y + blockPatterns[block][rotate][1][1] ][ x + blockPatterns[block][rotate][1][0] ] !== 0 ||
      allTiles[ y + blockPatterns[block][rotate][2][1] ][ x + blockPatterns[block][rotate][2][0] ] !== 0 ||
      allTiles[ y + blockPatterns[block][rotate][3][1] ][ x + blockPatterns[block][rotate][3][0] ] !== 0 ){
        return false;
    }
    return true;
}
//***********************************
// ブロックを指定座標にセットする関数
//***********************************
type putBlockProps = {
  x: number;
  y: number;
  block: number;
  rotate: number;
}
const putBlock = (props: putBlockProps,
                  bfProps: putBlockProps,
                  allTiles:　number[][]) :boolean => {
  const x: number = props.x;
  const y: number = props.y;
  const block: number = props.block;
  const rotate: number = props.rotate;

  const bf_x: number = bfProps.x;
  const bf_y: number = bfProps.y;
  const bf_block: number = bfProps.block;
  const bf_rotate: number = bfProps.rotate;

  if ( bf_x >= 0 ){
    // 前回セットしたブロックをクリアする
    allTiles[ bf_y + blockPatterns[bf_block][bf_rotate][0][1] ][ bf_x + blockPatterns[bf_block][bf_rotate][0][0] ] = 0;
    allTiles[ bf_y + blockPatterns[bf_block][bf_rotate][1][1] ][ bf_x + blockPatterns[bf_block][bf_rotate][1][0] ] = 0;
    allTiles[ bf_y + blockPatterns[bf_block][bf_rotate][2][1] ][ bf_x + blockPatterns[bf_block][bf_rotate][2][0] ] = 0;
    allTiles[ bf_y + blockPatterns[bf_block][bf_rotate][3][1] ][ bf_x + blockPatterns[bf_block][bf_rotate][3][0] ] = 0;

    if ( checkPutBlock(props, allTiles) === false ) {
          // 前回セットしたブロックを元に戻す
          allTiles[ bf_y + blockPatterns[bf_block][bf_rotate][0][1] ][ bf_x + blockPatterns[bf_block][bf_rotate][0][0] ] = bf_block;
          allTiles[ bf_y + blockPatterns[bf_block][bf_rotate][1][1] ][ bf_x + blockPatterns[bf_block][bf_rotate][1][0] ] = bf_block;
          allTiles[ bf_y + blockPatterns[bf_block][bf_rotate][2][1] ][ bf_x + blockPatterns[bf_block][bf_rotate][2][0] ] = bf_block;
          allTiles[ bf_y + blockPatterns[bf_block][bf_rotate][3][1] ][ bf_x + blockPatterns[bf_block][bf_rotate][3][0] ] = bf_block;
          return false;
    }
  }

  // 新しくブロックをセットする
  allTiles[ y + blockPatterns[block][rotate][0][1] ][ x + blockPatterns[block][rotate][0][0] ] = block;
  allTiles[ y + blockPatterns[block][rotate][1][1] ][ x + blockPatterns[block][rotate][1][0] ] = block;
  allTiles[ y + blockPatterns[block][rotate][2][1] ][ x + blockPatterns[block][rotate][2][0] ] = block;
  allTiles[ y + blockPatterns[block][rotate][3][1] ][ x + blockPatterns[block][rotate][3][0] ] = block;

  return true;
}


//***********************************
// タイルボード コンポーネント
//***********************************
type Props = {
  width: number;
  height: number;
}
export const TilesBoard: React.FC<Props> = (props: Props) => {

    //-------------------------------
    // ステータス
    //-------------------------------
    /*
     * 全タイル情報
     */
    const initialTilesInfo = useCallback((props) => {
      const infos: number[][] = new Array<number[]>(props.height);
      for (let i=0; i < infos.length; i++){
        infos[i] = new Array<number>(props.width).fill(0);
      }
      return infos;
    }, []);

    const [tilesInfo, setTilesInfo] = useState<number[][]>(initialTilesInfo(props));


    /*
     * 前回のタイル更新Props
     */
    const [bfProps, setBfProps] = useState<putBlockProps>({
      x:-1,
      y:-1,
      block:getRandomBlock(),
      rotate:getRandomRotate()
    });


    /*
     * ブロックの初期位置
     */
    const firstPos = useMemo(() => [Math.floor(props.width/2), 1], [props.width]);

    /*
     * 次回ブロック位置
     */
    const [nextPos, setNextPos] = useState<number[]>([firstPos[0], firstPos[1]]);


    /*
     * 次回ブロック回転角度
     */
    const [nextRotate, setNextRotate] = useState<number>(0);


    //-------------------------------
    // タイルを並べる(列)
    //-------------------------------
    const tilesRow = (rowInfo: number[]) => (rowInfo.map((info, index) => 
      <Tile bgcolor={toColor(info)} key={index}/>
    ));

    //-------------------------------
    // タイルを並べる(行)
    //-------------------------------
    const tilesAll = tilesInfo.map((rowInfo: number[], index: number) => 
      <div key={index}>
        {tilesRow(rowInfo)}
      </div>
    );


    //-------------------------------
    // イベント処理：キー入力
    //-------------------------------
    const keyDown = useCallback((event: { keyCode: number; }) => {
      // console.log("Key Pressed : " + event.keyCode );
      if (event.keyCode === 32) {         // Space
        setNextRotate((angle: number) => angle === 3 ? 0 : angle + 1);
      }
      else if (event.keyCode === 90) {    // z
        setNextRotate((angle: number) => angle === 3 ? 0 : angle + 1);
      }
      else if (event.keyCode === 88) {    // x
        setNextRotate((angle: number) => angle === 0 ? 3 : angle - 1);
      }
      else if (event.keyCode === 37) {    // Left
        setNextPos((xy: number[]) => [xy[0]-1, xy[1]]);
      }
      else if (event.keyCode === 38) {    // Up
        setNextPos((xy: number[]) => [xy[0], xy[1]-1]);
      }
      else if (event.keyCode === 39) {    // Right
        setNextPos((xy: number[]) => [xy[0]+1, xy[1]]);
      }
      else if (event.keyCode === 40) {    // Down
        setNextPos((xy: number[]) => [xy[0], xy[1]+1]);
      }
    }, []);

    useEffect(() => {
      document.addEventListener("keydown", keyDown, false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    //-------------------------------
    // イベント処理：タイマー
    //-------------------------------
    // ブロック降下
    const downBlock = () => {
      setNextPos((xy: number[]) => [xy[0], xy[1]+1]);
    };


    //-------------------------------
    // ブロック移動メイン
    //-------------------------------
    useEffect(() => {

      let newTilesInfo = tilesInfo;

      // Props編集
      const nextProps :putBlockProps = {
        x: nextPos[0],
        y: nextPos[1],
        block: bfProps.block,
        rotate: nextRotate
      }
    
      // ブロックを次の位置にセットする
      const ret = putBlock(nextProps, bfProps, newTilesInfo);

      if (ret === true) {
        // ブロックの移動が成功の場合、Propsを前回値として保存
        setBfProps(nextProps);
      } else {
        // 下移動で失敗した場合は、次のブロックを出現させる。置けない場合はゲームオーバー
        if (nextProps.y > bfProps.y) {

          // １列揃った行があればその列を削除する
          newTilesInfo = newTilesInfo.filter((rowInfo: number[]) => {
            return !(rowInfo.every((info)=>info !== 0))
          });

          // 削除されて不足した列を挿入
          for (let rows = newTilesInfo.length; rows < tilesInfo.length; rows++) {
            // const infos: number[] = new Array<number>(tilesInfo[0].length).fill(0);
            const infos: number[] = new Array<number>(props.width).fill(0);
            newTilesInfo.unshift(infos);
          }

          bfProps.x = firstPos[0];
          bfProps.y = firstPos[1];
          bfProps.block = getRandomBlock();
          bfProps.rotate = getRandomRotate();

          // ブロックを置けるかチェック
          if (checkPutBlock(bfProps, newTilesInfo)){
            // チェックOK
            setBfProps(bfProps);
            setNextPos([bfProps.x, bfProps.y]);
          } else {
            // チェックNG => ゲームオーバー
            console.log('ゲームオーバー!!!!!!!!');
            clearInterval(timerId);
          }
        } else {
          // その他移動で失敗した場合は、nextPos, nextRotateを前回値に戻す
          setNextPos([bfProps.x, bfProps.y]);
          setNextRotate(bfProps.rotate);
        }

      }

      // タイル情報を更新
      setTilesInfo(newTilesInfo);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextPos, nextRotate]);
  
    //------------------------
    // タイマー処理（ブロック降下）
    //------------------------
    const [timerId, setTimerId] = useState<number>(0);

    useEffect(() => {
      const timerId = window.setInterval(downBlock, 500);
      setTimerId(timerId);
      return () => clearInterval(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    //------------------------
    // スタイル設定
    //------------------------
    // タイルボード
    const tileBoardStyle: React.CSSProperties = {
      display: "table"
    };

    //-------------------------------
    // JSX
    //-------------------------------  
    return (
      <div style={tileBoardStyle}>
        {tilesAll}
      </div>
    )
}
  