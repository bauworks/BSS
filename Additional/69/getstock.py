#各種ライブラリを宣言
import sys
import pandas as pd
import pandas_datareader as pdr
import time
import sqlite3

dbname = 'STOCK_JP.db'

#---------------------------------------
# 株価を取得
#---------------------------------------
def get_stockprice(code, from_date, to_date):
    #print ("code[" + str(code) + "] from_date[" + from_date + "] to_date[" + to_date + "]")
    dfs = []
    try:
        # スリープ
        time.sleep(0.5)
 
        df = pdr.data.DataReader(str(code) + ".T", data_source='yahoo', start=from_date, end=to_date)
        dfs.append(df)

        if dfs == None:
            print(str(code) + " None.")

    except:
        # エラーが出たらとばす
        print(str(code) + " : Data read Error.")
        return None

    return dfs


#---------------------------------------
# 取得した株価データの体裁を整える。
#---------------------------------------
def make_table_data(dfs, code):
    data = pd.concat(dfs,axis=0)
    data['Code'] = code
    data = data.astype({'High':'float','Low':'float','Open':'float','Close':'float','Volume':'int','Adj Close':'float', 'Code':'int'})
    return data


#---------------------------------------
# 証券コード一覧を取得
#---------------------------------------
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


#---------------------------------------
# 株価データをDBに登録
#---------------------------------------
def register_stockprice(code_list, fromDate, toDate):
    ### LOOP:証券コード一覧 ###
    for code_rec in code_list: 

        #---------------------------------------
        # 株価データ取得(データフレーム)
        #---------------------------------------
        code = code_rec[0]
        dfs = get_stockprice(code, fromDate, toDate)

        if dfs == None:
            #株価が取得出来ていなければスキップ
            continue

        # 株価データをテーブルの型に合わせる
        data = make_table_data(dfs, code)

        ### LOOP:株価データ件数 ###
        for index, row in data.iterrows():

            # 範囲外のデータならスキップ
            if f'{index:%Y-%m-%d}' < fromDate or f'{index:%Y-%m-%d}' > toDate:
                print(f'{code} Skip. [{index}]')
                continue

            # DBオープン
            conn = sqlite3.connect(dbname)
            cur = conn.cursor()

            #SQL作成
            cur = conn.cursor()
            sql = 'insert into TSE(code, date, high, low, open, close, volume, adj_close) values(?,?,?,?,?,?,?,?)'
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




##############################################
### MAIN START ###############################
##############################################
# 引数のチェックと取得
if(len(sys.argv) <= 2+1):
    print(f'Usage: {sys.argv[0]} From-code To-code from-Date(YYYY-MM-DD) [to-Date(YYYY-MM-DD)]')
    sys.exit()

fromCode = sys.argv[1]
toCode = sys.argv[2]
fromDate = sys.argv[3]

# 引数が４つあるときは日付を範囲指定で検索
if(len(sys.argv) == 4+1):
    toDate = sys.argv[4]
else:
    toDate = sys.argv[3]

print(f'Date: [ {fromDate} ]-[ {toDate} ]')
print(f'Code: [ {fromCode} ]-[ {toCode} ]')


# コードリスト取得
sql = ""
sql += f"select distinct code \n"
sql += f"  from CODE \n"
sql += f" where code between {fromCode} and {toCode} \n"
if(len(sys.argv) == 3+1):
       sql += f"   and code not in (select code from TSE where date = '{fromDate}') \n"
sql += f" order by code"

print(sql)
code_list = get_code_list(sql)


# コードリストの株価を登録
register_stockprice(code_list, fromDate, toDate)


print(f'Done.[{fromDate}][{fromCode}][{toCode}]')

