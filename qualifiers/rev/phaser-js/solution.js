const arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 196, 180, 45, 13, 53, 112, 133, 142, 221, 121, 3, 157, 113, 81, 80, 195, 253, 225, 197, 202, 197, 48, 46, 21, 121, 40, 23, 239, 35, 175, 254, 103, 36, 126, 183, 218, 112, 235, 9, 98, 99, 29, 109, 196, 120, 43, 68, 126, 100, 81];
const d = BigInt('2933342412243178360246913963653176924656287769470170577218737') * BigInt('2663862733012296707089609302317500558193537358171126836499053'); // both are primes
console.log(arr.length);
// maxScore = 10000000;
const maxScore = 2
for (let score = 1; score <= maxScore; score++) {
  if (score % 100000 === 0) console.log(score);
  let R = arr.reduce((S, k) => (S << 8n) + BigInt(k), 0n),
    // O = 1n;
    O = (R**65537n) % d; // bottleneck here
  console.log(R);
  console.log(O);
  // for (let S = 0; S < 65537; S++) O = O * R % d;
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
  console.log(arr)
}
const b = arr.map(X => String.fromCharCode(X)).join('');
// console.log(b.slice(16));
console.log(arr);