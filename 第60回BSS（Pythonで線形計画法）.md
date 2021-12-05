# 第60回BSS（Pythonで線形計画法）

日時　：2021年 12月1日(水)  
参加者：古川(発表者)・有川・森

---
***今回の趣旨***

* 線形計画法を学習する
* 線形計画法をPythonのライブラリPuLPで解く
  
***目次***
- [第60回BSS（Pythonで線形計画法）](#第60回bsspythonで線形計画法)
  - [環境](#環境)
  - [1. 線形計画法と最適化](#1-線形計画法と最適化)
    - [1.1 線形計画法とは](#11-線形計画法とは)
    - [1.2 最適化](#12-最適化)
    - [1.3 定式化](#13-定式化)
    - [1.4 ナップサック問題](#14-ナップサック問題)
  - [2. Python(PULP)で線形計画問題を解いてみる](#2-pythonpulpで線形計画問題を解いてみる)
    - [2.1 準備（パッケージインストール）](#21-準備パッケージインストール)
    - [2.2 領域内で関数を最大化する例題](#22-領域内で関数を最大化する例題)
    - [2.3 ナップサック問題](#23-ナップサック問題)
  - [3. 参考サイト](#3-参考サイト)


## 環境
- macOS Monterey 12.0.1
- python 3.10.0


## 1. 線形計画法と最適化
線形計画法は実は高校数IIで習っています。ただし「線形計画法」ではなく「領域における最大・最小」として出てきます。

### 1.1 線形計画法とは
線型計画法（せんけいけいかくほう、LP; linear programming）は、数理計画法において、いくつかの1次不等式および1次等式を満たす変数の値の中で、ある1次式を最大化または最小化する値を求める方法である。線形計画法の対象となる最適化問題を線型計画問題という。(Wikipedia)

### 1.2 最適化
最適化（さいてきか、Optimization）とは、関数・プログラム・製造物などを最適な状態に近づけることをいう。(Wikipedia)

色々なところで使われるが、ここでは「最適化問題」を解く上での操作を指すものとし、その中でも解が離散的なものである「組合せ最適化」に焦点を当てて話を進めることとする。

### 1.3 定式化
組合せ最適化では、数理モデルを定式化する必要があり、定式化するためには次の３つの要素を決める必要がある。
- 変数
- 目的関数
- 制約条件

###  1.4 ナップサック問題
最適化問題の典型的な例の一つである「ナップサック問題」を考えてみる。

【 例題 】
```
重量制限が10kgの袋に以下のA〜Eを出来るだけ価値が高くなるように詰めるにはどれを詰めれば良いか？
ただし、A〜Eは各１つずつとする。
```
  |         |A |B  |C  |D  |E  |
  |---------|-:|--:|--:|--:|--:|
  |重量     |1.8|5.8|7.3|4.1|8.0|
  |価値     |7  |50 |70 |40 |80|
  |価値/重量 |3.89|8.62|9.59|9.76|10.00|



【 解答 】  
この問題を最適化問題として解くと最適解は「 B と D を詰め込む（合計価値 90 ）」と なる。  
また、単位重量あたりの価値が大きいものから順に詰めていくという方法 （貪欲法）で行うと答えは「 A と E を詰め込む（合計 87）」と最適解になりません。

## 2. Python(PULP)で線形計画問題を解いてみる

### 2.1 準備（パッケージインストール）
```sh
$ pip install pulp
$ pip install numpy
$ pip install matplotlib 
```

### 2.2 領域内で関数を最大化する例題
大学入試対策問題を解いてみよう

【 例題1 】
```
x≥0, y≥0, x+y≤3, x+2y≤4 で表される領域内で関数 f(x,y)=4x+5y を最大にする点とその最大値を求めよ。
```

【 図 】
![図](https://user-images.githubusercontent.com/19363285/144749909-15d26b08-b8a1-48b8-b1e8-fc03cfdd5f4e.png)


【 図のソースコード(Python) 】
```python
import numpy as np
import matplotlib.pyplot as plt

# 等差数列(x軸の区間[0,5]を100分割)
x = np.linspace(0, 5, 100)

# 制約条件を定義
y1 = 3 - x
y2 = 2 - 0.5*x

# 0を要素とする配列
y3 = np.zeros_like(x)

# y1,y2の小さい方を取る
y4 = np.minimum(y1, y2)


#---------------------
# グラフを描画
#---------------------
plt.figure()

# 制約条件
plt.plot(x, y1, label="x + y <= 3")
plt.plot(x, y2, label="x + 2y <= 4")

# 塗りつぶし
plt.fill_between(x, y3, y4, where=y4>y3, facecolor='yellow', alpha=0.3)

# 軸の範囲
plt.ylim(0, 5)
plt.xlim(0, 5)

# 凡例
plt.legend(loc='best')

# 方眼
plt.grid()

# 描画
plt.show()
```

【 解答 】
```sh
$ python ex1.py
Welcome to the CBC MILP Solver 
Version: 2.10.3 
Build Date: Dec 15 2019 
  :
  :

Result - Optimal solution found

Objective value:                13.00000000
Enumerated nodes:               0
Total iterations:               0
Time (CPU seconds):             0.00
Time (Wallclock seconds):       0.01

Option for printingOptions changed from normal to all
Total time (CPU seconds):       0.00   (Wallclock seconds):       0.02

Optimal
Result
X: 2.0
Y: 1.0
```

【 解答のソースコード(Python) 】
```python
import pulp

# 線形計画の定義
problem = pulp.LpProblem('Ex1', pulp.LpMaximize)

# 変数の定義
x = pulp.LpVariable('X', 0, 100, 'Integer') 
y = pulp.LpVariable('Y', 0, 100, 'Integer') 

# 目的関数の定義
problem += 4*x + 5*y

# 制約条件の定義
problem += x + y <= 3
problem += x + 2*y <= 4

# 解を求める
status = problem.solve()
print(pulp.LpStatus[status])

# 結果表示
print("Result")
print("X:",x.value())
print("Y:",y.value())
```

### 2.3 ナップサック問題

前章のナップサック問題をPythonに解かせてみよう

【例題2（前章の例題を再掲）】
```
重量制限が10kgの袋に以下のA〜Eを出来るだけ価値が高くなるように詰めるにはどれを詰めれば良いか？
ただし、A〜Eは各１つずつとする。
```
  |         |A |B  |C  |D  |E  |
  |---------|-:|--:|--:|--:|--:|
  |重量     |1.8|5.8|7.3|4.1|8.0|
  |価値     |7  |50 |70 |40 |80|
  |価値/重量 |3.89|8.62|9.59|9.76|10.00|


【 解答 】
```sh
$ python ex2.py
Welcome to the CBC MILP Solver 
Version: 2.10.3 
Build Date: Dec 15 2019 
  :
  :
Result - Optimal solution found

Objective value:                90.00000000
Enumerated nodes:               0
Total iterations:               0
Time (CPU seconds):             0.00
Time (Wallclock seconds):       0.01

Option for printingOptions changed from normal to all
Total time (CPU seconds):       0.00   (Wallclock seconds):       0.01

Optimal
Result
A: 0.0
B: 1.0
C: 0.0
D: 1.0
E: 0.0
```


【 解答のソースコード(Python) 】
```python
import pulp

# 線形計画の定義
problem = pulp.LpProblem('Ex2', pulp.LpMaximize)

# 変数の定義
a = pulp.LpVariable('A', 0, 1, 'Integer') 
b = pulp.LpVariable('B', 0, 1, 'Integer') 
c = pulp.LpVariable('C', 0, 1, 'Integer') 
d = pulp.LpVariable('D', 0, 1, 'Integer') 
e = pulp.LpVariable('E', 0, 1, 'Integer') 

# 目的関数の定義
problem += 7*a + 50*b + 70*c + 40*d + 80*e

# 制約条件の定義
problem += 1.8*a + 5.8*b + 7.3*c + 4.1*d + 8*e <= 10

# 解を求める
status = problem.solve()
print(pulp.LpStatus[status])

# 結果表示
print("Result")
print("A:",a.value())
print("B:",b.value())
print("C:",c.value())
print("D:",d.value())
print("E:",e.value())
```


## 3. 参考サイト
- [領域における最大・最小問題（線形計画法）](https://manabitimes.jp/math/930)
- [線形計画法超入門](https://qiita.com/Dason08/items/e1bafb9ddc766d1c8fd0)
- [PuLP による線型計画問題の解き方ことはじめ](https://qiita.com/mzmttks/items/82ea3a51e4dbea8fbc17)
- [最適化とは](https://www.msi.co.jp/nuopt/introduction/index.html)

