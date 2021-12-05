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

