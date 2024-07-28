import os
from Cryptodome.Cipher import AES
from Cryptodome.Util.Padding import pad
from hashlib import md5
from pwn import *

BLOCK_SIZE = 16
xor = lambda x, y: bytes(a^b for a,b in zip(x,y))

remote = connect("challs.nusgreyhats.org", 32223)
s = remote.recvuntil(b"> ")
e_secret = bytes.fromhex(s.split(b"Encrypted secret: ")[1].split(b'\n')[0].decode())
iv = bytes.fromhex(s.split(b"iv: ")[1].split(b'\n')[0].decode())
ct = bytes.fromhex(s.split(b"ct: ")[1].split(b'\n')[0].decode())

# easier method
payload  = e_secret[:16].hex() * 2
remote.sendline(payload)
s = remote.recvuntil(b'> ').split(b'\n')[0] # I1 xor c1 xor p1
# IV = I1 xor p1 = s xor c1
iv_ecb = xor(bytes.fromhex(s.decode()), e_secret[:16])

payload = e_secret[16:].hex() + e_secret[:16].hex()
remote.sendline(payload)
s = remote.recvuntil(b'> ')
d_secret = bytes.fromhex(s.split(b'\n> ')[0].decode())

'''
# complicated method

payload = (e_secret[32:48] + e_secret[16:32] + e_secret[48:] + e_secret[:16]).hex()
remote.sendline(payload)
s = remote.recvuntil(b'> ')
d_secret2 = bytes.fromhex(s.split(b'\n> ')[0].decode())

iv_ecb = xor(d_secret[:16], xor(d_secret2[:16], xor(d_secret2[16:32], xor(e_secret[32:48]))))
'''

intermediates = []
intermediates.append(xor(d_secret[0:16], iv_ecb))
for i in range(16, 80, BLOCK_SIZE):
    intermediates.append(xor(xor(e_secret[i:i+BLOCK_SIZE], d_secret[i-BLOCK_SIZE:i]),d_secret[i:i+BLOCK_SIZE]))

secret = b""
prev = xor(intermediates[-1], iv_ecb)
secret += prev

for i in range(0, 4):
    prev = xor(xor(e_secret[i*BLOCK_SIZE:(i+1)*BLOCK_SIZE], prev), intermediates[i])
    secret += prev

secret_key = md5(secret).digest()
cipher = AES.new(key = secret_key, iv = iv, mode = AES.MODE_CBC)
flag_dec = cipher.decrypt(ct)

print(flag_dec)