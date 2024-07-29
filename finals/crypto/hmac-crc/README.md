# HMAC-CRC

## Challenge (304 points, 15 solves)

> I came up with a new HMAC algorithm. How has no one thought of this before?
>
> Author: hadnot

## Summary

The server uses AES in CTR mode with the encryption described as `Enc(pt) = AES(pt || crc32(key || pt || key))`, where `||` is concatenation and `key` is a 128-bit key of the AES encryption.

We are given at most 200 queries to the server where we send a plaintext and receive the ciphertext. In order to get the flag, we need to be able to solve 10 challenges where the server sends us a 128-bit plaintext and we need to return the ciphertext.

## Analysis

First note that AES in CTR treats each block independely, essentially each block is being xor with a fixed secret value for each block.

Then, take note of an important property of CRC32:

```c++
CRC32(x ^ y ^ z) = CRC32(x) ^ CRC32(y) ^ CRC32(z)
```

which implies that:

```c++
CRC32(key || x || key)  ^ CRC32(key || y || key) ^ CRC32(key || z || key) 
= CRC32(key ^ key ^ key || x ^ y ^ z || key ^ key ^ key) 
= CRC32(key || x ^ y ^ z || key)
```

## Approach

As each challenge is 128 bits long and we have at most 200 queries, we can decompose each message as a linear combination of 128 bits. We can store the encoding of each bit by sending the server the query message `100000...000` and `010000...000` and so on.

Suppose the challenge message is `100101`. We can get the encoding of the message as follows:

```c++
AES(100101 || crcr32(key || 100101 || key))
= AES(100000 || crc32(key || 100000 || key)) ^ AES(000100 || crc32(key || 000100 || key)) ^ AES(000001 || crc32(key || 000001 || key))
```

The AES encryption stills holds because we are xoring each block with the same key an odd number of times, which the same as xoring it with the key once. And for the trick CRC32 to work, the number of terms need to be a power of 3.

If the number of terms after decomposition is not a power of 3, we can just add `000000...000` as many times as needed to make it a power of 3 (so just need to add 1 more query message above). In my code, I simply add `000000...000` until the number of terms is a power of 243 which is the smallest odd power of 3 greater than 128.

## Flag

`grey{everything_is_linear_algebra_a0945v832q}`
