# Baby RSA

## Challenge (200 points, 18 solves)

> lol
> 
> Author: hadnot

## Summary

The problem is not really about solving RSA, but rather, solving simultaneous equations (with care!)

## Analysis

The following code snippets from the source code may suggest that this problem is nothing but 3 RSA problems:

```py
m1, m2, m3 = map(bytes_to_long, flag)

c1 = pow(m1, e, N1)
c2 = pow(m2, e, N2)
c3 = pow(m3, e, N3)

print(f"N1 = {N1}")
print(f"N2 = {N2}")
print(f"N3 = {N3}")
print(f"c1 = {c1}")
print(f"c2 = {c2}")
print(f"c3 = {c3}")
```

We hence can try running [RsaCtfTool](https://github.com/RsaCtfTool/RsaCtfTool) 3 times:

```bash
python RsaCtfTool.py -n 12495068391856999800077002030530346154633251410701993364552383316643702466683773454456456597802923936206937481367758944533287430192110874917786936470363369 -e 65537 --decrypt 11727185096615670493479944410151790761335959794363922757994065463882149941932060937572492050251349085994568934453243128190891922383731914525051578359318783
```

However, the tool fails to return an answer.

Hold up! These 3 RSA problems are not unrelated! Looking at how the numbers are created:

```py
p, P = gen_safe_prime()
q, Q = gen_safe_prime()
r, R = gen_safe_prime()

N1 = p*Q
N2 = q*R
N3 = r*P
```

The primes are related! So the task is now clear: given `a`, `b`, `c`, solve for `p`, `q`, `r` in the following simultaneous equations:

$$
\begin{aligned}
& a = p(2q + 1) \\
& b = q(2r + 1) \\
& c = r(2p + 1) \\
\end{aligned}
$$

We first try to obtain analytical solution to these 3 equations. And indeed, it is a quadratic equation:

$$
\begin{aligned}
& (4a + 2) r^2 + (2a + 2b - 2c + 1) r - 2bc - c = 0
\end{aligned}
$$

Solving this quadratic equation necessitates finding exact square root of an integer. Luckily, `gmpy2` library allows that with `isqrt`:

```py
delta = B ** 2 - 4 * A * C
delta_squared = gmpy2.isqrt(delta)
assert delta_squared ** 2 == delta

r = (-B + delta_squared) // (2 * A)
```

Once `r` is found, the rest of the task is trivial.

One small note is that modular inverse of `e` for each `a`, `b`, `c` can be easily found using `inverse` function of `Crypto.Util.number` library (installed using `pip install pycryptodome`):

```py
l1 = math.lcm(p - 1, 2 * q)
l2 = math.lcm(q - 1, 2 * r)
l3 = math.lcm(r - 1, 2 * p)

d1 = inverse(e, l1)
d2 = inverse(e, l2)
d3 = inverse(e, l3)
```

## Flag

`grey{3_equations_3_unknowns_just_use_groebnerXD}`
