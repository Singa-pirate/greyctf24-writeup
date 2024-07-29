# Learning With Mistakes

## Challenge (712 points, 10 solves)

> Original LWE use field GF(prime). TFHE use Mod(2^n). I use GF(2^n) so that it's still a field so obviously mine is gna be more secure lmao.
>
> Author: JuliaPoo

## Summary

The given [link](https://www.daniellowengrub.com/blog/2024/01/03/fully-homomorphic-encryption) in `lwe.sage` provides a very detailed article about the Learning With Errors (LWE) problem and its application in Fully Homomorphic Encryption (FHE).

The scheme relies on the fact that it is very difficult to figure out `s` from the given equations of the following form where `a_i`, `b_i` are known values and `e_i` is a random noise term.

```bash
dot(a_1, s) + e_1 = b_1
dot(a_2, s) + e_2 = b_2
...
dot(a_n, s) + e_n = b_n
```

The author made a small tweak to the original encryption scheme by using the Galois Field `GF(2^n)`. We need to find the secret key `s` to decrypt the flag.

## Analysis

There must be some special property of `GF(2^n)` with the current code that creates vulnerabilities. This [link](https://engineering.purdue.edu/kak/compsec/NewLectures/Lecture7.pdf) provides a good introduction to `GF(2^n)`.

The most important thing to know is that addition in `GF(2^n)` is equivalent to XOR operation.

The second important thing to notice is that each equation for the LWE in the code only involve 4 bits of the message `m` and the noise term `e` does not affect these 4 bits.

## Approach

Since XOR operations are indepedent for individual bit, each equation `dot(a_i, s) + m_i + e_i = b_i` can be split into 4 equations over `GF(2)` (remember that XOR is equivalent to addition in `GF(2)`) as follows (notice that the unknown noise term `e_i` are no longer present):

```bash
# [0], [1], [2], [3] refers to 4 most significant bits of each value
dot(a_i, s)[0] + m_i[0] = b_i[0]
dot(a_i, s)[1] + m_i[1] = b_i[1]
dot(a_i, s)[2] + m_i[2] = b_i[2]
dot(a_i, s)[3] + m_i[3] = b_i[3]
```

Since `s` is a binary vector of length `500`, and we have a total of `132 * 4 = 528` equations, we can solve the system of equations in `GF(2)` to find the secret key `s`. This can be done using the `sage` library.

## Flag

`grey{I'm_flyin_soon_I'm-_rushing-this-challenge-rn-ajsdadsdasks}`
