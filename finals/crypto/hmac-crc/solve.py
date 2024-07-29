from pwn import *
context.log_level = 'debug'

# Connect to the server
r = remote('challs.nusgreyhats.org', 32000)
r.recvuntil(b'Enter an option:\n')

# Do option 1 for 129 times for 0, 1 << 0, 1 << 1, 1 << 2, ..., 1 << 127
mp = {}
r.recvuntil(b'> ')
r.sendline(b'1')
r.recvuntil(b'Enter a message (in hex): ')
v = int.to_bytes(0, 16, 'big')
r.sendline(v.hex().encode())
mp[-1] = bytes.fromhex(r.recvline().decode().strip())
for i in range(128):
    r.sendline(b'1')
    r.recvuntil(b'Enter a message (in hex): ')
    v = 1 << i
    v = int.to_bytes(v, 16, 'big')
    r.sendline(v.hex().encode())
    mp[i] = bytes.fromhex(r.recvline().decode().strip())
print(mp)

# Do option 2 to solve the challenge
r.recvuntil(b'> ')
r.sendline(b'2')
for i in range(10):
    r.recvuntil(b'Encrypt ')
    v = r.recvline().decode().strip()
    v = bytes.fromhex(v)
    v = int.from_bytes(v, 'big')
    ans = bytearray(32)
    num = 0
    for k in range(128):
        if (v & (1 << k)):
            ans = bytes([ans[j] ^ mp[k][j] for j in range(len(ans))])
            num += 1
    while num < 243:
        ans = bytes([ans[j] ^ mp[-1][j] for j in range(len(ans))])
        num += 1
    print(ans)
    ans = ans.hex()
    r.sendline(ans.encode())

r.interactive()
