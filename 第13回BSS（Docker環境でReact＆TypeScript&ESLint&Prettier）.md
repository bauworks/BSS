# 第13回BSS（Docker & React ＆ TypeScript & ESLint & Prettier）

日時　：2020年8月26日(水)  
参加者：古川(発表者) ・有川・森  

---
## 今回の趣旨
- Docker Compose で Nodeコンテナを立ち上げ
- React x TypeScript プロジェクトを作成
- ESLint/Prettier設定

## 目次
1. docker-compose.yaml 作成
2. React/TypeScriptのプロジェクトを作成
3. ESLint/Prettier設定
4. VSCode設定(ESLint対応)
5. Hookerを使う(React)
6. サンプルテストを実行(jest)
7. コンテナを追加してPing疎通確認

---
## 1. Nodeコンテナ立ち上げ

```sh
$ mkdir reactype
$ cd reactype
$ vi docker-compose.yaml
```

#### docker-compose.yaml
```yaml
version: "3.8"
services:
  baufront:
    image: node:12.18.3-alpine3.12
    container_name: baufront
    volumes:
      - ./front:/front
    working_dir: /front
    tty: true
    ports:
      - 3000:3000
```

### コンテナ作成
```sh
$ docker-compose up -d
```

### インストール確認
```sh
$ docker-comose logs
```

### Nodeバージョン確認
```sh
$ docker-compose exec baufront sh
/front # node -v
v12.18.3
```

---
## 2. React x TypeScript プロジェクトを作成
```sh
(上からの続き)
/front # yarn create react-app . --template typescript
```

### プロジェクト起動 & 動作確認
```sh
/front # yarn start
(かなり待ちます)
```

### 動作確認
#### http://localhost:3000/
<img src="https://user-images.githubusercontent.com/19363285/91664679-c5a0eb00-eb2b-11ea-9416-7b6ac9453b60.png">

---
## 3. ESLint/Prettier設定
コマンドと今回選択した内容は次の通り。<br>
最後の質問のパッケージを今インストールするかはNOを選択する。
```sh
(上からの続き)
/front # yarn run eslint --init
yarn run v1.22.4
$ /front/node_modules/.bin/eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? React
? Does your project use TypeScript? Yes
? Where does your code run? Browser
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
? What format do you want your config file to be in? JSON
Checking peerDependencies of eslint-config-airbnb@latest
Local ESLint installation not found.
The config that you've selected requires the following dependencies:

eslint-plugin-react@^7.20.0 @typescript-eslint/eslint-plugin@latest eslint-config-airbnb@latest eslint@^5.16.0 || ^6.8.0 || ^7.2.0 eslint-plugin-import@^2.21.2 eslint-plugin-jsx-a11y@^6.3.0 eslint-plugin-react-hooks@^4 || ^3 || ^2.3.0 || ^1.7.0 @typescript-eslint/parser@latest
? Would you like to install them now with npm? No
Successfully created .eslintrc.json file in /front
ESLint was installed locally. We recommend using this local copy instead of your globally-installed copy.
Done in 187.96s.
```

### packageインストール
```sh
$ yarn add -D eslint-config-airbnb
$ yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser
$ yarn add -D prettier eslint-config-prettier eslint-plugin-prettier
```

#### front/.eslintrc.json
※ prettierの記述は必ず最後に書く。
```json
"extends": [
     "airbnb",
+    "eslint:recommended",
+    "plugin:@typescript-eslint/eslint-recommended",
+    "plugin:@typescript-eslint/recommended",
     "plugin:react/recommended",
+    "plugin:prettier/recommended",
+    "prettier/@typescript-eslint",
+    "prettier/react"
],
```


#### front/.prettierrc
```json
{
    "trailingComma": "es5",
    "tabWidth": 2,
    "arrowParens": "always"
}
```


#### front/package.json
```json
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject",
+   "lint": "eslint --ext .ts,.tsx ./src"
  },
- "eslintConfig": {
-   "extends": "react-app"
- },
```

### Lint 実施 & エラー対応
```sh
/front # yarn lint
（たくさんエラー出る）
```

#### front/.eslintrc.json
```json
{
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react/recommended",
        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/react"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "settings": {
        "import/resolver": {
            "node": {
                "paths": ["src"],
                "extensions": [".js", ".jsx", ".ts", ".tsx"]
            }
        }
    },
    "rules": {
        "import/extensions": [
            "error",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ],
        "react/jsx-filename-extension": [
            "error",
            {
                "extensions": [
                    ".jsx",
                    ".tsx"
                ]
            }
        ],
        "spaced-comment": [
            "error",
            "always",
            {
                "markers": [
                    "/ <reference"
                ]
            }
        ],
        "@typescript-eslint/no-use-before-define": [
            "error",
            {
                "variables": false,
                "functions": false
            }
        ],                            
        "no-console": "off"
    }
}
```

#### front/src/serviceWorker.ts
```typescript
+     // eslint-disable-next-line no-param-reassign
      registration.onupdatefound = (): void => {
```
※ 受け取った引数（あるいはそのプロパティ）を上書きしているが、
        serviceWorker.ts の場合は特に問題ないので、その行は無視する。

#### front/src/App.tsx
```typescript
- function App() {
+ const App: React.FC = () => {
```

---
## 4. VSCode設定(ESLint対応)
### ESLintプラグインをインストール
<img src="https://user-images.githubusercontent.com/19363285/91664684-c9cd0880-eb2b-11ea-941e-94fd716a4b3e.png">

#### settings.json
```json
{
  "eslint.nodePath": "./node_modules/eslint",
  "eslint.packageManager": "yarn",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
   },
  "eslint.alwaysShowStatus": true
}
```

---
## 5. Hookerを使う(React)
#### App.tsx
```typescript
import React, * as react from "react";
import logo from "./logo.svg";
import "./App.css";

const App: React.FC = () => {
  const [count, setCount] = react.useState<number>(0);

  const handleIncrement = react.useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  const handleDecrement = react.useCallback(() => {
    setCount((prev) => prev - 1);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <div>{count}</div>
        <button onClick={handleIncrement}>Add</button>
        <button onClick={handleDecrement}>Sub</button>
      </header>
    </div>
  );
};

export default App;
```

### 動作確認
#### http://localhost:3000/
<img src="https://user-images.githubusercontent.com/19363285/91664682-c8034500-eb2b-11ea-9376-1fcb591e8361.png">


---
## 6. サンプルテストを実行(jest)
```sh
/front # yarn test
yarn run v1.22.4
$ react-scripts test
 PASS  src/App.test.tsx (74.13s)
  ✓ renders learn react link (241ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        105.06s
Ran all test suites.
```

---
## 7. コンテナを追加してPing疎通確認
#### docker-compose.yaml
```yaml
version: "3.8"
services:
  baufront:
    image: node:12.18.3-alpine3.12
    container_name: baufront
    volumes:
      - ./front:/front
    working_dir: /front
    tty: true
    ports:
      - 3000:3000
    networks:
      - baunet

  bauserver:
    image: python:3.8.5-alpine3.12
    container_name: bauserver
    volumes: 
      - ./server:/server
    working_dir: /server
    tty: true
    ports:
      - 9999:9999
    networks:
      - baunet

networks:
  baunet:
    driver: bridge

```

### コンテナ立ち上げ
```sh
$ docker-compose up -d
baufront is up-to-date
Starting bauserver ... done
```

### Pingで疎通確認
``` sh
$ docker-compose exec bauserver sh
/server # ping baufront
PING baufront (172.20.0.2): 56 data bytes
64 bytes from 172.20.0.2: seq=0 ttl=64 time=0.292 ms
64 bytes from 172.20.0.2: seq=1 ttl=64 time=0.140 ms
64 bytes from 172.20.0.2: seq=2 ttl=64 time=0.163 ms
64 bytes from 172.20.0.2: seq=3 ttl=64 time=0.276 ms
64 bytes from 172.20.0.2: seq=4 ttl=64 time=0.165 ms
64 bytes from 172.20.0.2: seq=5 ttl=64 time=0.370 ms
^C
--- baufront ping statistics ---
6 packets transmitted, 6 packets received, 0% packet loss
round-trip min/avg/max = 0.140/0.234/0.370 ms
```
