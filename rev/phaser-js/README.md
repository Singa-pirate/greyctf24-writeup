# Phaser JS

### Challenge (453 points, 40 solves)

> I followed the phaserjs tutorial and made it a lot harder. Clear 10000000 waves and you will see the flag in the developer console (printed with console.log). Have fun :)
> 
> http://challs.nusgreyhats.org:39876
> 
> Author: daniao

### Analysis

Upon following the URL, inspecting the page source, we see the following HTML:

```html
<!doctype html> 
<html lang="en"> 
<head> 
    <meta charset="UTF-8" />
    <title>Game</title>
    <!-- <script src="//cdn.jsdelivr.net/npm/phaser@3.11.0/dist/phaser.js"></script> -->
    <script src="js/phaser.min.js"></script>
    <script src="js/game.js"></script>
    <style type="text/css">
        body {
            margin: 0;
        }
    </style>
</head>
<body>

</body>
</html>
```

We see that there are two js files controlling this document. `phaser.min.js` is the Phaser library code, which is not worth inspecting. Upon inspecting `game.js`, it is an obfuscated script. Our task is to deobfuscate this script to see what it is doing, and whether we can bypass the game logic to obtain the flag.

### Approach

The first step is to use online tools to deobfuscate the script. We used [Willnode's](https://willnode.github.io/deobfuscator/). It nicely formats the script and turns all hexadecimal numbers into decimal numbers. The full deobfuscated is found in [game-original.js](./game-original.js). However, the script returned was not returned was not sufficient clear to decipher what the script is doing.

First, I manually replace some of the script patterns with human-readable patterns, with the help of `Ctrl+H`.

* Evaluates all strings, by replacing the pattern `" + "` with empty string. For eg, `"exa" + "mple"` is replaced with `"example"`.
* Format method declarations, from

```js
["sampleMethod"]() {
  // method body
}
```

to

```js
sampleMethod() {
  // method
}
```

* Replace dictionary-like syntax to method invocation syntax. For example, `object["sampleMethod"]` is replaced with `object.sampleMethod`.

After the above steps, we have summations of numbers that can be replaced. However, replacing these expressions is not a simple task of `Ctrl+H`. From here, we start to deobfuscate from where `console.log` expression is found (because the flag is printed in the console with `console.log`).

Notice that the method `collectStar` is solely responsible for calculating the flag:

```js
create() {
  this.hihihaha = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 196, 180, 45, 13, 53, 112, 133, 142, 221, 121, 3, 157, 113, 81, 80, 195, 253, 225, 197, 202, 197, 48, 46, 21, 121, 40, 23, 239, 35, 175, 254, 103, 36, 126, 183, 218, 112, 235, 9, 98, 99, 29, 109, 196, 120, 43, 68, 126, 100, 81]
  // other logic
}

// other methods

collectStar(g, f) {
  f.disableBody(true, true);
  if (this.stars.countActive(true) === 0) {
    this.score += 1 * -1123 + 5366 + -303 * 14, this.scoreText.setText("Wave: " + this.score), this.stars.children.iterate(function(S) {
      return S.enableBody(true, S.x, -162 * 58 + 39 * 193 + -267 * -7, true, true), true;
    }), this.bombs.children.iterate(function(S) {
      return S.setPosition(S.x, 4294 + 9059 * -1 + -4765 * -1), S.setBounce(53 * 99 + -2779 + 4 * -617 + 0.5), S.setCollideWorldBounds(true), S.setVelocity(Phaser.Math.Between(-(-19 * 54 + 25 * 101 + -1299), -757 * 11 + 6453 + 1037 * 2), -9685 + -6440 + 16145), S.allowGravity = false, true;
    });
    let R = this.hihihaha.reduce((S, k) => (S << 8n) + BigInt(k), 0n),
      d = BigInt("2933342412243178360246913963653176924656287769470170577218737") * BigInt("2663862733012296707089609302317500558193537358171126836499053"),
      O = 1n;
    for (let S = 0; S < 65537; S++) O = O * R % d;
    for (let k = 0; k < 64; ++k) {
      this.hihihaha[this.hihihaha.length - 1 - k] = Number(O & 255n), O = O >> 8n;
    }
    for (let G = this.hihihaha.length - 1; G >= 24; G--) {
      let h = G * this.score % 40 + 24;
      [this.hihihaha[G], this.hihihaha[h]] = [this.hihihaha[h], this.hihihaha[G]];
    }
    let j = this.score & 255;
    for (let m = 24; m < this.hihihaha.length; ++m) {
      this.hihihaha[m] ^= j, j = this.hihihaha[m];
    }
    if (this.score == this.ggwave) {
      let b = this.hihihaha.map(X => String.fromCharCode(X)).join("");
      console.log(b.slice(16));
    }
  }
}
```

The full script after the above steps is found in [game.js](./game.js). The bulk of the body is executed only when star count resets. We simply execute the part responsible for calculating the flag in the correct number of times. The script for calculating the flag is as follows:

```js
const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 196, 180, 45, 13, 53, 112, 133, 142, 221, 121, 3, 157, 113, 81, 80, 195, 253, 225, 197, 202, 197, 48, 46, 21, 121, 40, 23, 239, 35, 175, 254, 103, 36, 126, 183, 218, 112, 235, 9, 98, 99, 29, 109, 196, 120, 43, 68, 126, 100, 81];
const d = BigInt('2933342412243178360246913963653176924656287769470170577218737') * BigInt('2663862733012296707089609302317500558193537358171126836499053');
console.log(arr.length);
const maxScore = 10000000;
for (let score = 1; score <= maxScore; score++) {
  if (score % 100000 === 0) console.log(score);
  let R = arr.reduce((S, k) => (S << 8n) + BigInt(k), 0n);
  let O = (R**65537n) % d; // bottleneck here
  for (let k = 0; k < 64; ++k) {
    arr[arr.length - 1 - k] = Number(O & 255n);
    O = O >> 8n;
  }
  for (let G = arr.length - 1; G >= 24; G--) {
    let h = G * score % 40 + 24;
    [arr[G], arr[h]] = [arr[h], arr[G]];
  }
  let j = score & 255;
  for (let m = 24; m < arr.length; ++m) {
    arr[m] ^= j, j = arr[m];
  }
}
const b = arr.map(X => String.fromCharCode(X)).join('');
console.log(b.slice(16));
```

Executing the above script still takes forever to finish. But notice that the main bottle neck is due to the modulo power. Fortunately, python can do this calculation much faster. We therefore transfer this logic over Python for execution.

```py
from functools import reduce

arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 196, 180, 45, 13, 53, 112, 133, 142, 221, 121, 3, 157, 113, 81, 80, 195, 253, 225, 197, 202, 197, 48, 46, 21, 121, 40, 23, 239, 35, 175, 254, 103, 36, 126, 183, 218, 112, 235, 9, 98, 99, 29, 109, 196, 120, 43, 68, 126, 100, 81]
d = 2933342412243178360246913963653176924656287769470170577218737 * 2663862733012296707089609302317500558193537358171126836499053
print(len(arr))
max_score = 10000000
for score in range(1, max_score + 1):
  if score % 100000 == 0: print(score)
  R = reduce(lambda x, y: x * 256 + y, arr)
  O = pow(R, 65537, d)
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
```

After around 15 mins of execution, we were able to find the flag in the terminal.

### Flag

```
grey{ea_sports_its_in_the_game_586256cbd58140ec}
```
