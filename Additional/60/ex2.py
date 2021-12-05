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

