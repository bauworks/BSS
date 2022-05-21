let handpose;
let video;
let predictions = [];

//-------------------------------------
// セットアップ：最初の一回だけ実行する
//-------------------------------------
function setup() {
  //キャンバス作成
  createCanvas(640, 480);

  //p5キャプチャオブジェクト作成
  video = createCapture(VIDEO);
  video.size(width, height);

  //ハンドポーズ検出オブジェクト作成
  handpose = ml5.handpose(video, modelReady);

  //ハンドポーズ検出イベント登録
  handpose.on("predict", results => {
    predictions = results;
  });

  // Hide the video element, and just show the canvas
  video.hide();
  
  //p5のストローク無効化
  noStroke();
}

//-------------------------------------
//ハンドポーズ検出オブジェクト作成時のイベント関数
//-------------------------------------
function modelReady() {
  console.log("Model ready!");
}

// p5描画：1フレーム毎に実行
function draw() {
  //キャプチャイメージ描画
  image(video, 0, 0, width, height);
  
  //ピクセルデータ読込み
  video.loadPixels();

  //モザイク描画
  drawMosaic();
}

//-------------------------------------
// 中指先端にモザイク描画
//-------------------------------------
function drawMosaic() {
  const size = 80;

  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    //中指の先端が第一関節より上にあれば描画する（Y座標が小さければ上）
    if (prediction.annotations.middleFinger[3][1] < prediction.annotations.middleFinger[2][1]) {
      const x = prediction.annotations.middleFinger[3][0] - (size / 2);
      const y = prediction.annotations.middleFinger[3][1] - (size / 2);

      fill(colorAt(video.pixels, x, y));
      rect(x, y, size, size);
    }
  }
}

//-------------------------------------
//塗り潰し
//-------------------------------------
function colorAt(pixArray, x, y) {
  let idx = 4 * int(y * width + x);
  return [pixArray[idx],
    pixArray[idx + 1],
    pixArray[idx + 2],
    pixArray[idx + 3]
  ];
}
