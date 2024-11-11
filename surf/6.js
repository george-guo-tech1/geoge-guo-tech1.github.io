"use strict";
    exports.__esModule = !0;
    var s = require("./0")
      , n = require("./1")
      , r = require("./23")
      , a = require("./24")
      , o = require("./11")
      , h = require("./25")
      , c = function() {
        function t() {
            if (t.instance)
                return t.instance;
            t.instance = this,
            this.reset()
        }
        return t.prototype.reset = function() {
            this.player = [],
            this.obstacles = [],
            this.surfers = [],
            this.enemies = [],
            this.chance = 0,
            this.spawnAccum = 25e-5,
            this.spawnRate = (.5 + this.spawnAccum) * this.chance,
            this.nextObstacle = 50,
            this.nextCenterObstacle = 400,
            this.freqCenterObstacle = 300,
            this.freqObstacle = 10,
            this.nextSurfer = 200,
            this.freqSurfer = 50,
            this.nextEnemy = 2e3,
            this.freqEnemy = 800,
            this.nextPowerup = 2e3,
            this.freqPowerup = 1500,
            this.nextRamp = 500,
            this.freqRamp = 700,
            this.nextTentacle = 600,
            this.freqTentacle = 600,
            this.nextDog = 2700,
            this.nextIsland = 100,
            this.freqIsland = 100,
            this.nextCharacter = 1e3,
            this.freqCharacter = 500,
            this.characterIncrement = 0
        }
        ,
        t.prototype.update = function() {
            this.chance = s.Game.system.width / 1e3,
            this.spawnAccum += s.Game.system.interval / 4 * 25e-5,
            this.spawnRate = (.5 + this.spawnAccum) * this.chance,
            this.obstacles = o.Collisions.instance.obstacles,
            this.surfers = o.Collisions.instance.surfers,
            this.enemies = o.Collisions.instance.enemies;
            var t = Math.random()
              , e = s.Game.system.distance;
            e >= this.nextObstacle && t < this.spawnRate && (this.spawnNewObstacle(),
            this.nextObstacle = e + this.freqObstacle),
            e >= this.nextSurfer && t < .01 * this.chance && (this.spawnNewSurfer(),
            this.nextSurfer = e + this.freqSurfer),
            e >= this.nextEnemy && t < .01 * this.chance && "air" !== n.Player.instance.state.substring(0, 3) && (this.spawnNewEnemy(),
            this.nextEnemy = e + this.freqEnemy)
        }
        ,
        t.prototype.spawnPlayer = function(t, e) {
            this.player = new n.Player(Math.floor(t / 2) - 32,Math.floor(e / 3) - 32),
            n.Player.instance.reset(),
            s.Game.system.objMain.push(this.player)
        }
        ,
        t.prototype.spawnNewSurfer = function(t) {
            void 0 === t && (t = null);
            var e = -56
              , i = s.Game.system.linearMap(3, 12);
            i < n.Player.instance.ySpeed && (e = s.Game.system.height),
            null === t && ((t = new r.Surfer(Math.floor(Math.random() * s.Game.system.width),e)).maxSpeed = i),
            s.Game.system.objMain.push(t),
            t.surferInstance = s.Game.system.linearMap(0, 8),
            t.surferInstance <= 0="==" 2 3 5 32 64 128 ? t.surfboardinstance="s.Game.system.linearMap(0," 5) : 8), this.surfers.push(t) } , t.prototype.spawnnewenemy="function(t," e, i, r) { void t && (t="null)," e (e="0)," i (i="0)," r (r="null)," =="=" new a.enemy(math.floor(math.random() * s.game.system.width),-118) a.enemy(e,i)).currentspeed="null" n.player.instance.yspeed + n.player.instance.maxspeed r, s.game.system.objmain.push(t), this.enemies.push(t) t.prototype.spawnnewobstacle="function(t)" null="==" t.isinback s.game.system.objback.push(t) this.obstacles.push(t) t.prototype.spawnpoweruprow="function()" for (var <="4;" t++) var 2) - n="new" h.powerup64(e,i,1); s.game.system.objback.push(n), this.obstacles.push(n) t.prototype.spawncrasheddog="function()" h.dogcrash64(n.player.instance.x 24,n.player.instance.y 24,11); t.prototype.randomobstacle="function()" t, 4, 1.5 i), a="Math.floor(r" 4), o="Math.floor(s.Game.system.height)," c="(t" [0, 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11])[math.floor(math.random() t.length)]; switch> this.nextCenterObstacle && (r = i / 2 - 32,
            this.nextCenterObstacle += this.freqCenterObstacle),
            9 === c && e < this.nextCharacter || "air" === n.Player.instance.state.substring(0, 3) ? c = 0 : 7 === c && (e < this.nextPowerup || "air" === n.Player.instance.state.substring(0, 3)) ? c = 0 : 2 === c && e < this.nextRamp ? c = 0 : 6 === c && e < this.nextIsland ? c = 0 : 11 === c && (e < this.nextDog || n.Player.instance.collectedDog) ? c = 0 : 3 === c && e < this.nextTentacle && (c = 5),
            "air" === n.Player.instance.state.substring(0, 3) && r > i / 2 - 192 && r < i / 2 + 128 && (c = 4),
            c) {
            case 0:
                return new h.Objects64(r,o,s.Game.system.linearMap(0, 16));
            case 1:
                return new h.Objects32(r,o,s.Game.system.linearMap(0, 3));
            case 2:
                return this.nextRamp += this.freqRamp,
                new h.Ramp64(a,o,0);
            case 3:
                return this.nextTentacle += this.freqTentacle,
                new h.Tentacle64(a,o,3);
            case 4:
                return 0 === s.Game.system.linearMap(0, 1) ? new h.Wake64(r,o,s.Game.system.linearMap(4, 6)) : new h.Wake192(r,o,s.Game.system.linearMap(0, 1));
            case 5:
                return 0 === s.Game.system.linearMap(0, 1) ? new h.Seaweed64(r,o,s.Game.system.linearMap(7, 9)) : new h.Seaweed192(r,o,2);
            case 6:
                return this.nextIsland += this.freqIsland,
                new h.Sandbar256(r,o,s.Game.system.linearMap(0, 4));
            case 7:
                return this.nextPowerup += this.freqPowerup,
                new h.Powerup64(a,o,1);
            case 8:
                return new h.Ambient64(a,o,s.Game.system.linearMap(0, 3));
            case 9:
                return this.characterIncrement += 1,
                this.characterIncrement > 3 && (this.characterIncrement = 0),
                this.nextCharacter = e + this.freqCharacter,
                new h.Characters64(a,o,17 + this.characterIncrement);
            case 10:
                return new h.Whirlpool128(r,o,0);
            case 11:
                var p = i / 2 + s.Game.system.linearMap(-200, 200);
                return this.nextDog += s.Game.system.winDistance,
                new h.Dog64(p,o,10)
            }
        }
        ,
        t
    }();
    exports.Spawn = c</=>