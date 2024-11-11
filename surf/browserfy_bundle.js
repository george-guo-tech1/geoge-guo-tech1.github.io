(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){ "use strict"; exports.__esmodule="!0;" var s="require("./7")" , n="require("./11")" r="require("./6")" a="require("./26")" o="require("./27")" h="require("./1")" c="require("./12")" p="require("./13")" l="function()" { function t(e, i) if (t.system) return t.system; t.system="this," this.canvas="e," this.fps="i," this.interval="this.fps" 60, this.collisions="new" n.collisions, this.spawn="new" r.spawn, this.cleanup="new" a.cleanup, this.background="new" o.background, this.islandspawn="new" c.islandspawn, this.interface="new" s.interface, this.initializegame() } t.prototype.initializegame="function()" this.definecanvas(this.canvas), this.resetstats(), this.resetgame(), this.interface.buildinterface(), this.spawn.spawnplayer(this.width, this.height), this.interface.buildcharacterselection(), this.background.setupgradient(this.windistance) t.prototype.definecanvas="function(t)" this.ctx="t.getContext("2d")," this.ctx.imagesmoothingenabled="!1," t.width="document.body.clientWidth," t.height="window.innerHeight," t.style.width="t.width" + "px", t.style.height="t.height" this.width="t.width," this.height="t.height" t.prototype.resetstats="function()" this.lives="3," this.maxlives="3," this.powerups="0," this.powerupscollected="0," this.maxpowerups="3," this.shields="0," this.maxshields="3," this.distance="0," this.windistance="7900," this.clearpath="!1," this.dodges="0," this.avoids="0," this.tricks="0," this.boosts="0," this.escapes="0," this.score="0," this.infinitelives="!1," this.infinitepowerups="!1," this.krakencodeused="!1," this.updateframes="0," this.updateending="!1" t.prototype.resetgame="function()" this.gamestate="waiting" this.gameobjects="[]," this.objupper="[]," this.objmain="[]," this.objlower="[]," this.objback="[]," this.interface.reset(), this.background.reset(), this.collisions.reset(), this.spawn.reset(), this.islandspawn.reset(), this.cleanup.reset() t.prototype.reflowcanvas="function()" this.definecanvas(this.canvas); t="h.Player.instance" e="Math.round(this.width" 2) - (t.x i="Math.round(this.height" 3) (t.y 2); this.gameobjects.foreach(function(t) t.move(e, }), this.background.updatewater(e, i, this.interval, t.xspeed, t.yspeed) t.prototype.addlife="function()" < && (this.lives this.interface.updateicons()) t.prototype.removelife="function()"> 0 && !this.infiniteLives && (this.lives -= 1),
            this.interface.updateIcons()
        }
        ,
        t.prototype.removeAllLives = function() {
            this.infiniteLives = !1,
            this.lives = 0,
            this.interface.updateIcons()
        }
        ,
        t.prototype.addPowerup = function() {
            this.powerups < this.maxPowerups && (this.powerups += 1,
            this.powerupsCollected += 1,
            this.interface.updateIcons())
        }
        ,
        t.prototype.removePowerup = function() {
            this.powerups > 0 && !this.infinitePowerups && (this.powerups -= 1),
            this.interface.updateIcons()
        }
        ,
        t.prototype.removeAllPowerups = function() {
            this.infinitePowerups = !1,
            this.powerups = 0,
            this.interface.updateIcons()
        }
        ,
        t.prototype.addShields = function() {
            h.Player.instance.collectedDog = !0,
            this.shields = this.maxShields,
            this.interface.updateIcons()
        }
        ,
        t.prototype.removeShield = function() {
            this.shields > 0 && (this.shields -= 1),
            this.interface.updateIcons()
        }
        ,
        t.prototype.removeAllShields = function() {
            this.shields = 0,
            this.interface.updateIcons()
        }
        ,
        t.prototype.gameLoop = function(t) {
            "playing" === this.gameState || "ready" === this.gameState ? (this.interval = t / (1e3 / this.fps),
            this.updateAll(),
            this.checkWinDistance()) : "lose" === this.gameState && this.updateGameOver(),
            this.updateDrawOrder(),
            this.drawAll()
        }
        ,
        t.prototype.updateAll = function() {
            h.Player.instance.isMoving && (this.distance += h.Player.instance.ySpeed * t.system.interval / h.Player.instance.maxSpeed,
            this.updateFrames % (1 * this.fps) == 0 && this.background.updateGradient(this.distance, this.winDistance),
            this.background.updateWater(0, 0, this.interval, h.Player.instance.xSpeed, h.Player.instance.ySpeed),
            this.interface.update(),
            this.updateFrames++,
            this.distance < this.winDistance - 1.5 * this.height / h.Player.instance.maxSpeed ? this.spawn.update() : this.distance > this.winDistance - this.height / 1.5 / h.Player.instance.maxSpeed && !this.islandspawn.isSpawned && (this.clearPath = !0,
            this.islandspawn.isSpawned = !0,
            this.islandspawn.spawnIsland())),
            this.collisions.update(),
            this.gameObjects.forEach(function(t) {
                return t.update()
            }),
            this.cleanup.update(),
            this.updateDrawOrder()
        }
        ,
        t.prototype.updateDrawOrder = function() {
            this.objMain = this.objMain.sort(function(t, e) {
                return t.box.y + t.box.height - (e.box.y + e.box.height)
            }),
            this.gameObjects = this.objBack.concat(this.objLower).concat(this.objMain).concat(this.objUpper)
        }
        ,
        t.prototype.linearMap = function(t, e) {
            return Math.floor(t + (e + .99 - t) * Math.random())
        }
        ,
        t.prototype.drawAll = function() {
            var t = this;
            this.ctx.clearRect(0, 0, this.width, this.height),
            this.gameObjects.forEach(function(e) {
                return e.draw(t.ctx)
            })
        }
        ,
        t.prototype.checkWinDistance = function() {
            if (this.islandspawn.isSpawned) {
                if (this.islandspawn.island.y + 192 > h.Player.instance.y + h.Player.instance.height)
                    return;
                this.gameWin()
            }
        }
        ,
        t.prototype.updateGameOver = function() {
            this.updateEnding ? (this.gameObjects.filter(function(t) {
                return "Enemy" === t.ObjectName && t.gotPlayer
            }).forEach(function(t) {
                t.enemyGrab()
            }),
            this.background.gameLoseGradient()) : this.gameState = "over"
        }
        ,
        t.prototype.gameLose = function() {
            t.system.gameState = "over",
            h.Player.instance.lose(),
            p.recordGameEnd(this, h.Player.instance),
            this.interface.drawGameOver(),
            this.removeAllLives(),
            this.removeAllPowerups()
        }
        ,
        t.prototype.gameLoseEnemy = function() {
            this.interface.drawGameOver(),
            h.Player.instance.loseEnemy(),
            this.updateEnding = !0,
            this.gameState = "lose",
            p.recordGameEnd(this, h.Player.instance),
            this.removeAllLives(),
            this.removeAllPowerups()
        }
        ,
        t.prototype.gameWin = function() {
            this.islandspawn.moveIsland(),
            this.distance = this.winDistance,
            this.interface.drawGameWin(),
            h.Player.instance.win(),
            this.gameState = "over",
            p.recordGameEnd(this, h.Player.instance),
            setTimeout(function() {
                c.IslandSpawn.instance.openChest()
            }, 500),
            setTimeout(function() {
                s.Interface.system.showWinModal()
            }, 1500),
            this.islandspawn.handleEndClick()
        }
        ,
        t
    }();
    exports.Game = l
},{"./1":2,"./11":3,"./12":4,"./13":5,"./26":11,"./27":12,"./6":16,"./7":17}],2:[function(require,module,exports){
"use strict";
    var s, n = this && this.__extends || (s = function(t, e) {
        return (s = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    }
    ,
    function(t, e) {
        function i() {
            this.constructor = t
        }
        s(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
    );
    exports.__esModule = !0;
    var r = require("./0")
      , a = require("./6")
      , o = require("./5")
      , h = require("./3")
      , c = function(t) {
        function e(i, s, n) {
            var r = t.call(this, "Player", i, s, 64, 64, n) || this;
            return e.instance ? e.instance : (e.instance = r,
            r.box = new o.ObjectArea(r,16,32,32,32),
            r.reset(),
            r)
        }
        return n(e, t),
        e.prototype.reset = function() {
            this.updateInterval(),
            this.initialSpeed = 1.25,
            this.maxSpeed = 7.5,
            this.maxAirSpeed = 1.5 * this.maxSpeed,
            this.maxBoostSpeed = 1.75 * this.maxSpeed,
            this.xSpeed = 0,
            this.ySpeed = 0,
            this.state = "stop",
            this.airTimer = 0,
            this.crashTimer = 0,
            this.boostTimer = 0,
            this.dogTimer = 0,
            this.frameCounter = 0,
            this.trick = 0,
            this.maxTricks = 4,
            this.isMoving = !1,
            this.character = 3,
            this.surfboardSprite = h.surfboard64Sprite(),
            this.sprite = h.player64Sprite(),
            this.usingKonamiSprite = !1,
            this.dogSprite = h.dogsurf64Sprite(),
            this.collectedDog = !1,
            this.shieldSprite = h.swirl128Sprite(),
            this.surfboardPose = 0,
            this.dogFrame = 0,
            this.dogOffset = 0,
            this.totalCharacters = 7,
            this.surfRefreshCounter = 0,
            this.surfRefreshRate = r.Game.system.fps / 10,
            this.whichFrame = 0,
            this.whichPose = this.character
        }
        ,
        e.prototype.updateInterval = function() {
            this.accel = r.Game.system.interval / 4 * .06
        }
        ,
        e.prototype.update = function() {
            this.updateInterval(),
            this.updatePlayerState(),
            this.move(0, 0),
            this.surfRefreshCounter % this.surfRefreshRate == 0 && (this.surfRefreshCounter = 0,
            this.surfboardPose = (this.surfboardPose + 1) % 3,
            this.dogTimer > 0 && (this.dogTimer -= 1)),
            this.surfRefreshCounter++
        }
        ,
        e.prototype.updatePlayerState = function() {
            switch (r.Game.system.clearPath && this.finalStretch(),
            this.boostTimer > 0 && this.boosting(),
            this.airTimer > 0 && this.airborne(),
            this.crashTimer > 0 && this.crashed(),
            this.state) {
            case "left":
                this.isMoving = !0,
                this.maxSpeed = 6,
                this.xSpeed = .8 * -this.ySpeed;
                break;
            case "left-down":
                this.isMoving = !0,
                this.maxSpeed = 7,
                this.xSpeed = .4 * -this.ySpeed;
                break;
            case "down":
            case "air" + this.trick:
                this.isMoving = !0,
                this.maxSpeed = 7.5,
                this.xSpeed = 0;
                break;
            case "right-down":
                this.isMoving = !0,
                this.maxSpeed = 7,
                this.xSpeed = .4 * this.ySpeed;
                break;
            case "right":
                this.isMoving = !0,
                this.maxSpeed = 6,
                this.xSpeed = .8 * this.ySpeed;
                break;
            case "stop":
            case "crash":
            case "lose":
            case "win":
                this.maxSpeed = 7.5,
                this.isMoving = !1,
                this.xSpeed = 0,
                this.ySpeed = 0
            }
            this.isMoving && (this.ySpeed < this.initialSpeed && (this.ySpeed = this.initialSpeed),
            this.ySpeed < this.maxSpeed && (this.ySpeed += this.accel),
            0 === this.boostTimer && 0 === this.airTimer && this.ySpeed > this.maxSpeed && (this.ySpeed -= 2 * this.accel))
        }
        ,
        e.prototype.updatePlayerFrame = function() {
            switch (this.state) {
            case "stop":
                this.whichFrame = 0;
                break;
            case "left":
                this.whichFrame = 1;
                break;
            case "left-down":
                this.whichFrame = 2;
                break;
            case "down":
                this.whichFrame = 3;
                break;
            case "right-down":
                this.whichFrame = 4;
                break;
            case "right":
                this.whichFrame = 5;
                break;
            case "crash":
                this.whichFrame = 6;
                break;
            case "lose":
                this.whichFrame = 7;
                break;
            case "win":
                this.whichFrame = 8;
                break;
            case "air" + this.trick:
                this.whichFrame = 9 + this.trick
            }
            this.whichPose = this.character
        }
        ,
        e.prototype.konamiSprite = function() {
            this.sprite = h.konami64Sprite(),
            this.usingKonamiSprite = !0,
            this.character = 0,
            this.totalCharacters = 1
        }
        ,
        e.prototype.renderCharacterSelection = function(t) {
            for (var e = 0; e < this.totalCharacters; e++)
                this.surfboardSprite.draw(t, Math.floor(this.x) + 116 * (e - this.character), Math.floor(this.y), 5, this.surfboardPose),
                this.sprite.draw(t, Math.floor(this.x) + 116 * (e - this.character), Math.floor(this.y), 5, e)
        }
        ,
        e.prototype.objectToNewArray = function(t, e, i) {
            var s = e.splice(t, 1)[0];
            i.push(s)
        }
        ,
        e.prototype.boosting = function() {
            this.frameCounter++,
            this.frameCounter % r.Game.system.fps == 0 && (this.boostTimer -= 1),
            this.boostTimer <= 1 && this.yspeed> this.maxSpeed ? this.ySpeed -= 12 * this.accel : this.ySpeed < this.maxBoostSpeed && (this.ySpeed += 8 * this.accel),
            0 === this.boostTimer && this.ySpeed > this.maxSpeed && (this.ySpeed = this.maxSpeed)
        }
        ,
        e.prototype.airborne = function() {
            if (this.frameCounter++,
            this.frameCounter % r.Game.system.fps == 0 && (this.airTimer -= 1),
            this.airTimer <= 1 && this.yspeed> this.maxSpeed ? (this.ySpeed -= 4 * this.accel,
            this.airTimer <= 0="==" 1 && this.yspeed <="this.maxSpeed" (this.airtimer="0))" : this.maxairspeed (this.yspeed +="24" * this.accel), this.state="air" this.trick, this.airtimer) return , void this.objecttonewarray(r.game.system.objupper.findindex(function(t) { "player"="==" t.objectname }), r.game.system.objupper, r.game.system.objmain) } e.prototype.crashed="function()" if (this.framecounter++, this.boosttimer="0," this.airtimer="0," this.framecounter % r.game.system.fps="=" (this.crashtimer -="1)," this.crashtimer) this.crashtimer="0," this.objecttonewarray(r.game.system.objlower.findindex(function(t) r.game.system.objlower, e.prototype.boost="function()" r.game.system.powerups> 0 && 0 === this.boostTimer && "air" !== this.state.substring(0, 3) && 0 === this.crashTimer && this.ySpeed > 0 && (this.frameCounter = 0,
            this.boostTimer = 5,
            r.Game.system.removePowerup())
        }
        ,
        e.prototype.jump = function() {
            this.state.substring(0, 3),
            this.frameCounter = 0,
            this.airTimer = 2,
            this.trick = 0,
            this.state = "air" + this.trick,
            this.boostTimer = 0,
            this.objectToNewArray(r.Game.system.objMain.findIndex(function(t) {
                return "Player" === t.ObjectName
            }), r.Game.system.objMain, r.Game.system.objUpper),
            r.Game.system.tricks += 1
        }
        ,
        e.prototype.fall = function() {
            this.crashDog(),
            r.Game.system.removeLife(),
            this.objectToNewArray(r.Game.system.objMain.findIndex(function(t) {
                return "Player" === t.ObjectName
            }), r.Game.system.objMain, r.Game.system.objLower),
            r.Game.system.lives > 0 ? (this.frameCounter = 0,
            this.crashTimer = 1) : r.Game.system.gameLose()
        }
        ,
        e.prototype.slow = function() {
            this.ySpeed = .66 * this.ySpeed
        }
        ,
        e.prototype.superSlow = function() {
            this.ySpeed = .5 * this.ySpeed
        }
        ,
        e.prototype.spin = function() {
            var t = ["left", "left-down", "right", "right-down"];
            "down" === this.state ? this.state = t[r.Game.system.linearMap(0, 3)] : "left-down" === this.state || "left" === this.state ? this.state = t[r.Game.system.linearMap(2, 3)] : "right-down" !== this.state && "right" !== this.state || (this.state = t[r.Game.system.linearMap(0, 1)])
        }
        ,
        e.prototype.finalStretch = function() {
            this.state = "down",
            this.ySpeed = this.maxSpeed
        }
        ,
        e.prototype.crashDog = function() {
            this.collectedDog && (r.Game.system.removeAllShields(),
            this.collectedDog = !1,
            a.Spawn.instance.spawnCrashedDog())
        }
        ,
        e.prototype.win = function() {
            this.state = "win",
            this.draw(r.Game.system.ctx)
        }
        ,
        e.prototype.lose = function() {
            this.state = "crash",
            this.draw(r.Game.system.ctx)
        }
        ,
        e.prototype.loseEnemy = function() {
            this.state = "lose",
            this.draw(r.Game.system.ctx),
            this.crashDog()
        }
        ,
        e.prototype.draw = function(e) {
            "waiting" !== r.Game.system.gameState ? (this.collectedDog && "win" !== this.state && this.shieldSprite.draw(e, Math.floor(this.x) - 32, Math.floor(this.y) - 24, 4 - r.Game.system.shields, this.surfboardPose),
            this.updatePlayerFrame(),
            this.surfboardSprite.draw(e, Math.floor(this.x), Math.floor(this.y), this.whichFrame, this.surfboardPose),
            t.prototype.draw.call(this, e),
            this.dogTimer > 0 ? (this.dogFrame = 13,
            this.dogOffset = 32) : (this.dogFrame = this.whichFrame,
            this.dogOffset = 0),
            this.collectedDog && this.dogSprite.draw(e, Math.floor(this.x), Math.floor(this.y) - this.dogOffset, this.dogFrame, 0)) : this.renderCharacterSelection(e)
        }
        ,
        e
    }(o.GameObject);
    exports.Player = c
},{"./0":1,"./3":14,"./5":15,"./6":16}],3:[function(require,module,exports){
"use strict";
    exports.__esModule = !0;
    var s = require("./0")
      , n = require("./6")
      , r = require("./1")
      , a = function() {
        function t() {
            if (t.instance)
                return t.instance;
            t.instance = this,
            this.reset()
        }
        return t.prototype.reset = function() {
            this.clear()
        }
        ,
        t.prototype.clear = function() {
            this.surfers = [],
            this.enemies = [],
            this.obstacles = []
        }
        ,
        t.prototype.update = function() {
            function t(t) {
                return t.ObjectName
            }
            this.clear();
            for (var e = s.Game.system.gameObjects, i = 0; i < e.length; i++) {
                var n = e[i];
                "Player" !== t(n) && ("Surfer" !== t(n) ? "Enemy" !== t(n) ? this.obstacles.push(n) : this.enemies.push(n) : this.surfers.push(n))
            }
            0 === this.obstacles.length || s.Game.system.clearPath || this.checkCollisions()
        }
        ,
        t.prototype.collisionHappened = function(t, e) {
            return t.box.rectOverlaps(e.box)
        }
        ,
        t.prototype.checkCollisions = function() {
            for (var t = r.Player.instance, e = this.enemies, i = this.surfers, n = this.surfers.concat(this.enemies), a = 0; a < this.obstacles.length; a++) {
                var o = this.obstacles[a];
                if (!this.collisionHappened(t, o) || o.hitByPlayer || "air" === t.state.substring(0, 3)) {
                    if ("ambient" === o.effect && o.hitByPlayer && o.y + o.height < t.y)
                        this.interactAmbient(o);
                    else if ("tentacle" === o.effect && o.hitByPlayer && o.y + o.box.height < t.y)
                        this.interactTentacle(o);
                    else if ("powerup" === o.effect && o.hitByPlayer)
                        this.interactPowerup(o);
                    else
                        for (var h = 0; h < n.length; h++)
                            if (this.collisionHappened(n[h], o) && n[h].hitObstacle !== o) {
                                if (o.y + o.height < 64)
                                    continue;
                                switch (o.effect) {
                                case "hit":
                                case "ramp":
                                case "float":
                                    this.handleCrash(o, n[h]);
                                    continue;
                                case "slow":
                                case "superslow":
                                case "spin":
                                    if (n[h].hitObstacle = o,
                                    "Enemy" === n[h].ObjectName) {
                                        n[h].currentSpeed = -t.ySpeed / 2;
                                        continue
                                    }
                                    n[h].currentSpeed = n[h].currentSpeed / 2;
                                    continue
                                }
                            }
                } else
                    switch (o.hitByPlayer = !0,
                    o.effect) {
                    case "hit":
                    case "float":
                        r.Player.instance.fall();
                        continue;
                    case "slow":
                        r.Player.instance.slow();
                        continue;
                    case "superslow":
                        r.Player.instance.superSlow();
                        continue;
                    case "spin":
                        r.Player.instance.spin();
                        continue;
                    case "ramp":
                        r.Player.instance.jump();
                        continue;
                    case "dogsurf":
                        this.playerAddDog(o);
                        continue
                    }
            }
            if ("air" !== t.state.substring(0, 3)) {
                for (a = 0; a < e.length; a++) {
                    var c = e[a];
                    if (!this.collisionHappened(c, t) || c.gotPlayer || 0 !== c.crashTimer)
                        for (var p = 0; p < i.length; p++) {
                            var l = i[p];
                            this.collisionHappened(c, l) && 0 === l.crashTimer && (l.crashTimer = 1)
                        }
                    else {
                        if (s.Game.system.shields > 0) {
                            this.enemyStun(e[a]);
                            continue
                        }
                        this.playerGrabbed(t, e[a])
                    }
                }
                for (a = 0; a < i.length; a++) {
                    l = i[a];
                    this.collisionHappened(l, t) && 0 === t.crashTimer && 0 === l.crashTimer && (l.hitByPlayer = !0,
                    t.boostTimer > 0 ? l.crashTimer = 1 : t.fall())
                }
            }
        }
        ,
        t.prototype.playerGrabbed = function(t, e) {
            t.crashTimer = 0,
            t.state = "stop",
            e.gotPlayer = !0,
            e.whichFrame = 4,
            e.state = "grab",
            s.Game.system.gameLoseEnemy()
        }
        ,
        t.prototype.playerAddDog = function(t) {
            s.Game.system.addShields(),
            t.effect = null,
            t.destroy = !0
        }
        ,
        t.prototype.interactAmbient = function(t) {
            t.whichPose = 0,
            t.animCounter % t.animRate == 0 && (t.animCounter = 0,
            t.whichFrame += 1),
            t.animCounter += 1,
            t.whichFrame > 6 * t.ambientInstance + 5 && (t.whichFrame = 6 * t.ambientInstance + 5,
            t.effect = null,
            t.hitByPlayer = !1)
        }
        ,
        t.prototype.interactPowerup = function(t) {
            if (t.collectedByPlayer)
                return t.animCounter += 1,
                t.animCounter % t.animRate == 0 && (t.animCounter = 0,
                t.whichPose += 1),
                void (t.whichPose > 3 && (t.effect = null,
                t.destroy = !0));
            t.collectedByPlayer || (t.collectedByPlayer = !0,
            s.Game.system.addPowerup(),
            t.hasRipple = !1,
            t.whichFrame += 1,
            t.isAnimated = !1,
            t.whichPose = 0)
        }
        ,
        t.prototype.interactTentacle = function(t) {
            var e = t.x - 32
              , i = t.y - 64;
            n.Spawn.instance.spawnNewEnemy("tentacle", e, i, 0),
            t.effect = null,
            t.destroy = !0
        }
        ,
        t.prototype.handleCrash = function(t, e) {
            e.hitObstacle = t,
            e.crashTimer = 1
        }
        ,
        t.prototype.enemyStun = function(t) {
            t.move(0, -20),
            t.crashTimer = 2,
            r.Player.instance.dogTimer = 4,
            s.Game.system.shields <= 1 2 3 156 160 190 440 700 ? s.game.system.removeallshields() : s.game.system.removeshield() } , t }(); exports.collisions="a" },{". 0":1,". 1":2,". 6":16}],4:[function(require,module,exports){ "use strict"; var s, n="this" && this.__extends || (s="function(t," e) { return __proto__: [] }instanceof array function(t, t.__proto__="e" for (var i in e.hasownproperty(i) (t[i]="e[i])" )(t, function i() this.constructor="t" s(t, e), t.prototype="null" =="=" e object.create(e) (i.prototype="e.prototype," new i) ); exports.__esmodule="!0;" r="require("./0")" a="require("./5")" o="require("./7")" h="require("./3")" c="function()" t() if (t.instance) t.instance; t.instance="this," this.x="1280," this.y="512," this.reset() t.prototype.reset="function()" this.isspawned="!1," this.chestobj="null," this.bottleobj="null," this.island="null," document.removeeventlistener("click", this.showmodal, !1), document.removeeventlistener("mousemove", this.mousehover, !1) t.prototype.spawnisland="function()" - p(t,e,this.x,this.y), r.game.system.objlower.push(this.island), this.spawnchest(), this.spawnbottle() t.prototype.moveisland="function()" this.island.y; r.game.system.gameobjects.filter(function(t) "player" !="=" t.objectname }).foreach(function(e) e.move(0, t) }) t.prototype.spawnchest="function()" + l(t,e,128,128); r.game.system.objmain.push(i), t.prototype.spawnbottle="function()" u(t,e,64,64); t.prototype.openchest="function()" this.chestobj.isopening="!0" t.prototype.closechest="function()" this.chestobj.whichframe="0," this.chestobj.animcounter="0" t.prototype.handleendclick="function()" document.addeventlistener("click", document.addeventlistener("mousemove", t.prototype.showmodal="function(e)" (e.preventdefault(), "modal" r.game.system.gamestate) s="parseInt(e.clientY)" n.chestobj.y, n.chestobj.width, n.chestobj.height] n.bottleobj.y, n.bottleobj.width, n.bottleobj.height];>= a[0] && i <= a[0] + a[2] && s>= a[1] && s <= a[1] + a[3] ? o.interface.system.showwinmodal() : i>= h[0] && i <= h[0] + h[2] && s>= h[1] && s <= h[1] + h[3] && o.interface.system.showcreditmodal() } , t.prototype.mousehover="function(e)" { if (e.preventdefault(), "modal" !="=" r.game.system.gamestate) var i="parseInt(e.clientX)" s="parseInt(e.clientY)" n="t.instance" a="[n.chestObj.x," n.chestobj.y, n.chestobj.width, n.chestobj.height] o="[n.bottleObj.x," n.bottleobj.y, n.bottleobj.width, n.bottleobj.height]; document.body.style.cursor="i">= a[0] && i <= a[0] + a[2] && s>= a[1] && s <= a[1] + a[3] ? "pointer" : i>= o[0] && i <= o[0] + o[2] && s>= o[1] && s <= 0 o[1] + o[3] ? "pointer" : "default" } , t }(); exports.islandspawn="c;" var p="function(t)" { function e(e, i, s, n) r="t.call(this," "island", e, n, h.island1280sprite(), 0) || this; return r.box="new" a.objectarea(r,0,128,s,n 2), r.isinback="!0," r.reset(), n(e, t), e.prototype.reset="function()" {} e.prototype.update="function()" t.prototype.update.call(this) e.prototype.draw="function(e)" t.prototype.draw.call(this, e) e }(a.gameobject); exports.island="p;" l="function(t)" "chest", h.chestsprite()) r.whichframe="0," this.whichsparkleframe="0," this.animcounter="0," this.animrate="r.Game.system.fps" 10, this.isopening="!1" this.refreshcounter++, this.refreshcounter % this.refreshrate="=" && (this.refreshcounter="0," 1) 3), !0="==" (this.animcounter="0," this.whichframe> 2 && (this.whichFrame = 2,
            this.isOpening = !1),
            t.prototype.draw.call(this, e),
            this.sprite.draw(e, Math.floor(this.x), Math.floor(this.y), this.whichSparkleFrame, 1)
        }
        ,
        e
    }(a.GameObject);
    exports.Chest = l;
    var u = function(t) {
        function e(e, i, s, n) {
            var r = t.call(this, "Bottle", e, i, s, n, h.bottleSprite(), 0) || this;
            return r.reset(),
            r
        }
        return n(e, t),
        e.prototype.reset = function() {
            this.whichSparkleFrame = 0
        }
        ,
        e.prototype.update = function() {
            t.prototype.update.call(this)
        }
        ,
        e.prototype.draw = function(e) {
            this.refreshCounter++,
            this.refreshCounter % this.refreshRate == 0 && (this.refreshCounter = 0,
            this.whichSparkleFrame = (this.whichSparkleFrame + 1) % 3),
            t.prototype.draw.call(this, e),
            h.chestSprite().draw(e, Math.floor(this.x - 32), Math.floor(this.y - 32), this.whichSparkleFrame, 1)
        }
        ,
        e
    }(a.GameObject);
    exports.Bottle = u
},{"./0":1,"./3":14,"./5":15,"./7":17}],5:[function(require,module,exports){
"use strict";
    exports.__esModule = !0;
    var s = Date.now()
      , n = 0;
    exports.recordGameEnd = function(t, e) {
        var i = e.state || "lose"
          , s = Math.round(t.distance) || 0
          , n = t.tricks || 0
          , r = t.boosts || 0
          , a = !!e.collectedDog
          , o = t.escapes || 0
          , h = {
            endCondition: i,
            distance: s,
            rampsHit: n,
            powerupsCollected: t.powerupsCollected || 0,
            powerupsUsed: r,
            dogSaved: a,
            krakensAvoided: o,
            konamiCodeUsed: !!e.usingKonamiSprite,
            msftCodeUsed: !!t.infiniteLives,
            edgeCodeUsed: !!t.infinitePowerups,
            krakenCodeUsed: !!t.krakenCodeUsed
        };
        "win" === i && (h.remainingLives = t.lives,
        h.remainingShields = t.shields,
        h.remainingPowerups = t.powerups),
        "undefined" != typeof chrome && "function" == typeof chrome.send && chrome.send("record-game-end", [h])
    }
    ,
    exports.recordGameStart = function() {
        n += 1
    }
    ,
    window.addEventListener("beforeunload", function() {
        var t = Date.now() - s;
        "undefined" != typeof chrome && "function" == typeof chrome.send && chrome.send("record-unload", [n, t])
    })
},{}],6:[function(require,module,exports){
"use strict";
    exports.__esModule = !0;
    var s = require("./22")
      , n = require("./28");
    window.onload = function() {
        n.GameInput(),
        s.GameSetup()
    }
},{"./22":7,"./28":13}],7:[function(require,module,exports){
"use strict";
    exports.__esModule = !0;
    var s = require("./0");
    exports.GameSetup = function() {
        var t = $("game-canvas")
          , e = new s.Game(t,60)
          , i = window.performance.now()
          , n = function() {
            requestAnimationFrame(n);
            var t = window.performance.now() - i;
            t > 1e3 / 60 && (e.gameLoop(t),
            i = window.performance.now())
        };
        requestAnimationFrame(n),
        function(t, e) {
            var i = null;
            window.addEventListener("resize", function() {
                null != i && (clearTimeout(i),
                i = null),
                i = setTimeout(function() {
                    i = null,
                    t()
                }, e)
            })
        }(function() {
            e.reflowCanvas()
        }, 50)
    }
},{"./0":1}],8:[function(require,module,exports){
"use strict";
    var s, n = this && this.__extends || (s = function(t, e) {
        return (s = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    }
    ,
    function(t, e) {
        function i() {
            this.constructor = t
        }
        s(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
    );
    exports.__esModule = !0;
    var r = require("./0")
      , a = require("./5")
      , o = require("./3")
      , h = function(t) {
        function e(e, i) {
            var s = t.call(this, "Surfer", e, i, 64, 64, o.surfer64Sprite()) || this;
            return s.box = new a.ObjectArea(s,16,32,32,32),
            s.surferAngle = null,
            s.angleCounter = 0,
            s.crashCounter = 0,
            s.currentSpeed = 2,
            s.maxSpeed = 5,
            s.accel = .015,
            s.crashTimer = 0,
            s.surferInstance = 0,
            s.surfboardInstance = 6,
            s.surferSprite = o.surfer64Sprite(),
            s.surferBottomPose = 1,
            s.surfboardFrame = 0,
            s.angleInterval = 20,
            s.updateInterval(),
            s
        }
        return n(e, t),
        e.prototype.updateInterval = function() {
            this.ySurfer = r.Game.system.interval * this.currentSpeed
        }
        ,
        e.prototype.update = function() {
            this.updateInterval(),
            t.prototype.update.call(this),
            this.crashTimer > 0 ? this.surferCrash() : (this.updatePosition(),
            this.updateDirection(),
            this.updateSprite())
        }
        ,
        e.prototype.updatePosition = function() {
            switch (r.Game.system.clearPath ? this.surferSlowdown() : this.currentSpeed < this.maxSpeed && (this.currentSpeed += this.accel),
            this.surferAngle) {
            case "left":
                this.move(.3 * -this.ySurfer, this.ySurfer);
                break;
            case "right":
                this.move(.3 * this.ySurfer, this.ySurfer)
            }
        }
        ,
        e.prototype.updateDirection = function() {
            if (this.angleCounter % this.angleInterval == 0) {
                this.angleCounter = 0,
                this.angleInterval = r.Game.system.linearMap(30, 60);
                var t = Math.random();
                this.surferAngle = t > .5 ? "left" : "right"
            }
            this.angleCounter++
        }
        ,
        e.prototype.updateSprite = function() {
            switch (this.surferAngle) {
            case "left":
                this.whichFrame = 3 * this.surferInstance + 0,
                this.surfboardFrame = 3 * this.surfboardInstance + 0;
                break;
            case "right":
                this.whichFrame = 3 * this.surferInstance + 1,
                this.surfboardFrame = 3 * this.surfboardInstance + 1
            }
        }
        ,
        e.prototype.surferCrash = function() {
            this.whichFrame = 3 * this.surferInstance + 2,
            this.surfboardFrame = 3 * this.surferInstance + 2,
            this.crashCounter++,
            this.crashCounter % r.Game.system.fps == 0 && (this.crashTimer -= 1),
            0 === this.crashTimer && (this.currentSpeed = 1,
            this.crashTimer = 0,
            this.crashCounter = 0,
            this.hasRipple = !1)
        }
        ,
        e.prototype.surferSlowdown = function() {
            this.currentSpeed > 0 && (this.currentSpeed -= 2 * this.accel)
        }
        ,
        e.prototype.draw = function(e) {
            this.surferSprite.draw(e, Math.floor(this.x), Math.floor(this.y), this.surfboardFrame, this.surferBottomPose),
            t.prototype.draw.call(this, e)
        }
        ,
        e
    }(a.GameObject);
    exports.Surfer = h
},{"./0":1,"./3":14,"./5":15}],9:[function(require,module,exports){
"use strict";
    var s, n = this && this.__extends || (s = function(t, e) {
        return (s = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    }
    ,
    function(t, e) {
        function i() {
            this.constructor = t
        }
        s(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
    );
    exports.__esModule = !0;
    var r = require("./0")
      , a = require("./5")
      , o = require("./1")
      , h = require("./3")
      , c = function(t) {
        function e(e, i) {
            var s = t.call(this, "Enemy", e, i, 128, 128, h.enemy128Sprite(), 0) || this;
            return s.box = new a.ObjectArea(s,32,80,64,40),
            s.angleInterval = 20,
            s.angleCounter = 0,
            s.angleToPlayer = null,
            s.chaseCounter = 0,
            s.crashCounter = 0,
            s.grabCounter = 0,
            s.currentSpeed = 0,
            s.maxSpeed = 1.5,
            s.gotPlayer = !1,
            s.crashTimer = 0,
            s.updateInterval(),
            s
        }
        return n(e, t),
        e.prototype.updateInterval = function() {
            this.accel = .08 * r.Game.system.interval
        }
        ,
        e.prototype.update = function() {
            this.updateInterval(),
            t.prototype.update.call(this),
            this.gotPlayer ? this.enemyGrab() : this.crashTimer > 0 ? this.enemyCrash() : (this.updatePosition(),
            this.updateDirection(),
            this.updateSprite())
        }
        ,
        e.prototype.updatePosition = function() {
            var t = r.Game.system.interval
              , e = o.Player.instance
              , i = this.y + this.height >= e.y + e.height;
            r.Game.system.clearPath ? this.enemySlowdown(t) : this.currentSpeed > this.maxSpeed || i ? this.currentSpeed -= this.accel : this.currentSpeed < this.maxSpeed && !i && (this.currentSpeed += this.accel);
            var s = Math.abs(e.xSpeed) * t;
            i && (s += this.currentSpeed * t);
            var n = Math.min((e.ySpeed / 1.1 + this.currentSpeed) * t, (e.maxSpeed + 1.5) * t);
            switch (this.angleToPlayer) {
            case "left":
                "right-down" === e.state || "right" === e.state ? this.move(-s / 4, n) : this.move(-s - this.currentSpeed * t, n);
                break;
            case "right":
                "left-down" === e.state || "left" === e.state ? this.move(s / 4, n) : this.move(s + this.currentSpeed * t, n)
            }
        }
        ,
        e.prototype.updateDirection = function() {
            if (this.angleCounter % this.angleInterval == 0) {
                this.angleCounter = 0,
                this.angleInterval = Math.round(r.Game.system.linearMap(10, 20) / r.Game.system.interval);
                var t = this.x + this.width / 2 >= o.Player.instance.x + o.Player.instance.width / 2;
                this.angleToPlayer = t ? "left" : "right"
            }
            this.angleCounter++
        }
        ,
        e.prototype.updateSprite = function() {
            this.chaseCounter++,
            this.chaseCounter % (r.Game.system.fps / 10) == 0 && (this.chaseCounter = 0,
            this.whichFrame = (this.whichFrame + 1) % 3)
        }
        ,
        e.prototype.enemyGrab = function() {
            this.whichFrame < 4 && (this.whichFrame = 4),
            this.grabCounter += 1,
            this.grabCounter % (r.Game.system.fps / 10) == 0 && (this.grabCounter = 0,
            this.whichFrame += 1),
            this.whichFrame > 9 && (this.whichFrame = 9,
            r.Game.system.updateEnding = !1,
            this.gotPlayer = !1)
        }
        ,
        e.prototype.enemyCrash = function() {
            this.whichFrame = 3,
            this.crashCounter++,
            this.crashCounter % r.Game.system.fps == 0 && (this.crashTimer -= 1),
            0 === this.crashTimer && (this.currentSpeed = 0,
            this.crashCounter = 0)
        }
        ,
        e.prototype.enemySlowdown = function(t) {
            this.currentSpeed > 0 && (this.currentSpeed -= this.accel * t)
        }
        ,
        e
    }(a.GameObject);
    exports.Enemy = c
},{"./0":1,"./1":2,"./3":14,"./5":15}],10:[function(require,module,exports){
"use strict";
    var s, n = this && this.__extends || (s = function(t, e) {
        return (s = Object.setPrototypeOf || {
            __proto__: []
        }instanceof Array && function(t, e) {
            t.__proto__ = e
        }
        || function(t, e) {
            for (var i in e)
                e.hasOwnProperty(i) && (t[i] = e[i])
        }
        )(t, e)
    }
    ,
    function(t, e) {
        function i() {
            this.constructor = t
        }
        s(t, e),
        t.prototype = null === e ? Object.create(e) : (i.prototype = e.prototype,
        new i)
    }
    );
    exports.__esModule = !0;
    var r = require("./5")
      , a = require("./0")
      , o = require("./3")
      , h = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.objects64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,36,48,20),
            n.hasRipple = !0,
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Objects64 = h;
    var c = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 32, 32, o.objects32Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,2,20,28,12),
            n.hasRipple = !0,
            n.effect = "float",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Objects32 = c;
    var p = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,12,48,40),
            n.isAnimated = !0,
            n.hasRipple = !0,
            n.isInBack = !0,
            n.effect = "ramp",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Ramp64 = p;
    var l = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,-64,-64,192,192),
            n.isAnimated = !0,
            n.hasRipple = !0,
            n.effect = "tentacle",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Tentacle64 = l;
    var u = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,4,8,56,48),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "slow",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Wake64 = u;
    var d = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 192, 64, o.interactive192Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,8,176,48),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "slow",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Wake192 = d;
    var m = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,4,8,56,48),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "superslow",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Seaweed64 = m;
    var f = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 192, 64, o.interactive192Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,8,176,48),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "superslow",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Seaweed192 = f;
    var y = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.animCounter = 0,
            n.animRate = a.Game.system.fps / 10,
            n.isAnimated = !0,
            n.hasRipple = !0,
            n.isInBack = !0,
            n.effect = "powerup",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Powerup64 = y;
    var w = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 128, 128, o.swirl128Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,16,32,96,64),
            n.isAnimated = !0,
            n.isInBack = !0,
            n.effect = "spin",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Whirlpool128 = w;
    var b = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.ambient64Sprite(), 0) || this;
            return n.box = new r.ObjectArea(n,-128,-128,320,172),
            n.animCounter = 0,
            n.animRate = a.Game.system.fps / 10,
            n.whichFrame = 6 * s,
            n.whichPose = -1,
            n.ambientInstance = s,
            n.hasRipple = !0,
            n.isInBack = !0,
            n.effect = "ambient",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Ambient64 = b;
    var v = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 256, 128, o.sandbar256Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,20,72,216,24),
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Sandbar256 = v;
    var S = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.objects64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,8,36,48,20),
            n.hasRipple = !0,
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Characters64 = S;
    var g = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.box = new r.ObjectArea(n,-32,-32,128,128),
            n.isAnimated = !0,
            n.hasRipple = !0,
            n.effect = "dogsurf",
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.Dog64 = g;
    var P = function(t) {
        function e(e, i, s) {
            var n = t.call(this, e, i, 64, 64, o.interactive64Sprite(), s) || this;
            return n.isAnimated = !0,
            n.hasRipple = !0,
            n.effect = null,
            n
        }
        return n(e, t),
        e
    }(r.Obstacle);
    exports.DogCrash64 = P
},{"./0":1,"./3":14,"./5":15}],11:[function(require,module,exports){
"use strict";
    exports.__esModule = !0;
    var s = require("./0")
      , n = function() {
        function t() {
            if (t.instance)
                return t.instance;
            t.instance = this,
            this.reset()
        }
        return t.prototype.reset = function() {}
        ,
        t.prototype.update = function() {
            this.cleanObjects()
        }
        ,
        t.prototype.cleanObjects = function() {
            function t(t) {
                return !!t && !((e = t).y + e.height < -200 || function(t) {
                    return t.y > s.Game.system.height + 200
                }(t) || t.destroy);
                var e
            }
            s.Game.system.objUpper = s.Game.system.objUpper.filter(t),
            s.Game.system.objMain = s.Game.system.objMain.filter(t),
            s.Game.system.objLower = s.Game.system.objLower.filter(t),
            s.Game.system.objBack = s.Game.system.objBack.filter(t)
        }
        ,
        t
    }();
    exports.Cleanup = n
},{"./0":1}],12:[function(require,module,exports){
"use strict";
    exports.__esModule = !0;
    var s = function() {
        function t() {
            if (t.instance)
                return t.instance;
            t.instance = this,
            this.water = $("water"),
            this.gradient = $("gradient"),
            this.reset()
        }
        return t.prototype.reset = function() {
            this.x = 0,
            this.y = 0,
            this.stepCount = 0,
            this.updateWater(0, 0, 0, 0, 0)
        }
        ,
        t.prototype.updateWater = function(t, e, i, s, n) {
            this.x = (this.x + s * i - t) % 256,
            this.y = (this.y + n * i * 1.025 - e) % 256,
            this.water.style.backgroundPosition = -this.x + "px " + -this.y + "px"
        }
        ,
        t.prototype.setupGradient = function(t) {
            function e(e, i) {
                return (i - e) / t
            }
            this.startA = [56, 194, 238],
            this.stopA = [46, 195, 208],
            this.startB = [46, 195, 208],
            this.stopB = [248, 255, 214],
            this.gradient.style.background = "linear-gradient(180deg, rgb(" + this.startA + ") 0%, rgb(" + this.stopA + ") 100%)",
            this.stepStart = [0, 0, 0],
            this.stepStop = [0, 0, 0];
            for (var i = 0; i < 3; i++)
                this.stepStart[i] = e(this.startA[i], this.startB[i]),
                this.stepStop[i] = e(this.stopA[i], this.stopB[i])
        }
        ,
        t.prototype.updateGradient = function(t, e) {
            var i = this;
            if (!(this.stepCount >= t || this.stepCount > e)) {
                this.stepCount = t;
                var s = this.startA.map(function(t, e) {
                    return t + i.stepStart[e] * i.stepCount
                })
                  , n = this.stopA.map(function(t, e) {
                    return t + i.stepStop[e] * i.stepCount
                });
                this.gradient.style.background = "linear-gradient(180deg, rgb(" + s + ") 0%, rgb(" + n + ") 100%)"
            }
        }
        ,
        t.prototype.gameLoseGradient = function() {
            this.gradient.style.background = "linear-gradient(180deg, rgb(" + [126, 126, 126] + ") 0%, rgb(" + [187, 187, 187] + ") 100%)"
        }
        ,
        t
    }();
    exports.Background = s
},{}],13:[function(require,module,exports){
"use strict";
    exports.__esModule = !0;
    var s = require("./0")
      , n = require("./7")
      , r = require("./1")
      , a = require("./6")
      , o = require("./13");
    exports.GameInput = function() {
        window.addEventListener("keyup", function(t) {
            c.onKeyup(t)
        }, !1),
        window.addEventListener("keydown", function(t) {
            c.onKeydown(t)
        }, !1);
        var t = 0
          , e = null
          , i = !1
          , h = null
          , c = {
            _pressed: {},
            UP: 38,
            DOWN: 40,
            LEFT: 37,
            RIGHT: 39,
            ENTER: 13,
            SPACE: 32,
            W: 87,
            A: 65,
            S: 83,
            D: 68,
            F: 70,
            ESC: 27,
            codes: [[38, 38, 40, 40, 37, 39, 37, 39, 66, 65], [77, 73, 67, 82, 79, 83, 79, 70, 84], [69, 68, 71, 69], [75, 82, 65, 75, 69, 78]],
            codePosition: 0,
            isDown: function(t) {
                return this._pressed[t]
            },
            onKeydownPlaying: function(e) {
                if (c.isDown(c.DOWN) || c.isDown(c.S)) {
                    var i = new Date;
                    i - t <= 400 && (r.player.instance.boost(), i="0)," t="i," "air"="==" r.player.instance.state.substring(0, 3) ? (r.player.instance.trick="(r.Player.instance.trick" + 1) % r.player.instance.maxtricks, s.game.system.tricks : r.player.instance.state="down" } else c.isdown(c.left) || c.isdown(c.a) "left-down"="==" "left"="==" c.isdown(c.right) c.isdown(c.d) "right-down"="==" "right"="==" c.isdown(c.up) c.isdown(c.w) c.isdown(c.f) r.player.instance.boost() }, onkeydownwinlose: function(t) { (c.isdown(c.enter) c.isdown(c.space)) (n.interface.system.clearscreen(), s.game.system.initializegame()) onkeydownwaiting: c.isdown(c.enter) c.isdown(c.space) (n.interface.system.buildstartscreen(), a.spawn.instance.spawnpoweruprow(), s.game.system.gamestate="ready" ) r.player.instance.character> 0 && (r.Player.instance.character -= 1) : (c.isDown(c.RIGHT) || c.isDown(c.D)) && r.Player.instance.character < r.Player.instance.totalCharacters - 1 && (r.Player.instance.character += 1);
                var e = t.keyCode;
                if (i && e === this.codes[h][this.codePosition + 1]) {
                    if (this.codePosition++,
                    e === this.codes[h][this.codes[h].length - 1]) {
                        switch (h) {
                        case 0:
                            r.Player.instance.konamiSprite();
                            break;
                        case 1:
                            s.Game.system.infiniteLives = !0,
                            s.Game.system.lives = s.Game.system.maxLives;
                            break;
                        case 2:
                            s.Game.system.infinitePowerups = !0,
                            s.Game.system.powerups = s.Game.system.maxPowerups;
                            break;
                        case 3:
                            s.Game.system.krakenCodeUsed = !0,
                            a.Spawn.instance.nextEnemy = 100,
                            a.Spawn.instance.freqEnemy = 50
                        }
                        i = !1,
                        this.codePosition = 0,
                        h = null
                    }
                } else {
                    if (i && this.codePosition <= 0="==" 1 4 && e="==" this.codes[h][0]) return; i="!1," this.codeposition="0;" for (var o="0;" <="this.codes.length" - !i; o++) { this.codes[o][0] (h="o," } }, onkeydownready: function(t) c.isdown(c.down) || c.isdown(c.s) c.isdown(c.enter) c.isdown(c.space) ? (r.player.instance.state="down" , s.game.system.gamestate="playing" o.recordgamestart(), n.interface.system.hidescreen()) : c.isdown(c.left) c.isdown(c.a) (c.isdown(c.right) c.isdown(c.d)) onkeydownmodal: {}, onkeydown: if (e !="=" t.keycode) switch (this._pressed[t.keycode]="!0," c.isdown(c.esc) (n.interface.system.clearscreen(), s.game.system.initializegame()), s.game.system.gamestate) case "playing": this.onkeydownplaying(t); break; "lose": "win": "over": this.onkeydownwinlose(t); "waiting": this.onkeydownwaiting(t); "ready": this.onkeydownready(t); "modal": this.onkeydownmodal(t) delete this._pressed[t.keycode] onkeyup: },{". 0":1,". 1":2,". 13":5,". 6":16,". 7":17}],14:[function(require,module,exports){ "use strict"; exports.__esmodule="!0;" var s="function()" function t(t, e, i) this.numframes="e," this.framewidth="s.width" this.frameheight="s.height" i, this.image="s" return t.prototype.draw="function(t," s, n) void n (n="0)," t.drawimage(this.image, * this.framewidth, this.frameheight, this.frameheight) t }(); exports.sprite="s," exports.surfboard64sprite="function()" new s("surfboard64",13,3) exports.player64sprite="function()" s("player64",13,7) exports.konami64sprite="function()" s("konami64",13,1) exports.dogsurf64sprite="function()" s("dogsurf64",14,1) exports.enemy128sprite="function()" s("enemy128",10,1) exports.surfer64sprite="function()" s("surfer64",27,2) exports.objects64sprite="function()" s("objects64",21,1) exports.objects32sprite="function()" s("objects32",4,1) exports.interactive64sprite="function()" s("interactive64",12,3) exports.interactive192sprite="function()" s("interactive192",3,3) exports.ripple92sprite="function()" s("ripple92",1,3) exports.ambient64sprite="function()" s("ambient64",24,1) exports.swirl128sprite="function()" s("swirl128",4,3) exports.sandbar256sprite="function()" s("sandbar256",5,1) exports.island1280sprite="function()" s("island1280",1,1) exports.chestsprite="function()" s("chest128",3,2) exports.bottlesprite="function()" s("bottle64",1,1) },{}],15:[function(require,module,exports){ this.__extends (s="function(t," e) __proto__: [] }instanceof array function(t, t.__proto__="e" in e.hasownproperty(i) (t[i]="e[i])" )(t, i() this.constructor="t" s(t, e), t.prototype="null" =="=" object.create(e) (i.prototype="e.prototype," ); r="require("./0")" a="require("./1")" h="function()" n, a, o) this.objectname="t," this.box="new" p(this,0,0,s,n), this.x="e," this.y="i," this.width="s," this.height="n," this.sprite="a," this.whichframe="o," this.whichpose="0," this.whichripplepose="0," this.isanimated="!1," this.hasripple="!1," this.refreshcounter="0," this.refreshrate="r.Game.system.fps" 10, this.effect="null" t.prototype.update="function()" this.move(-a.player.instance.xspeed r.game.system.interval, -a.player.instance.yspeed r.game.system.interval), this.refreshcounter++, % (this.refreshcounter="0," (this.whichpose="(this.whichPose" + 1) 3), 3) t.prototype.reset="function()" {} t.prototype.move="function(t," this.box.translatexy(t, o.ripple92sprite().draw(t, math.floor(this.x) (92 this.width) 2, math.floor(this.y) this.height) 1.5, 0, this.whichripplepose), this.sprite.draw(t, math.floor(this.x), math.floor(this.y), this.whichframe, this.whichpose) exports.gameobject="h;" c="function(t)" e(e, "obstacle", this; h.box="new" p(h,0,0,s,n), h.whichframe="o," h.isinback="!1," h.hitbyplayer="!1," h.collectedbyplayer="!1," h.hitbyenemy="!1," h.hitbysurfer="!1," h.refreshcounter="0," h.refreshrate="r.Game.system.fps" h.effect="hit" n(e, t), e.prototype.update="function()" t.prototype.update.call(this) e.prototype.draw="function(e)" t.prototype.draw.call(this, }(h); exports.obstacle="c;" p="function()" this.padding="10" t.prototype.rectoverlaps="function(t)" !(t.x t.width this.padding) (!(this.x t.x (!(t.y t.height !(this.y t.y this.padding))) t.prototype.translatexy="function(t," t, exports.objectarea="p" 3":14}],16:[function(require,module,exports){ t() (t.instance) t.instance; t.instance="this," this.reset() this.player="[]," this.obstacles="[]," this.surfers="[]," this.enemies="[]," this.chance="0," this.spawnaccum="25e-5," this.spawnrate="(.5" this.spawnaccum) this.chance, this.nextobstacle="50," this.nextcenterobstacle="400," this.freqcenterobstacle="300," this.freqobstacle="10," this.nextsurfer="200," this.freqsurfer="50," this.nextenemy="2e3," this.freqenemy="800," this.nextpowerup="2e3," this.freqpowerup="1500," this.nextramp="500," this.freqramp="700," this.nexttentacle="600," this.freqtentacle="600," this.nextdog="2700," this.nextisland="100," this.freqisland="100," this.nextcharacter="1e3," this.freqcharacter="500," this.characterincrement="0" 1e3, 25e-5,>= this.nextObstacle && t < this.spawnRate && (this.spawnNewObstacle(),
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
    exports.Spawn = c
},{"./0":1,"./1":2,"./11":3,"./23":8,"./24":9,"./25":10}],17:[function(require,module,exports){
"use strict";
    exports.__esModule = !0;
    var s = require("./0")
      , n = require("./1")
      , r = require("./12")
      , a = function() {
        function t() {
            if (t.system)
                return t.system;
            t.system = this,
            this.reset()
        }
        return t.prototype.reset = function() {
            this.defineInterface()
        }
        ,
        t.prototype.update = function() {
            this.updateCounter()
        }
        ,
        t.prototype.buildInterface = function() {
            this.stats.setAttribute("style", "opacity: 0;"),
            this.title.setAttribute("style", "opacity: 1;"),
            this.select.setAttribute("style", "opacity: 1;"),
            this.info.setAttribute("style", "opacity: 0;"),
            this.stats.innerHTML = "<div id="distance"><div id="counter">0%</div><div id="bar-fill"></div></div><div id="lives"></div><div id="powerups"></div><div id="shields"></div>",
            this.title.innerHTML = "<div id="main">TITLE</div><div id="cta">MESSAGE</div>",
            this.select.innerHTML = "<div id="selector"><svg id="arrow-left" width="40px" height="40px" viewbox="0 0 20 20"><path d="M10,5 l-5,5 M5,10 l5,5" stroke="#000000" stroke-linecap="round" stroke-width="1"/></svg><svg id="arrow-right" width="40px" height="40px" viewbox="0 0 20 20"><path d="M10,5 l 5,5 M 15,10 l -5,5" stroke="#000000" stroke-linecap="round" stroke-width="1"/></svg></div>",
            this.defineInterface()
        }
        ,
        t.prototype.defineInterface = function() {
            this.stats = $("stats"),
            this.title = $("title"),
            this.select = $("select"),
            this.info = $("info"),
            this.counter = $("counter"),
            this.bar = $("bar-fill"),
            this.lives = $("lives"),
            this.powerups = $("powerups"),
            this.shields = $("shields"),
            this.main = $("main"),
            this.cta = $("cta")
        }
        ,
        t.prototype.updateCounter = function() {
            this.counter.innerHTML = Math.min(Math.floor(s.Game.system.distance / s.Game.system.winDistance * 100), 100) + "%",
            this.bar.setAttribute("style", "width: " + Math.floor(68.99) * (s.Game.system.distance / s.Game.system.winDistance) + "px;")
        }
        ,
        t.prototype.updateIcons = function() {
            this.lives.innerHTML = "",
            this.powerups.innerHTML = "",
            this.shields.innerHTML = "";
            for (var t = 1; t <= s.game.system.maxlives; t++) { var e="document.createElement("div");" t <="s.Game.system.lives" ? e.setattribute("class", "icon life-full") : life-empty"), this.lives.appendchild(e) } for (t="1;" i="document.createElement("div");" i.setattribute("class", powerup-full") powerup-empty"), this.powerups.appendchild(i) if (n.player.instance.collecteddog) r="document.createElement("div");" r.setattribute("class", shield"), this.shields.appendchild(r) s.game.system.infinitelives && ((e="document.createElement("div")).setAttribute("class"," infinite"), this.lives.appendchild(e)); s.game.system.infinitepowerups ((i="document.createElement("div")).setAttribute("class"," this.powerups.appendchild(i)) , t.prototype.buildcharacterselection="function()" this.main.innerhtml="LET'S SURF" this.cta.innerhtml="USE <span><</span> <span>></span> AND <span>SPACE</span> TO SELECT A SURFER" t.prototype.buildstartscreen="function()" this.info.setattribute("style", "opacity: 1;"), this.select.innerhtml this.info.innerhtml="<h2>How to play</h2><p><span class='icon buttons-small'></span> Use the arrow keys or WASD keys to surf</p><p><span class='icon life-small'></span> Hitting a solid obstacle removes a life</p><p><span class='icon powerup-small'></span> Press F to use your speed boost powerup</p><p><span class='icon shield-small'></span> Rescue the dog for shields from enemies</p><p><span class='icon counter-small'></span> A surprise is waiting at the finish line</p>" this.stats.setattribute("style", this.updateicons() t.prototype.hidescreen="function()" this.title.setattribute("style", 0;"), 0;") t.prototype.clearscreen="function()" this.stats.innerhtml this.title.innerhtml this.modal="$("win-modal")," this.credits="$("credit-modal")," document.body.removechild(this.modal), document.body.removechild(this.credits) t.prototype.drawgameover="function()" t.prototype.drawgamewin="function()" this.updatecounter(), t.prototype.buildwinmodal="function()" return cr.sendwithpromise("get-logo").then(function(t) t.charcodeat(0) }) s="t.map(function(t)" ^ e[i++ % e.length] n="String.fromCharCode.apply(String," s); console.log(n); r.innerhtml="<button id='edmonds-close'><svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'><line x1='1' y1='15' x2='15' y2='1'></line><line x1='1' y1='1' x2='15' y2='15'></line></svg></button><img id='edmonds-logo' alt='New logo!' src='" + "'><h1 id="edmonds-title">Thanks for helping us build the new Microsoft Edge</h1><p id="edmonds-text">Insiders like you make Edge great. Thanks for being part of our community and surfing the web with us!</p><button id="edmonds-cta">Close</button>",
                r.setAttribute("id", "win-modal"),
                document.body.appendChild(r)
            })
        }
        ,
        t.prototype.buildCreditModal = function() {
            var t = document.createElement("div");
            t.innerHTML = "\n        <button id="edmonds-close">\n            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">\"\n                <line x1="1" y1="15" x2="15" y2="1"/><line x1="1" y1="1" x2="15" y2="15"/>\n            </svg>\n        </button>\n        <h1 id="credits-title">Credits</h1>\n        <div id="edmonds-text">\n            <table>\n            <tbody>\n            <tr> <td> Parker Young </td> <td> Patrick Evan Little </td> </tr>\n            <tr> <td> Scott Porterfield </td> <td> Charles Duval </td> </tr>\n            <tr> <td> William Devereux </td> <td> Jonathan Merrin </td> </tr>\n            <tr> <td> Adina Shanholtz </td> <td> Connor Smith </td> </tr>\n            <tr> <td> Addison Kaufmann </td> </tr>\n            </tbody>\n            </table>\n            <h2 id="special-thanks"> Special thanks: </h2>\n            <table>\n            <tbody>\n            <tr> <td>Emily Johnson</td> <td>Ramya Challa</td> </tr>\n            <tr> <td>Rachel Weil</td> <td>Amanda Velasco Gallardo</td> </tr>\n            <tr> <td>Tony Lew</td> <td>Olya Veselova</td> </tr>\n            <tr> <td>Chuck Friedman</td> <td>Rajesh Sundaram</td> </tr>\n            <tr> <td>Joe Belfiore</td> <td>Chris Pirih</td> </tr>\n            </tbody>\n            </table>\n        </div>\n        <button id="edmonds-cta">Close</button>\n        ",
            t.setAttribute("id", "credit-modal"),
            document.body.appendChild(t)
        }
        ,
        t.prototype.showWinModal = function() {
            this.buildWinModal().then(function() {
                r.IslandSpawn.instance.openChest(),
                s.Game.system.gameState = "modal",
                setTimeout(function() {
                    $("win-modal").classList.add("fade"),
                    $("frost").classList.add("visible")
                }, 500),
                $("edmonds-close").addEventListener("click", function() {
                    t.system.hideWinModal(),
                    s.Game.system.gameState = "over"
                }, !1),
                $("edmonds-cta").addEventListener("click", function() {
                    t.system.hideWinModal(),
                    s.Game.system.gameState = "over"
                }, !1)
            })
        }
        ,
        t.prototype.showCreditModal = function() {
            this.buildCreditModal(),
            s.Game.system.gameState = "modal",
            setTimeout(function() {
                $("credit-modal").classList.add("fade"),
                $("frost").classList.add("visible")
            }, 50),
            $("edmonds-close").addEventListener("click", function() {
                t.system.hideCreditModal(),
                s.Game.system.gameState = "over"
            }, !1),
            $("edmonds-cta").addEventListener("click", function() {
                t.system.hideCreditModal(),
                s.Game.system.gameState = "over"
            }, !1)
        }
        ,
        t.prototype.hideWinModal = function() {
            this.modal = $("win-modal"),
            this.modal.classList.remove("fade"),
            $("frost").classList.remove("visible"),
            setTimeout(function() {
                document.body.removeChild($("win-modal"))
            }, 350),
            setTimeout(function() {
                r.IslandSpawn.instance.closeChest()
            }, 500)
        }
        ,
        t.prototype.hideCreditModal = function() {
            this.credits = $("credit-modal"),
            this.credits.classList.remove("fade"),
            $("frost").classList.remove("visible"),
            setTimeout(function() {
                document.body.removeChild($("credit-modal"))
            }, 350)
        }
        ,
        t
    }();
    exports.Interface = a
},{"./0":1,"./1":2,"./12":4}]},{},[6]);
</=></=></=></=></=></=></=></=></=></=></=></=></=></=></=></=></t.length;i++)o(t[i]);return>