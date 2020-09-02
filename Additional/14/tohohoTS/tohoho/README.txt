#環境作成
$ npm init
$ npm install typescript
$ echo export PATH=\$PATH:`pwd`/node_modules/.bin >> ~/.bashrc
$ source ~/.bashrc
$ tsc --version

#コンパイル
$ tsc sample.ts

#実行
$ node sample.js
