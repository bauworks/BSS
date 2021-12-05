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
