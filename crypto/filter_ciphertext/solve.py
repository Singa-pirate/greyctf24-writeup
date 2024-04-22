from pwn import *

remote = connect("challs.nusgreyhats.org", 32222)
s = remote.recvuntil(b"> ")
ct = s.split(b"Encrypted secret: ")[1].split(b"\n")[0]

payload = b""
for i in range(0, 160, 32):
    payload += ct[i : i+32] * 2

remote.sendline(payload)
print(remote.recvall(2))