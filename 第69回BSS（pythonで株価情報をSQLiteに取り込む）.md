# 第69回BSS（pythonで株価情報をSQLiteに取り込む）

日時　：2022年 12月12日(月)  
参加者：古川(発表者)・有川・森

---
***今回の趣旨***
* SQLiteにテーブル作成(python)
* Pythonで株価取得
* 銘柄をスクリーニング
  
***目次***
- [第69回BSS（pythonで株価情報をSQLiteに取り込む）](#第69回bsspythonで株価情報をsqliteに取り込む)
  - [環境](#環境)
  - [1. DBの準備](#1-dbの準備)
    - [1.1 DB構成](#11-db構成)
      - [1.1.1 DB作成](#111-db作成)
      - [1.1.2 TSE（東証株価）](#112-tse東証株価)
      - [1.1.3 CODE（証券コード）](#113-code証券コード)
  - [2. 株価取得（python）](#2-株価取得python)
    - [2.1 銘柄一覧取得](#21-銘柄一覧取得)
    - [2.2 株価取得](#22-株価取得)
    - [2.3 取得した株価をDBに登録](#23-取得した株価をdbに登録)
    - [2.4 スクリプト実行](#24-スクリプト実行)
  - [3. 銘柄のスクリーニング（SQL）](#3-銘柄のスクリーニングsql)
  - [４. 参考サイト](#４-参考サイト)


## 環境
- macOS Ventura 13.0.1

## 1. DBの準備
### 1.1 DB構成
- DB名 : STOCK_JP
- テーブル : TSE, CODE

※テーブルを作成し、CODEに証券コードをインポート（一部除去）したSQLiteのDBファイルをAdditionalに格納しています。


#### 1.1.1 DB作成
```py
$ python
>>> import sqlite3
>>> conn = sqlite3.connect('STOCK_JP.db')
>>> conn.close()
>>> quit
```


#### 1.1.2 TSE（東証株価）
|No|論理名|カラム名|TYPE|PK|
|:--|:--|:--|:--|:--|
|1|株価コード|code|INTEGER|●|
|2|日付|date|TEXT|●|
|3|高値|high|REAL||
|4|安値|low|REAL||
|5|始値|open|REAL||
|6|終値|close|REAL||
|7|出来高|volume|INTEGER||
|8|調整後終値|adj_close|REAL||

```py
>>> import sqlite3
>>> conn = sqlite3.connect('STOCK_JP.db')
>>> cur = conn.cursor()
>>> cur.execute('create table TSE(code INTEGER, date TEXT, high REAL, low REAL, open REAL, close REAL, volume INTEGER, adj_close REAL,  PRIMARY KEY(code, date))')
>>> conn.close()
```
#### 1.1.3 CODE（証券コード）
|No|論理名|カラム名|TYPE|PK|
|:--|:--|:--|:--|:--|
|1|証券コード|code|INTEGER|●|
|2|銘柄名|name|TEXT||

```py
>>> import sqlite3
>>> conn = sqlite3.connect('STOCK_JP.db')
>>> cur = conn.cursor()
>>> cur.execute('create table CODE(code INTEGER, name TEXT,  PRIMARY KEY(code))')
>>> conn.close()
```

※データは東証のサイトからEXCELファイルをダウンロードして、CSVに加工しDBeaverでインポート

[JPX-その他統計資料-東証上場銘柄一覧](https://www.jpx.co.jp/markets/statistics-equities/misc/01.html)

## 2. 株価取得（python）
### 2.1 銘柄一覧取得
```py
sql = ""
sql += f"select distinct code \n"
sql += f"  from CODE \n"
sql += f" where code between {fromCode} and {toCode} \n"
sql += f" order by code"
code_list = get_code_list(sql)

def get_code_list(sql):
    # DBオープン
    conn = sqlite3.connect(dbname)

    # SQL実行
    cur = conn.cursor()
    cur.execute(sql)
    code_list = cur.fetchall()

    # DBクローズ
    conn.close()

    return code_list
```
### 2.2 株価取得
```py
dfs = []
try:
    time.sleep(0.5)     # 連続して取得する際は少し間を空ける
    df = pdr.data.DataReader(str(code) + ".T", data_source='yahoo', start=from_date,end=to_date)
    dfs.append(df)
except:
    return None
```

### 2.3 取得した株価をDBに登録
```py
# DBオープン
conn = sqlite3.connect(dbname)
cur = conn.cursor()
#SQL作成
cur = conn.cursor()
sql = 'insert into TSE(code, date, high, low, open, close, volume,adj_close) values(?,?,?,?,?,?,?,?)'
param = [
    row['Code'],
    f'{index:%Y-%m-%d}',
    row['High'],
    row['Low'],
    row['Open'],
    row['Close'],
    row['Volume'],
    row['Adj Close']
    ]
#SQL実行
try:
    cur.execute(sql, param)
    conn.commit()
    print(str(code) + " Success." + str(param))
except:
    print(str(code) + " SQL Error." + str(param))
# DBクローズ
conn.close()
```

### 2.4 スクリプト実行

■使い方
```sh
getstock.py From-code To-code from-Date(YYYY-MM-DD) [to-Date(YYYY-MM-DD)]
```

■実行例
```sh
$ python getstock.py 1300 1310 2022-06-01 2022-06-10;
1301 SQL Success.[1301.0, '2022-06-01', 3395.0, 3325.0, 3325.0, 3395.0, 14600.0, 3395.0]
1301 SQL Success.[1301.0, '2022-06-02', 3375.0, 3345.0, 3375.0, 3370.0, 9300.0, 3370.0]
1301 SQL Success.[1301.0, '2022-06-03', 3375.0, 3350.0, 3370.0, 3365.0, 10800.0, 3365.0]
1301 SQL Success.[1301.0, '2022-06-06', 3380.0, 3340.0, 3340.0, 3370.0, 8600.0, 3370.0]
 :
```


## 3. 銘柄のスクリーニング（SQL）
例として挙げます。あとはヨシナに。。。
```sql
-- 陽線
-- 本日終値がこの半年間MAXの98%以上
-- 本日出来高200,000以上
-- 本日出来高が前日また前々日の2倍以上
-- 株価500円以上
with max_price as (
select code, max(adj_close) as max_close
  from TSE
 where date < :today
 group by code
),
yesterday as (
select code, volume, adj_close 
  from TSE
 where date = (select max(date) from TSE where date < :today)
),
before_2days as (
select code, volume, adj_close 
  from TSE
 where date = (select max(date) from TSE where date < (
                    select max(date) from TSE where date < :today))
)
select TSE.code as 'コード',
       CODE.name as '銘柄',
       TSE.adj_close as '終値',
       round((TSE.adj_close - yesterday.adj_close) / yesterday.adj_close * 100, 2)  as '上昇率(%)',
       TSE.volume as '出来高',
       round((TSE.volume) / cast(yesterday.volume as real) * 100, 2) as '1日前出来高比(%)',
       round((TSE.volume) / cast(before_2days.volume as real) * 100, 2) as '2日前出来高比(%)'       
  from TSE
 inner join code on TSE.code = code.code
 inner join max_price on TSE.code = max_price.code 
 inner join yesterday on TSE.code = yesterday.code
 inner join before_2days on TSE.code = before_2days.code
 where TSE.adj_close > TSE.open						-- 陽線
   and TSE.adj_close > max_price.max_close * 0.98	-- 本日終値がこの半年間MAXの98%以上
   and TSE.volume > 200000							-- 本日出来高200,000以上
   and (TSE.volume > yesterday.volume * 2			-- 本日出来高が前日の2倍以上
     or TSE.volume > before_2days.volume * 2)		-- 本日出来高が前々日の2倍以上
   and TSE.adj_close >= 500							-- 株価500円以上
   and TSE.date = :today
 order by 1
;
```

## ４. 参考サイト
- [【株式投資】全銘柄の株価を一括リスト化【Python】](https://retire-early40.com/%e3%80%90%e6%a0%aa%e5%bc%8f%e6%8a%95%e8%b3%87%e3%80%91%e5%85%a8%e9%8a%98%e6%9f%84%e3%81%ae%e6%a0%aa%e4%be%a1%e3%82%92%e4%b8%80%e6%8b%ac%e3%83%aa%e3%82%b9%e3%83%88%e5%8c%96%e3%80%90python%e3%80%91/2/)
- [pythonで取得した株価CSVをSQLiteに格納する](https://megane-sensei.com/622/?amp=1)
