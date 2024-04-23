from functools import reduce

arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 196, 180, 45, 13, 53, 112, 133, 142, 221, 121, 3, 157, 113, 81, 80, 195, 253, 225, 197, 202, 197, 48, 46, 21, 121, 40, 23, 239, 35, 175, 254, 103, 36, 126, 183, 218, 112, 235, 9, 98, 99, 29, 109, 196, 120, 43, 68, 126, 100, 81]
d = 2933342412243178360246913963653176924656287769470170577218737 * 2663862733012296707089609302317500558193537358171126836499053
print(len(arr))
max_score = 10000000
# max_score = 2
for score in range(1, max_score + 1):
  # print(arr)
  if score % 100000 == 0: print(score)
  # if score % 10 == 0: print(score)
  R = reduce(lambda x, y: x * 256 + y, arr)
  O = pow(R, 65537, d)
  # print(R)
  # print(O)
  for k in range(64):
    arr[63 - k] = O & 255
    O = O >> 8
  for G in range(63, 23, -1):
    h = G * score % 40 + 24
    arr[G], arr[h] = arr[h], arr[G]
  j = score & 255
  for m in range(24, 64):
    arr[m] ^= j
    j = arr[m]

b = ''.join(list(map(chr, arr)))
print(b[16:])
# print(arr)