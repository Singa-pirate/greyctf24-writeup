(function(g, f) {
    const o = xxxf,
      R = g();
    while (true) {
      try {
        const M = parseInt(o(241)) / (-8662 + 7810 + 853) + -parseInt(o(247)) / (6433 + -5409 * -1 + -20 * 592) * (parseInt(o(240)) / (6805 + 659 * -6 + -2 * 1424)) + parseInt(o(249)) / (-96 * -59 + -309 * 6 + 2 * -1903) + -parseInt(o(245)) / (-2767 + 5733 + -2961 * 1) * (-parseInt(o(243)) / (-3 * 3325 + 6545 + 4 * 859)) + parseInt(o(246)) / (-2191 + 2 * 1882 + -1566) * (-parseInt(o(248)) / (-2784 + -38 * 19 + -14 * -251)) + parseInt(o(250)) / (-1 * -5861 + -2618 + -3234) * (-parseInt(o(244)) / (1 * -9872 + 7 * -337 + 1 * 12241)) + parseInt(o(251)) / (-127 * -37 + 1509 + -6197 * 1) * (parseInt(o(242)) / (93 * 103 + 1983 + 150 * -77));
        if (M === f) break;
        else R.push(R.shift());
      } catch (V) {
        R.push(R.shift());
      }
    }
  }(xxxg, 795755 + -140702 * -1 + 23 * -20573));
  
  function xxxf(g, f) {
    const R = xxxg();
    return xxxf = function(M, V) {
      M = M - (-1 * -5021 + 41 * 109 + -9250);
      let u = R[M];
      return u;
    }, xxxf(g, f);
  }
  class xxxk extends Phaser.Scene {
    preload() {
      this.load.image("sky", "assets/sky.png"), this.load.image("ground", "assets/platform.png"), this.load.image("star", "assets/star.png"), this.load.image("bomb", "assets/bomb.png");
      const f = {};
      f.frameWidth = 32, f.frameHeight = 48, this.load.spritesheet("dude", "assets/dude.png", f);
    }
    create() {
      this.gameOver = false, this.score = -6400 + -3 * 2491 + 1 * 13873, this.ggwave = 13775686 + -19512407 + 15736721,
      this.hihihaha = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 196, 180, 45, 13, 53, 112, 133, 142, 221, 121, 3, 157, 113, 81, 80, 195, 253, 225, 197, 202, 197, 48, 46, 21, 121, 40, 23, 239, 35, 175, 254, 103, 36, 126, 183, 218, 112, 235, 9, 98, 99, 29, 109, 196, 120, 43, 68, 126, 100, 81],
      this.add.image(-1655 * 3 + -4972 + 10337, 2733 + -116 * -86 + -1 * 12409, "sky"),
      this.platforms = this.physics.add.staticGroup(),
      this.platforms.create(-17 * -17 + 3541 + -3430, 8284 + -3917 + -29 * 131, "ground").setScale(-7883 + -2254 + 1 * 10139).refreshBody(),
      this.player = this.physics.add.sprite(-7 * 5 + 5560 + -1 * 5425, -216 * -41 + 1119 + 381 * -25, "dude"),
      this.player.setCollideWorldBounds(true);
      const O = {};
      O.start = 0, O.end = 3, this.anims.create({
        "key": "left",
        "frames": this.anims.generateFrameNumbers("dude", O),
        "frameRate": 10,
        "repeat": -(2777 + -22 * 177 + 1118)
      });
      const j = {};
      j.key = "dude", j.frame = 4;
      const S = {};
      S.key = "turn", S.frames = [j], S.frameRate = 20, this.anims.create(S);
      const k = {};
      k.start = 5, k.end = 8, this.anims.create({
        "key": "right",
        "frames": this.anims.generateFrameNumbers("dude", k),
        "frameRate": 10,
        "repeat": -(-9109 * -1 + -3 * 1697 + -4017)
      }), this.cursors = this.input.keyboard.createCursorKeys(), this.sauces = this.physics.add;
      const G = {};
      G.x = 12, G.y = 0, G.stepX = 70;
      const h = {};
      h.key = "star", h.repeat = 11, h.setXY = G, this.stars = this.physics.add.group(h), this.stars.children.iterate(function(x) {
        x.setBounceY(Phaser.Math.FloatBetween(2995 * 2 + -35 * -233 + -14145 + 0.4, -7 * 1399 + 9007 + 393 * 2 + 0.8));
      }), this.bombs = this.physics.add.group();
      for (let x = -910 + -5988 + 3449 * 2; x < 1623 + -8991 + -7373 * -1; ++x) {
        var m = this.bombs.create(x * (5493 + 1618 + -7081), -25 * -215 + 8095 + -13454, "bomb");
        m.setBounce(-3123 + 4105 + -982 + 0.5), m.setCollideWorldBounds(true), m.setVelocity(Phaser.Math.Between(-(-563 * -2 + 6547 + 53 * -141), -46 * 42 + -155 * -36 + -3448), 3260 + -7731 + -3 * -1497), m.allowGravity = false;
        var b = this.bombs.create(-179 + -3 * 2749 + 9226 - x * (5510 + -6615 + 1135), 6374 + 2535 * 1 + -1 * 8893, "bomb");
        b.setBounce(-6 * 1497 + -1 * 7213 + 16195 + 0.5), b.setCollideWorldBounds(true), b.setVelocity(Phaser.Math.Between(-(9605 + -2 * -1837 + -13079), -2 * 1933 + -57 * 173 + 1 * 13927), -5 * -1279 + -1063 + -83 * 64), b.allowGravity = false;
      }
      const X = {};
      X.fontSize = "32px", X.color = "#000", this.scoreText = this.add.text(-92 + 1 * 1063 + -955 * 1, -3098 * 1 + -6599 * 1 + 9713 * 1, "Wave: 0", X), this.physics.add.collider(this.player, this.platforms), this.physics.add.collider(this.stars, this.platforms), this.physics.add.collider(this.bombs, this.platforms), this.physics.add.overlap(this.platforms, this.stars, this.collectStar, null, this), this.physics.add.overlap(this.player, this.stars, this.collectStar, null, this), this.physics.add.collider(this.player, this.bombs, this.hitBomb, null, this);
    }
    update() {
      if (this.gameOver) return;
      if (this.cursors.left.isDown) this.player.setVelocityX(-(4007 + -2 * 2434 + -1021 * -1)), this.player.anims.play("left", true);
      else this.cursors.right.isDown ? (this.player.setVelocityX(-1497 * 5 + 3 * -1209 + -4 * -2818), this.player.anims.play("right", true)) : (this.player.setVelocityX(-2058 + -1 * -1127 + 133 * 7), this.player.anims.play("turn"));
      this.cursors.up.isDown && this.player.body.touching.down && this.player.setVelocityY(-(9016 * -1 + -508 * 8 + 13410));
    } 
    collectStar(g, f) {
      f.disableBody(true, true);
      if (this.stars.countActive(true) === -7580 + 6123 + 1457) {
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
    hitBomb(g, f) {
      this.physics.pause(), g.setTint(-2811433 * 1 + 25991319 + 6468206 * -1), g.anims.play("turn"), this.gameOver = true;
    }
  }
  const xxxG = {};
  xxxG.x = 0, xxxG.y = 300;
  const xxxh = {};
  xxxh.gravity = xxxG, xxxh.debug = false;
  const xxxm = {};
  
  function xxxg() {
    const Z = ['28AHHjZZ', "160jKVWZR", "2459776uEyNlR", "4302963RtYxAb", "264vyxdpV", "140382RkfOIY", "174847vLdWuq", "277548lAtLUh", "21804sAWvCg", "10SFNibO", "655MgCoJZ", '78554qzLxgo'];
    xxxg = function() {
      return Z;
    };
    return xxxg();
  }
  xxxm.default = "arcade", xxxm.arcade = xxxh;
  const xxxb = {};
  xxxb.type = Phaser.AUTO, xxxb.width = 800, xxxb.height = 600, xxxb.physics = xxxm, xxxb.scene = xxxk;
  var xxxX = xxxb,
    xxxx = new Phaser.Game(xxxX);