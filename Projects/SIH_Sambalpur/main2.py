import pandas as pd

df = pd.read_csv("data2.csv")

a = input()

flag = False
count = -1
for i in df["Occupation"]:
    count += 1
    if a.lower() in i.lower():
        flag = True
        print(df["Risk level"][count],"%")
        break

if not flag:
    print("Not Found")

