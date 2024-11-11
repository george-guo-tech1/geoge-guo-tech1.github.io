'use strict';

// const socket=io('/surf');
// // socket.emit('join-room',ROOM_ID,GEORGE)
// socket.on('user-connected',(userId)=>{
//     console.log('您已经链接,'+'3001端口的peerjs为您产生的id是'+userId)});
// const myPeer= new Peer(undefined,{
//     host:   '/'
//     ,port: '3001'    
// })
// myPeer.on('open',id =>{
//     socket.emit('join-room',window.location.href.match(/\w\/(.{2,10})\//)[1],id)
// })
!function(m) {
  /**
   * @param {string} i
   * @return {?}
   */
  function t(i) {
    if (n[i]) {
      return n[i].exports;
    }
    var module = n[i] = {
      i : i,
      l : false,
      exports : {}
    };
    return m[i].call(module.exports, module, module.exports, t), module.l = true, module.exports;
  }
  var n = {};
  /** @type {!Array} */
  t.m = m;
  t.c = n;
  /**
   * @param {!Function} d
   * @param {string} name
   * @param {!Function} n
   * @return {undefined}
   */
  t.d = function(d, name, n) {
    if (!t.o(d, name)) {
      Object.defineProperty(d, name, {
        enumerable : true,
        get : n
      });
    }
  };
  /**
   * @param {!Object} x
   * @return {undefined}
   */
  t.r = function(x) {
    if ("undefined" != typeof Symbol && Symbol.toStringTag) {
      Object.defineProperty(x, Symbol.toStringTag, {
        value : "Module"
      });
    }
    Object.defineProperty(x, "__esModule", {
      value : true
    });
  };
  /**
   * @param {!Object} value
   * @param {number} defaultValue
   * @return {?}
   */
  t.t = function(value, defaultValue) {
    if (1 & defaultValue && (value = t(value)), 8 & defaultValue) {
      return value;
    }
    if (4 & defaultValue && "object" == typeof value && value && value.__esModule) {
      return value;
    }
    /** @type {!Object} */
    var d = Object.create(null);
    if (t.r(d), Object.defineProperty(d, "default", {
      enumerable : true,
      value : value
    }), 2 & defaultValue && "string" != typeof value) {
      var s;
      for (s in value) {
        t.d(d, s, function(subel) {
          return value[subel];
        }.bind(null, s));
      }
    }
    return d;
  };
  /**
   * @param {!Object} module
   * @return {?}
   */
  t.n = function(module) {
    /** @type {function(): ?} */
    var n = module && module.__esModule ? function() {
      return module.default;
    } : function() {
      return module;
    };
    return t.d(n, "a", n), n;
  };
  /**
   * @param {!Function} e
   * @param {string} input
   * @return {?}
   */
  t.o = function(e, input) {
    return Object.prototype.hasOwnProperty.call(e, input);
  };
  /** @type {string} */
  t.p = "/";
  t(t.s = 21);
}([function(canCreateDiscussions, exports, $) {
  /** @type {boolean} */
  exports.__esModule = true;
  var data = $(7);
  var $realtime = $(11);
  var player = $(6);
  var ui = $(26);
  var box = $(27);
  var scope = $(1);
  var _c = $(12);
  var self = $(13);
  var Game = function() {
    /**
     * @param {!HTMLElement} canvas
     * @param {number} fps
     * @return {?}
     */
    function init(canvas, fps) {
      if (init.system) {
        return init.system;
      }
      init.system = this;
      /** @type {!HTMLElement} */
      this.canvas = canvas;
      /** @type {number} */
      this.fps = fps;
      /** @type {number} */
      this.interval = this.fps / 60;
      this.collisions = new $realtime.Collisions;
      this.spawn = new player.Spawn;
      this.cleanup = new ui.Cleanup;
      this.background = new box.Background;
      this.islandspawn = new _c.IslandSpawn;
      this.interface = new data.Interface;
      this.initializeGame();
    }
    return init.prototype.initializeGame = function() {
      this.defineCanvas(this.canvas);
      this.resetStats();
      this.resetGame();
      this.interface.buildInterface();
      this.spawn.spawnPlayer(this.width, this.height);
      this.interface.buildCharacterSelection();
      this.background.setupGradient(this.winDistance);
    }, init.prototype.defineCanvas = function(canvas) {
      this.ctx = canvas.getContext("2d");
      /** @type {boolean} */
      this.ctx.imageSmoothingEnabled = false;
      /** @type {number} */
      canvas.width = document.body.clientWidth;
      /** @type {number} */
      canvas.height = window.innerHeight;
      /** @type {string} */
      canvas.style.width = canvas.width + "px";
      /** @type {string} */
      canvas.style.height = canvas.height + "px";
      /** @type {number} */
      this.width = canvas.width;
      /** @type {number} */
      this.height = canvas.height;
    }, init.prototype.resetStats = function() {
      /** @type {number} */
      this.lives = 3;
      /** @type {number} */
      this.maxLives = 3;
      /** @type {number} */
      this.powerups = 0;
      /** @type {number} */
      this.powerupsCollected = 0;
      /** @type {number} */
      this.maxPowerups = 3;
      /** @type {number} */
      this.shields = 0;
      /** @type {number} */
      this.maxShields = 3;
      /** @type {number} */
      this.distance = 0;
      /** @type {number} */
      this.winDistance = 7900;
      /** @type {boolean} */
      this.clearPath = false;
      /** @type {number} */
      this.dodges = 0;
      /** @type {number} */
      this.avoids = 0;
      /** @type {number} */
      this.tricks = 0;
      /** @type {number} */
      this.boosts = 0;
      /** @type {number} */
      this.escapes = 0;
      /** @type {number} */
      this.score = 0;
      /** @type {boolean} */
      this.infiniteLives = false;
      /** @type {boolean} */
      this.infinitePowerups = false;
      /** @type {boolean} */
      this.krakenCodeUsed = false;
      /** @type {number} */
      this.updateFrames = 0;
      /** @type {boolean} */
      this.updateEnding = false;
    }, init.prototype.resetGame = function() {
      /** @type {string} */
      this.gameState = "waiting";
      /** @type {!Array} */
      this.gameObjects = [];
      /** @type {!Array} */
      this.objUpper = [];
      /** @type {!Array} */
      this.objMain = [];
      /** @type {!Array} */
      this.objLower = [];
      /** @type {!Array} */
      this.objBack = [];
      this.interface.reset();
      this.background.reset();
      this.collisions.reset();
      this.spawn.reset();
      this.islandspawn.reset();
      this.cleanup.reset();
    }, init.prototype.reflowCanvas = function() {
      this.defineCanvas(this.canvas);
      var c = scope.Player.instance;
      /** @type {number} */
      var i = Math.round(this.width / 2) - (c.x + c.width / 2);
      /** @type {number} */
      var from = Math.round(this.height / 3) - (c.y + c.height / 2);
      this.gameObjects.forEach(function(events) {
        return events.move(i, from);
      });
      this.background.updateWater(i, from, this.interval, c.xSpeed, c.ySpeed);
    }, init.prototype.addLife = function() {
      if (this.lives < this.maxLives) {
        this.lives += 1;
        this.interface.updateIcons();
      }
    }, init.prototype.removeLife = function() {
      if (this.lives > 0 && !this.infiniteLives) {
        this.lives -= 1;
      }
      this.interface.updateIcons();
    }, init.prototype.removeAllLives = function() {
      /** @type {boolean} */
      this.infiniteLives = false;
      /** @type {number} */
      this.lives = 0;
      this.interface.updateIcons();
    }, init.prototype.addPowerup = function() {
      if (this.powerups < this.maxPowerups) {
        this.powerups += 1;
        this.powerupsCollected += 1;
        this.interface.updateIcons();
      }
    }, init.prototype.removePowerup = function() {
      if (this.powerups > 0 && !this.infinitePowerups) {
        this.powerups -= 1;
      }
      this.interface.updateIcons();
    }, init.prototype.removeAllPowerups = function() {
      /** @type {boolean} */
      this.infinitePowerups = false;
      /** @type {number} */
      this.powerups = 0;
      this.interface.updateIcons();
    }, init.prototype.addShields = function() {
      /** @type {boolean} */
      scope.Player.instance.collectedDog = true;
      this.shields = this.maxShields;
      this.interface.updateIcons();
    }, init.prototype.removeShield = function() {
      if (this.shields > 0) {
        this.shields -= 1;
      }
      this.interface.updateIcons();
    }, init.prototype.removeAllShields = function() {
      /** @type {number} */
      this.shields = 0;
      this.interface.updateIcons();
    }, init.prototype.gameLoop = function(time) {
      if ("playing" === this.gameState || "ready" === this.gameState) {
        /** @type {number} */
        this.interval = time / (1e3 / this.fps);
        this.updateAll();
        this.checkWinDistance();
      } else {
        if ("lose" === this.gameState) {
          this.updateGameOver();
        }
      }
      this.updateDrawOrder();
      this.drawAll();
    }, init.prototype.updateAll = function() {
      if (scope.Player.instance.isMoving) {
        this.distance += scope.Player.instance.ySpeed * init.system.interval / scope.Player.instance.maxSpeed;
        if (this.updateFrames % (1 * this.fps) == 0) {
          this.background.updateGradient(this.distance, this.winDistance);
        }
        this.background.updateWater(0, 0, this.interval, scope.Player.instance.xSpeed, scope.Player.instance.ySpeed);
        this.interface.update();
        this.updateFrames++;
        if (this.distance < this.winDistance - 1.5 * this.height / scope.Player.instance.maxSpeed) {
          this.spawn.update();
        } else {
          if (this.distance > this.winDistance - this.height / 1.5 / scope.Player.instance.maxSpeed && !this.islandspawn.isSpawned) {
            /** @type {boolean} */
            this.clearPath = true;
            /** @type {boolean} */
            this.islandspawn.isSpawned = true;
            this.islandspawn.spawnIsland();
          }
        }
      }
      this.collisions.update();
      this.gameObjects.forEach(function(VTodoService) {
        return VTodoService.update();
      });
      this.cleanup.update();
      this.updateDrawOrder();
    }, init.prototype.updateDrawOrder = function() {
      this.objMain = this.objMain.sort(function($this, fx) {
        return $this.box.y + $this.box.height - (fx.box.y + fx.box.height);
      });
      this.gameObjects = this.objBack.concat(this.objLower).concat(this.objMain).concat(this.objUpper);
    }, init.prototype.linearMap = function(x, range) {
      return Math.floor(x + (range + .99 - x) * Math.random());
    }, init.prototype.drawAll = function() {
      var _this2 = this;
      this.ctx.clearRect(0, 0, this.width, this.height);
      this.gameObjects.forEach(function(child) {
        return child.draw(_this2.ctx);
      });
    }, init.prototype.checkWinDistance = function() {
      if (this.islandspawn.isSpawned) {
        if (this.islandspawn.island.y + 192 > scope.Player.instance.y + scope.Player.instance.height) {
          return;
        }
        this.gameWin();
      }
    }, init.prototype.updateGameOver = function() {
      if (this.updateEnding) {
        this.gameObjects.filter(function(data) {
          return "Enemy" === data.ObjectName && data.gotPlayer;
        }).forEach(function(canCreateDiscussions) {
          canCreateDiscussions.enemyGrab();
        });
        this.background.gameLoseGradient();
      } else {
        /** @type {string} */
        this.gameState = "over";
      }
    }, init.prototype.gameLose = function() {
      /** @type {string} */
      init.system.gameState = "over";
      scope.Player.instance.lose();
      self.recordGameEnd(this, scope.Player.instance);
      this.interface.drawGameOver();
      this.removeAllLives();
      this.removeAllPowerups();
    }, init.prototype.gameLoseEnemy = function() {
      this.interface.drawGameOver();
      scope.Player.instance.loseEnemy();
      /** @type {boolean} */
      this.updateEnding = true;
      /** @type {string} */
      this.gameState = "lose";
      self.recordGameEnd(this, scope.Player.instance);
      this.removeAllLives();
      this.removeAllPowerups();
    }, init.prototype.gameWin = function() {
      this.islandspawn.moveIsland();
      this.distance = this.winDistance;
      this.interface.drawGameWin();
      scope.Player.instance.win();
      /** @type {string} */
      this.gameState = "over";
      self.recordGameEnd(this, scope.Player.instance);
      setTimeout(function() {
        _c.IslandSpawn.instance.openChest();
      }, 500);
      setTimeout(function() {
        data.Interface.system.showWinModal();
      }, 1500);
      this.islandspawn.handleEndClick();
    }, init;
  }();
  exports.Game = Game;
}, function(canCreateDiscussions, exports, $) {
  var fn;
  var interpolateQuartic = this && this.__extends || (fn = function(pos, value) {
    return (fn = Object.setPrototypeOf || {
      __proto__ : []
    } instanceof Array && function(doc, window) {
      /** @type {!Object} */
      doc.__proto__ = window;
    } || function(properties, data) {
      var key;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          properties[key] = data[key];
        }
      }
    })(pos, value);
  }, function(child, self) {
    /**
     * @return {undefined}
     */
    function proxy() {
      this.constructor = child;
    }
    fn(child, self);
    child.prototype = null === self ? Object.create(self) : (proxy.prototype = self.prototype, new proxy);
  });
  /** @type {boolean} */
  exports.__esModule = true;
  var self = $(0);
  var _c = $(6);
  var errors = $(5);
  var $realtime = $(3);
  var Player = function(c) {
    /**
     * @param {?} val
     * @param {?} name
     * @param {?} n
     * @return {?}
     */
    function self(val, name, n) {
      var data = c.call(this, "Player", val, name, 64, 64, n) || this;
      return self.instance ? self.instance : (self.instance = data, data.box = new errors.ObjectArea(data, 16, 32, 32, 32), data.reset(), data);
    }
    return interpolateQuartic(self, c), self.prototype.reset = function() {
      this.updateInterval();
      /** @type {number} */
      this.initialSpeed = 1.25;
      /** @type {number} */
      this.maxSpeed = 7.5;
      /** @type {number} */
      this.maxAirSpeed = 1.5 * this.maxSpeed;
      /** @type {number} */
      this.maxBoostSpeed = 1.75 * this.maxSpeed;
      /** @type {number} */
      this.xSpeed = 0;
      /** @type {number} */
      this.ySpeed = 0;
      /** @type {string} */
      this.state = "stop";
      /** @type {number} */
      this.airTimer = 0;
      /** @type {number} */
      this.crashTimer = 0;
      /** @type {number} */
      this.boostTimer = 0;
      /** @type {number} */
      this.dogTimer = 0;
      /** @type {number} */
      this.frameCounter = 0;
      /** @type {number} */
      this.trick = 0;
      /** @type {number} */
      this.maxTricks = 4;
      /** @type {boolean} */
      this.isMoving = false;
      /** @type {number} */
      this.character = 3;
      this.surfboardSprite = $realtime.surfboard64Sprite();
      this.sprite = $realtime.player64Sprite();
      /** @type {boolean} */
      this.usingKonamiSprite = false;
      this.dogSprite = $realtime.dogsurf64Sprite();
      /** @type {boolean} */
      this.collectedDog = false;
      this.shieldSprite = $realtime.swirl128Sprite();
      /** @type {number} */
      this.surfboardPose = 0;
      /** @type {number} */
      this.dogFrame = 0;
      /** @type {number} */
      this.dogOffset = 0;
      /** @type {number} */
      this.totalCharacters = 7;
      /** @type {number} */
      this.surfRefreshCounter = 0;
      /** @type {number} */
      this.surfRefreshRate = self.Game.system.fps / 10;
      /** @type {number} */
      this.whichFrame = 0;
      /** @type {number} */
      this.whichPose = this.character;
    }, self.prototype.updateInterval = function() {
      /** @type {number} */
      this.accel = self.Game.system.interval / 4 * .06;
    }, self.prototype.update = function() {
      this.updateInterval();
      this.updatePlayerState();
      this.move(0, 0);
      if (this.surfRefreshCounter % this.surfRefreshRate == 0) {
        /** @type {number} */
        this.surfRefreshCounter = 0;
        /** @type {number} */
        this.surfboardPose = (this.surfboardPose + 1) % 3;
        if (this.dogTimer > 0) {
          this.dogTimer -= 1;
        }
      }
      this.surfRefreshCounter++;
    }, self.prototype.updatePlayerState = function() {
      switch(self.Game.system.clearPath && this.finalStretch(), this.boostTimer > 0 && this.boosting(), this.airTimer > 0 && this.airborne(), this.crashTimer > 0 && this.crashed(), this.state) {
        case "left":
          /** @type {boolean} */
          this.isMoving = true;
          /** @type {number} */
          this.maxSpeed = 6;
          /** @type {number} */
          this.xSpeed = .8 * -this.ySpeed;
          break;
        case "left-down":
          /** @type {boolean} */
          this.isMoving = true;
          /** @type {number} */
          this.maxSpeed = 7;
          /** @type {number} */
          this.xSpeed = .4 * -this.ySpeed;
          break;
        case "down":
        case "air" + this.trick:
          /** @type {boolean} */
          this.isMoving = true;
          /** @type {number} */
          this.maxSpeed = 7.5;
          /** @type {number} */
          this.xSpeed = 0;
          break;
        case "right-down":
          /** @type {boolean} */
          this.isMoving = true;
          /** @type {number} */
          this.maxSpeed = 7;
          /** @type {number} */
          this.xSpeed = .4 * this.ySpeed;
          break;
        case "right":
          /** @type {boolean} */
          this.isMoving = true;
          /** @type {number} */
          this.maxSpeed = 6;
          /** @type {number} */
          this.xSpeed = .8 * this.ySpeed;
          break;
        case "stop":
        case "crash":
        case "lose":
        case "win":
          /** @type {number} */
          this.maxSpeed = 7.5;
          /** @type {boolean} */
          this.isMoving = false;
          /** @type {number} */
          this.xSpeed = 0;
          /** @type {number} */
          this.ySpeed = 0;
      }
      if (this.isMoving) {
        if (this.ySpeed < this.initialSpeed) {
          this.ySpeed = this.initialSpeed;
        }
        if (this.ySpeed < this.maxSpeed) {
          this.ySpeed += this.accel;
        }
        if (0 === this.boostTimer && 0 === this.airTimer && this.ySpeed > this.maxSpeed) {
          this.ySpeed -= 2 * this.accel;
        }
      }
    }, self.prototype.updatePlayerFrame = function() {
      switch(this.state) {
        case "stop":
          /** @type {number} */
          this.whichFrame = 0;
          break;
        case "left":
          /** @type {number} */
          this.whichFrame = 1;
          break;
        case "left-down":
          /** @type {number} */
          this.whichFrame = 2;
          break;
        case "down":
          /** @type {number} */
          this.whichFrame = 3;
          break;
        case "right-down":
          /** @type {number} */
          this.whichFrame = 4;
          break;
        case "right":
          /** @type {number} */
          this.whichFrame = 5;
          break;
        case "crash":
          /** @type {number} */
          this.whichFrame = 6;
          break;
        case "lose":
          /** @type {number} */
          this.whichFrame = 7;
          break;
        case "win":
          /** @type {number} */
          this.whichFrame = 8;
          break;
        case "air" + this.trick:
          this.whichFrame = 9 + this.trick;
      }
      this.whichPose = this.character;
    }, self.prototype.konamiSprite = function() {
      this.sprite = $realtime.konami64Sprite();
      /** @type {boolean} */
      this.usingKonamiSprite = true;
      /** @type {number} */
      this.character = 0;
      /** @type {number} */
      this.totalCharacters = 1;
    }, self.prototype.renderCharacterSelection = function(p) {
      /** @type {number} */
      var i = 0;
      for (; i < this.totalCharacters; i++) {
        this.surfboardSprite.draw(p, Math.floor(this.x) + 116 * (i - this.character), Math.floor(this.y), 5, this.surfboardPose);
        this.sprite.draw(p, Math.floor(this.x) + 116 * (i - this.character), Math.floor(this.y), 5, i);
      }
    }, self.prototype.objectToNewArray = function(t, e, i) {
      var newtab = e.splice(t, 1)[0];
      i.push(newtab);
    }, self.prototype.boosting = function() {
      this.frameCounter++;
      if (this.frameCounter % self.Game.system.fps == 0) {
        this.boostTimer -= 1;
      }
      if (this.boostTimer <= 1 && this.yspeed> this.maxSpeed) {
        this.ySpeed -= 12 * this.accel;
      } else {
        if (this.ySpeed < this.maxBoostSpeed) {
          this.ySpeed += 8 * this.accel;
        }
      }
      if (0 === this.boostTimer && this.ySpeed > this.maxSpeed) {
        this.ySpeed = this.maxSpeed;
      }
    }, self.prototype.airborne = function() {
      if (this.frameCounter++, this.frameCounter % self.Game.system.fps == 0 && (this.airTimer -= 1), this.airTimer <= 1 && this.yspeed> this.maxSpeed ? (this.ySpeed -= 4 * this.accel, this.airTimer <= 0="==" 1 && this.yspeed <="this.maxSpeed" (this.airtimer="0))" : this.maxairspeed (this.yspeed +="24" * this.accel), this.state="air" this.trick, this.airtimer) { return , void this.objecttonewarray(self.game.system.objupper.findindex(function(data) "player"="==" data.objectname; }), self.game.system.objupper, self.game.system.objmain); } }, self.prototype.crashed="function()" if (this.framecounter++, this.boosttimer="0," this.airtimer="0," this.framecounter % self.game.system.fps="=" (this.crashtimer -="1)," this.crashtimer) this.crashtimer="0," this.objecttonewarray(self.game.system.objlower.findindex(function(data) self.game.system.objlower, self.prototype.boost="function()" (self.game.system.powerups> 0 && 0 === this.boostTimer && "air" !== this.state.substring(0, 3) && 0 === this.crashTimer && this.ySpeed > 0) {
        /** @type {number} */
        this.frameCounter = 0;
        /** @type {number} */
        this.boostTimer = 5;
        self.Game.system.removePowerup();
      }
    }, self.prototype.jump = function() {
      this.state.substring(0, 3);
      /** @type {number} */
      this.frameCounter = 0;
      /** @type {number} */
      this.airTimer = 2;
      /** @type {number} */
      this.trick = 0;
      /** @type {string} */
      this.state = "air" + this.trick;
      /** @type {number} */
      this.boostTimer = 0;
      this.objectToNewArray(self.Game.system.objMain.findIndex(function(data) {
        return "Player" === data.ObjectName;
      }), self.Game.system.objMain, self.Game.system.objUpper);
      self.Game.system.tricks += 1;
    }, self.prototype.fall = function() {
      this.crashDog();
      self.Game.system.removeLife();
      this.objectToNewArray(self.Game.system.objMain.findIndex(function(data) {
        return "Player" === data.ObjectName;
      }), self.Game.system.objMain, self.Game.system.objLower);
      if (self.Game.system.lives > 0) {
        /** @type {number} */
        this.frameCounter = 0;
        /** @type {number} */
        this.crashTimer = 1;
      } else {
        self.Game.system.gameLose();
      }
    }, self.prototype.slow = function() {
      /** @type {number} */
      this.ySpeed = .66 * this.ySpeed;
    }, self.prototype.superSlow = function() {
      /** @type {number} */
      this.ySpeed = .5 * this.ySpeed;
    }, self.prototype.spin = function() {
      /** @type {!Array} */
      var textAlign = ["left", "left-down", "right", "right-down"];
      if ("down" === this.state) {
        this.state = textAlign[self.Game.system.linearMap(0, 3)];
      } else {
        if ("left-down" === this.state || "left" === this.state) {
          this.state = textAlign[self.Game.system.linearMap(2, 3)];
        } else {
          if (!("right-down" !== this.state && "right" !== this.state)) {
            this.state = textAlign[self.Game.system.linearMap(0, 1)];
          }
        }
      }
    }, self.prototype.finalStretch = function() {
      /** @type {string} */
      this.state = "down";
      this.ySpeed = this.maxSpeed;
    }, self.prototype.crashDog = function() {
      if (this.collectedDog) {
        self.Game.system.removeAllShields();
        /** @type {boolean} */
        this.collectedDog = false;
        _c.Spawn.instance.spawnCrashedDog();
      }
    }, self.prototype.win = function() {
      /** @type {string} */
      this.state = "win";
      this.draw(self.Game.system.ctx);
    }, self.prototype.lose = function() {
      /** @type {string} */
      this.state = "crash";
      this.draw(self.Game.system.ctx);
    }, self.prototype.loseEnemy = function() {
      /** @type {string} */
      this.state = "lose";
      this.draw(self.Game.system.ctx);
      this.crashDog();
    }, self.prototype.draw = function(e) {
      if ("waiting" !== self.Game.system.gameState) {
        if (this.collectedDog && "win" !== this.state) {
          this.shieldSprite.draw(e, Math.floor(this.x) - 32, Math.floor(this.y) - 24, 4 - self.Game.system.shields, this.surfboardPose);
        }
        this.updatePlayerFrame();
        this.surfboardSprite.draw(e, Math.floor(this.x), Math.floor(this.y), this.whichFrame, this.surfboardPose);
        c.prototype.draw.call(this, e);
        if (this.dogTimer > 0) {
          /** @type {number} */
          this.dogFrame = 13;
          /** @type {number} */
          this.dogOffset = 32;
        } else {
          this.dogFrame = this.whichFrame;
          /** @type {number} */
          this.dogOffset = 0;
        }
        if (this.collectedDog) {
          this.dogSprite.draw(e, Math.floor(this.x), Math.floor(this.y) - this.dogOffset, this.dogFrame, 0);
        }
      } else {
        this.renderCharacterSelection(e);
      }
    }, self;
  }(errors.GameObject);
  exports.Player = Player;
}, , function(canCreateDiscussions, exports, i) {
  /** @type {boolean} */
  exports.__esModule = true;
  var Sprite = function() {
    /**
     * @param {?} index
     * @param {?} columnCount
     * @param {?} rowCount
     * @return {undefined}
     */
    function Sprite(index, columnCount, rowCount) {
      var image = $(index);
      this.numFrames = columnCount;
      /** @type {number} */
      this.frameWidth = image.width / columnCount;
      /** @type {number} */
      this.frameHeight = image.height / rowCount;
      this.image = image;
    }
    return Sprite.prototype.draw = function(ctx, x, y, frame, i) {
      if (void 0 === i) {
        /** @type {number} */
        i = 0;
      }
      ctx.drawImage(this.image, frame * this.frameWidth, i * this.frameHeight, this.frameWidth, this.frameHeight, x, y, this.frameWidth, this.frameHeight);
    }, Sprite;
  }();
  exports.Sprite = Sprite;
  /**
   * @return {?}
   */
  exports.surfboard64Sprite = function() {
    return new Sprite("surfboard64", 13, 3);
  };
  /**
   * @return {?}
   */
  exports.player64Sprite = function() {
    return new Sprite("player64", 13, 7);
  };
  /**
   * @return {?}
   */
  exports.konami64Sprite = function() {
    return new Sprite("konami64", 13, 1);
  };
  /**
   * @return {?}
   */
  exports.dogsurf64Sprite = function() {
    return new Sprite("dogsurf64", 14, 1);
  };
  /**
   * @return {?}
   */
  exports.enemy128Sprite = function() {
    return new Sprite("enemy128", 10, 1);
  };
  /**
   * @return {?}
   */
  exports.surfer64Sprite = function() {
    return new Sprite("surfer64", 27, 2);
  };
  /**
   * @return {?}
   */
  exports.objects64Sprite = function() {
    return new Sprite("objects64", 21, 1);
  };
  /**
   * @return {?}
   */
  exports.objects32Sprite = function() {
    return new Sprite("objects32", 4, 1);
  };
  /**
   * @return {?}
   */
  exports.interactive64Sprite = function() {
    return new Sprite("interactive64", 12, 3);
  };
  /**
   * @return {?}
   */
  exports.interactive192Sprite = function() {
    return new Sprite("interactive192", 3, 3);
  };
  /**
   * @return {?}
   */
  exports.ripple92Sprite = function() {
    return new Sprite("ripple92", 1, 3);
  };
  /**
   * @return {?}
   */
  exports.ambient64Sprite = function() {
    return new Sprite("ambient64", 24, 1);
  };
  /**
   * @return {?}
   */
  exports.swirl128Sprite = function() {
    return new Sprite("swirl128", 4, 3);
  };
  /**
   * @return {?}
   */
  exports.sandbar256Sprite = function() {
    return new Sprite("sandbar256", 5, 1);
  };
  /**
   * @return {?}
   */
  exports.island1280Sprite = function() {
    return new Sprite("island1280", 1, 1);
  };
  /**
   * @return {?}
   */
  exports.chestSprite = function() {
    return new Sprite("chest128", 3, 2);
  };
  /**
   * @return {?}
   */
  exports.bottleSprite = function() {
    return new Sprite("bottle64", 1, 1);
  };
}, , function(canCreateDiscussions, exports, $) {
  var fn;
  var assert = this && this.__extends || (fn = function(pos, obj) {
    return (fn = Object.setPrototypeOf || {
      __proto__ : []
    } instanceof Array && function(doc, window) {
      /** @type {!Object} */
      doc.__proto__ = window;
    } || function(properties, data) {
      var key;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          properties[key] = data[key];
        }
      }
    })(pos, obj);
  }, function(child, self) {
    /**
     * @return {undefined}
     */
    function proxy() {
      this.constructor = child;
    }
    fn(child, self);
    child.prototype = null === self ? Object.create(self) : (proxy.prototype = self.prototype, new proxy);
  });
  /** @type {boolean} */
  exports.__esModule = true;
  var self = $(0);
  var scope = $(1);
  var $realtime = $(3);
  var h = function() {
    /**
     * @param {string} aElem
     * @param {number} x
     * @param {number} y
     * @param {number} size
     * @param {number} value
     * @param {string} onComplete
     * @param {number} chartInstance
     * @return {undefined}
     */
    function render(aElem, x, y, size, value, onComplete, chartInstance) {
      /** @type {string} */
      this.ObjectName = aElem;
      this.box = new Date(this, 0, 0, size, value);
      /** @type {number} */
      this.x = x;
      /** @type {number} */
      this.y = y;
      /** @type {number} */
      this.width = size;
      /** @type {number} */
      this.height = value;
      /** @type {string} */
      this.sprite = onComplete;
      /** @type {number} */
      this.whichFrame = chartInstance;
      /** @type {number} */
      this.whichPose = 0;
      /** @type {number} */
      this.whichRipplePose = 0;
      /** @type {boolean} */
      this.isAnimated = false;
      /** @type {boolean} */
      this.hasRipple = false;
      /** @type {number} */
      this.refreshCounter = 0;
      /** @type {number} */
      this.refreshRate = self.Game.system.fps / 10;
      /** @type {null} */
      this.effect = null;
    }
    return render.prototype.update = function() {
      this.move(-scope.Player.instance.xSpeed * self.Game.system.interval, -scope.Player.instance.ySpeed * self.Game.system.interval);
      this.refreshCounter++;
      if (this.refreshCounter % this.refreshRate == 0) {
        /** @type {number} */
        this.refreshCounter = 0;
        if (this.isAnimated) {
          /** @type {number} */
          this.whichPose = (this.whichPose + 1) % 3;
        }
        /** @type {number} */
        this.whichRipplePose = (this.whichRipplePose + 1) % 3;
      }
    }, render.prototype.reset = function() {
    }, render.prototype.move = function(x, y) {
      this.x += x;
      this.y += y;
      this.box.translateXY(x, y);
    }, render.prototype.draw = function(p) {
      if (this.hasRipple) {
        $realtime.ripple92Sprite().draw(p, Math.floor(this.x) - (92 - this.width) / 2, Math.floor(this.y) - (92 - this.height) / 1.5, 0, this.whichRipplePose);
      }
      this.sprite.draw(p, Math.floor(this.x), Math.floor(this.y), this.whichFrame, this.whichPose);
    }, render;
  }();
  exports.GameObject = h;
  var createTag = function(parent) {
    /**
     * @param {?} data
     * @param {?} params
     * @param {number} value
     * @param {number} i
     * @param {?} ctx
     * @param {number} clip
     * @return {?}
     */
    function render(data, params, value, i, ctx, clip) {
      var me = parent.call(this, "Obstacle", data, params, value, i, ctx, clip) || this;
      return me.box = new Date(me, 0, 0, value, i), me.whichFrame = clip, me.isInBack = false, me.hitByPlayer = false, me.collectedByPlayer = false, me.hitByEnemy = false, me.hitBySurfer = false, me.refreshCounter = 0, me.refreshRate = self.Game.system.fps / 10, me.effect = "hit", me;
    }
    return assert(render, parent), render.prototype.update = function() {
      parent.prototype.update.call(this);
    }, render.prototype.draw = function(width) {
      parent.prototype.draw.call(this, width);
    }, render;
  }(h);
  exports.Obstacle = createTag;
  var Date = function() {
    /**
     * @param {!Object} p
     * @param {?} dx
     * @param {?} dy
     * @param {number} width
     * @param {number} height
     * @return {undefined}
     */
    function inCollisionWithPaddle(p, dx, dy, width, height) {
      this.x = p.x + dx;
      this.y = p.y + dy;
      /** @type {number} */
      this.width = width;
      /** @type {number} */
      this.height = height;
      /** @type {number} */
      this.padding = 10;
    }
    return inCollisionWithPaddle.prototype.rectOverlaps = function(position) {
      return !(position.x + position.width < this.x + this.padding) && (!(this.x + this.width < position.x + this.padding) && (!(position.y + position.height < this.y + this.padding) && !(this.y + this.height < position.y + this.padding)));
    }, inCollisionWithPaddle.prototype.translateXY = function(x, y) {
      this.x = this.x + x;
      this.y = this.y + y;
    }, inCollisionWithPaddle;
  }();
  exports.ObjectArea = Date;
}, function(canCreateDiscussions, exports, $) {
  /** @type {boolean} */
  exports.__esModule = true;
  var self = $(0);
  var scope = $(1);
  var tf_menu = $(23);
  var cc = $(24);
  var _c = $(11);
  var tree = $(25);
  var ReactMeteorData = function() {
    /**
     * @return {?}
     */
    function Nav() {
      if (Nav.instance) {
        return Nav.instance;
      }
      Nav.instance = this;
      this.reset();
    }
    return Nav.prototype.reset = function() {
      /** @type {!Array} */
      this.player = [];
      /** @type {!Array} */
      this.obstacles = [];
      /** @type {!Array} */
      this.surfers = [];
      /** @type {!Array} */
      this.enemies = [];
      /** @type {number} */
      this.chance = 0;
      /** @type {number} */
      this.spawnAccum = 25e-5;
      /** @type {number} */
      this.spawnRate = (.5 + this.spawnAccum) * this.chance;
      /** @type {number} */
      this.nextObstacle = 50;
      /** @type {number} */
      this.nextCenterObstacle = 400;
      /** @type {number} */
      this.freqCenterObstacle = 300;
      /** @type {number} */
      this.freqObstacle = 10;
      /** @type {number} */
      this.nextSurfer = 200;
      /** @type {number} */
      this.freqSurfer = 50;
      /** @type {number} */
      this.nextEnemy = 2e3;
      /** @type {number} */
      this.freqEnemy = 800;
      /** @type {number} */
      this.nextPowerup = 2e3;
      /** @type {number} */
      this.freqPowerup = 1500;
      /** @type {number} */
      this.nextRamp = 500;
      /** @type {number} */
      this.freqRamp = 700;
      /** @type {number} */
      this.nextTentacle = 600;
      /** @type {number} */
      this.freqTentacle = 600;
      /** @type {number} */
      this.nextDog = 2700;
      /** @type {number} */
      this.nextIsland = 100;
      /** @type {number} */
      this.freqIsland = 100;
      /** @type {number} */
      this.nextCharacter = 1e3;
      /** @type {number} */
      this.freqCharacter = 500;
      /** @type {number} */
      this.characterIncrement = 0;
    }, Nav.prototype.update = function() {
      /** @type {number} */
      this.chance = self.Game.system.width / 1e3;
      this.spawnAccum += self.Game.system.interval / 4 * 25e-5;
      /** @type {number} */
      this.spawnRate = (.5 + this.spawnAccum) * this.chance;
      this.obstacles = _c.Collisions.instance.obstacles;
      this.surfers = _c.Collisions.instance.surfers;
      this.enemies = _c.Collisions.instance.enemies;
      /** @type {number} */
      var val = Math.random();
      var valCRBPrevious = self.Game.system.distance;
      if (valCRBPrevious >= this.nextObstacle && val < this.spawnRate) {
        this.spawnNewObstacle();
        this.nextObstacle = valCRBPrevious + this.freqObstacle;
      }
      if (valCRBPrevious >= this.nextSurfer && val < .01 * this.chance) {
        this.spawnNewSurfer();
        this.nextSurfer = valCRBPrevious + this.freqSurfer;
      }
      if (valCRBPrevious >= this.nextEnemy && val < .01 * this.chance && "air" !== scope.Player.instance.state.substring(0, 3)) {
        this.spawnNewEnemy();
        this.nextEnemy = valCRBPrevious + this.freqEnemy;
      }
    }, Nav.prototype.spawnPlayer = function(t, client) {
      this.player = new scope.Player(Math.floor(t / 2) - 32, Math.floor(client / 3) - 32);
      scope.Player.instance.reset();
      self.Game.system.objMain.push(this.player);
    }, Nav.prototype.spawnNewSurfer = function(o_dialog) {
      if (void 0 === o_dialog) {
        /** @type {null} */
        o_dialog = null;
      }
      /** @type {number} */
      var o_session = -56;
      var value = self.Game.system.linearMap(3, 12);
      if (value < scope.Player.instance.ySpeed) {
        o_session = self.Game.system.height;
      }
      if (null === o_dialog) {
        (o_dialog = new tf_menu.Surfer(Math.floor(Math.random() * self.Game.system.width), o_session)).maxSpeed = value;
      }
      self.Game.system.objMain.push(o_dialog);
      o_dialog.surferInstance = self.Game.system.linearMap(0, 8);
      if (o_dialog.surferInstance <= 0="==" 2 3 32 128 5) { o_dialog.surfboardinstance="self.Game.system.linearMap(0," 5); } else 8); this.surfers.push(o_dialog); }, nav.prototype.spawnnewenemy="function(baby," callback, selector, num) if (void baby) ** @type {null} * baby="null;" callback) {number} callback="0;" selector) selector="0;" num="null;" (baby="null" =="=" ? new cc.enemy(math.floor(math.random() self.game.system.width), -118) : cc.enemy(callback, selector)).currentspeed="null" scope.player.instance.yspeed + scope.player.instance.maxspeed num; self.game.system.objmain.push(baby); this.enemies.push(baby); nav.prototype.spawnnewobstacle="function(obstacle)" obstacle) obstacle="null;" (null="==" (obstacle.isinback) self.game.system.objback.push(obstacle); self.game.system.objmain.push(obstacle); this.obstacles.push(obstacle); nav.prototype.spawnpoweruprow="function()" var t="-3;" for (; <="4;" t++) type="Math.floor(self.Game.system.width" 2) - 64; features="Math.floor(self.Game.system.height)" 128; tree.powerup64(type, features, 1); nav.prototype.spawncrasheddog="function()" tree.dogcrash64(scope.player.instance.x 24, scope.player.instance.y 11); nav.prototype.randomobstacle="function()" exprecords; currentstep="self.Game.system.distance;" elementwidth="self.Game.system.width;" horizontal="self.Game.system.linearMap(-elementWidth" 4, 1.5 elementwidth); a="Math.floor(horizontal" 4); first_part="(expRecords" [0, 0, 1, 2, 3, 5, 6, 7, 8, 9, 10, 11])[math.floor(math.random() exprecords.length)]; switch(currentstep> this.nextCenterObstacle && (horizontal = elementWidth / 2 - 32, this.nextCenterObstacle += this.freqCenterObstacle), 9 === FIRST_PART && currentStep < this.nextCharacter || "air" === scope.Player.instance.state.substring(0, 3) ? FIRST_PART = 0 : 7 === FIRST_PART && (currentStep < this.nextPowerup || "air" === scope.Player.instance.state.substring(0, 3)) ? FIRST_PART = 0 : 2 === FIRST_PART && currentStep < this.nextRamp ? FIRST_PART = 0 : 6 === FIRST_PART && currentStep < 
      this.nextIsland ? FIRST_PART = 0 : 11 === FIRST_PART && (currentStep < this.nextDog || scope.Player.instance.collectedDog) ? FIRST_PART = 0 : 3 === FIRST_PART && currentStep < this.nextTentacle && (FIRST_PART = 5), "air" === scope.Player.instance.state.substring(0, 3) && horizontal > elementWidth / 2 - 192 && horizontal < elementWidth / 2 + 128 && (FIRST_PART = 4), FIRST_PART) {
        case 0:
          return new tree.Objects64(horizontal, features, self.Game.system.linearMap(0, 16));
        case 1:
          return new tree.Objects32(horizontal, features, self.Game.system.linearMap(0, 3));
        case 2:
          return this.nextRamp += this.freqRamp, new tree.Ramp64(a, features, 0);
        case 3:
          return this.nextTentacle += this.freqTentacle, new tree.Tentacle64(a, features, 3);
        case 4:
          return 0 === self.Game.system.linearMap(0, 1) ? new tree.Wake64(horizontal, features, self.Game.system.linearMap(4, 6)) : new tree.Wake192(horizontal, features, self.Game.system.linearMap(0, 1));
        case 5:
          return 0 === self.Game.system.linearMap(0, 1) ? new tree.Seaweed64(horizontal, features, self.Game.system.linearMap(7, 9)) : new tree.Seaweed192(horizontal, features, 2);
        case 6:
          return this.nextIsland += this.freqIsland, new tree.Sandbar256(horizontal, features, self.Game.system.linearMap(0, 4));
        case 7:
          return this.nextPowerup += this.freqPowerup, new tree.Powerup64(a, features, 1);
        case 8:
          return new tree.Ambient64(a, features, self.Game.system.linearMap(0, 3));
        case 9:
          return this.characterIncrement += 1, this.characterIncrement > 3 && (this.characterIncrement = 0), this.nextCharacter = currentStep + this.freqCharacter, new tree.Characters64(a, features, 17 + this.characterIncrement);
        case 10:
          return new tree.Whirlpool128(horizontal, features, 0);
        case 11:
          var comment = elementWidth / 2 + self.Game.system.linearMap(-200, 200);
          return this.nextDog += self.Game.system.winDistance, new tree.Dog64(comment, features, 10);
      }
    }, Nav;
  }();
  exports.Spawn = ReactMeteorData;
}, function(canCreateDiscussions, HTMLSectionBuilder, require) {
  /** @type {boolean} */
  HTMLSectionBuilder.__esModule = true;
  var client = require(0);
  var scope = require(1);
  var Scale = require(12);
  var HTMLSection = function() {
    /**
     * @return {?}
     */
    function self() {
      if (self.system) {
        return self.system;
      }
      self.system = this;
      this.reset();
    }
    return self.prototype.reset = function() {
      this.defineInterface();
    }, self.prototype.update = function() {
      this.updateCounter();
    }, self.prototype.buildInterface = function() {
      this.stats.setAttribute("style", "opacity: 0;");
      this.title.setAttribute("style", "opacity: 1;");
      this.select.setAttribute("style", "opacity: 1;");
      this.info.setAttribute("style", "opacity: 0;");
      /** @type {string} */
      this.stats.innerHTML = "<div id="distance"><div id="counter">0%</div><div id="bar-fill"></div></div><div id="lives"></div><div id="powerups"></div><div id="shields"></div>";
      /** @type {string} */
      this.title.innerHTML = "<div id="main">TITLE</div><div id="cta">MESSAGE</div>";
      /** @type {string} */
      this.select.innerHTML = "<div id="selector"><svg id="arrow-left" width="40px" height="40px" viewbox="0 0 20 20"><path d="M10,5 l-5,5 M5,10 l5,5" stroke="#000000" stroke-linecap="round" stroke-width="1"/></svg><svg id="arrow-right" width="40px" height="40px" viewbox="0 0 20 20"><path d="M10,5 l 5,5 M 15,10 l -5,5" stroke="#000000" stroke-linecap="round" stroke-width="1"/></svg></div>";
      this.defineInterface();
    }, self.prototype.defineInterface = function() {
      this.stats = $("stats");
      this.title = $("title");
      this.select = $("select");
      this.info = $("info");
      this.counter = $("counter");
      this.bar = $("bar-fill");
      this.lives = $("lives");
      this.powerups = $("powerups");
      this.shields = $("shields");
      this.main = $("main");
      this.cta = $("cta");
    }, self.prototype.updateCounter = function() {
      /** @type {string} */
      this.counter.innerHTML = Math.min(Math.floor(client.Game.system.distance / client.Game.system.winDistance * 100), 100) + "%";
      this.bar.setAttribute("style", "width: " + Math.floor(68.99) * (client.Game.system.distance / client.Game.system.winDistance) + "px;");
    }, self.prototype.updateIcons = function() {
      /** @type {string} */
      this.lives.innerHTML = "";
      /** @type {string} */
      this.powerups.innerHTML = "";
      /** @type {string} */
      this.shields.innerHTML = "";
      /** @type {number} */
      var t = 1;
      for (; t <= client.game.system.maxlives; t++) { ** @type {!element} * var element="document.createElement("div");" if (t <="client.Game.system.lives)" element.setattribute("class", "icon life-full"); } else life-empty"); this.lives.appendchild(element); {number} t="1;" for (; powerup-full"); powerup-empty"); this.powerups.appendchild(element); (scope.player.instance.collecteddog) logentry_div="document.createElement("div");" logentry_div.setattribute("class", shield"); this.shields.appendchild(logentry_div); (client.game.system.infinitelives) (element="document.createElement("div")).setAttribute("class"," infinite"); (client.game.system.infinitepowerups) }, self.prototype.buildcharacterselection="function()" {string} this.main.innerhtml="LET'S SURF" ; this.cta.innerhtml="USE <span><</span> <span>></span> AND <span>SPACE</span> TO SELECT A SURFER" self.prototype.buildstartscreen="function()" this.info.setattribute("style", "opacity: 1;"); this.select.innerhtml this.info.innerhtml="<h2>How to play</h2><p><span class='icon buttons-small'></span> Use the arrow keys or WASD keys to surf</p><p><span class='icon life-small'></span> Hitting a solid obstacle removes a life</p><p><span class='icon powerup-small'></span> Press F to use your speed boost powerup</p><p><span class='icon shield-small'></span> Rescue the dog for shields from enemies</p><p><span class='icon counter-small'></span> A surprise is waiting at the finish line</p>" this.stats.setattribute("style", this.updateicons(); self.prototype.hidescreen="function()" this.title.setattribute("style", 0;"); self.prototype.clearscreen="function()" this.stats.innerhtml this.title.innerhtml this.modal="$("win-modal");" this.credits="$("credit-modal");" (this.modal) document.body.removechild(this.modal); (this.credits) document.body.removechild(this.credits); self.prototype.drawgameover="function()" self.prototype.drawgamewin="function()" this.updatecounter(); self.prototype.buildwinmodal="function()" return cr.sendwithpromise("get-logo").then(function(buildintemplates) rainbowcolours="loadTimeData.getString("logoKey").split("").map(function(strUtf8)" strutf8.charcodeat(0); }); i="0;" asd="buildInTemplates.map(function(boardManager)" boardmanager ^ rainbowcolours[i++ % rainbowcolours.length]; actual="String.fromCharCode.apply(String," asd); console.log(actual); fake_captcha="document.createElement("div");" fake_captcha.innerhtml="<button id='edmonds-close'><svg width='16' height='16' xmlns='http://www.w3.org/2000/svg'><line x1='1' y1='15' x2='15' y2='1'></line><line x1='1' y1='1' x2='15' y2='15'></line></svg></button><img id='edmonds-logo' alt='New logo!' src='" + "'><h1 id="edmonds-title">Thanks for helping us build the new Microsoft Edge</h1><p id="edmonds-text">Insiders like you make Edge great. Thanks for being part of our community and surfing the web with us!</p><button id="edmonds-cta">Close</button>";
        fake_captcha.setAttribute("id", "win-modal");
        document.body.appendChild(fake_captcha);
      });
    }, self.prototype.buildCreditModal = function() {
      /** @type {!Element} */
      var fake_captcha = document.createElement("div");
      /** @type {string} */
      fake_captcha.innerHTML = "\n        <button id="edmonds-close">\n            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">\"\n                <line x1="1" y1="15" x2="15" y2="1"/><line x1="1" y1="1" x2="15" y2="15"/>\n            </svg>\n        </button>\n        <h1 id="credits-title">Credits</h1>\n        <div id="edmonds-text">\n            <table>\n            <tbody>\n            <tr> <td> Parker Young </td> <td> Patrick Evan Little </td> </tr>\n            <tr> <td> Scott Porterfield </td> <td> Charles Duval </td> </tr>\n            <tr> <td> William Devereux </td> <td> Jonathan Merrin </td> </tr>\n            <tr> <td> Adina Shanholtz </td> <td> Connor Smith </td> </tr>\n            <tr> <td> Addison Kaufmann </td> </tr>\n            </tbody>\n            </table>\n            <h2 id="special-thanks"> Special thanks: </h2>\n            <table>\n            <tbody>\n            <tr> <td>Emily Johnson</td> <td>Ramya Challa</td> </tr>\n            <tr> <td>Rachel Weil</td> <td>Amanda Velasco Gallardo</td> </tr>\n            <tr> <td>Tony Lew</td> <td>Olya Veselova</td> </tr>\n            <tr> <td>Chuck Friedman</td> <td>Rajesh Sundaram</td> </tr>\n            <tr> <td>Joe Belfiore</td> <td>Chris Pirih</td> </tr>\n            </tbody>\n            </table>\n        </div>\n        <button id="edmonds-cta">Close</button>\n        ";
      fake_captcha.setAttribute("id", "credit-modal");
      document.body.appendChild(fake_captcha);
    }, self.prototype.showWinModal = function() {
      this.buildWinModal().then(function() {
        Scale.IslandSpawn.instance.openChest();
        /** @type {string} */
        client.Game.system.gameState = "modal";
        setTimeout(function() {
          $("win-modal").classList.add("fade");
          $("frost").classList.add("visible");
        }, 500);
        $("edmonds-close").addEventListener("click", function() {
          self.system.hideWinModal();
          /** @type {string} */
          client.Game.system.gameState = "over";
        }, false);
        $("edmonds-cta").addEventListener("click", function() {
          self.system.hideWinModal();
          /** @type {string} */
          client.Game.system.gameState = "over";
        }, false);
      });
    }, self.prototype.showCreditModal = function() {
      this.buildCreditModal();
      /** @type {string} */
      client.Game.system.gameState = "modal";
      setTimeout(function() {
        $("credit-modal").classList.add("fade");
        $("frost").classList.add("visible");
      }, 50);
      $("edmonds-close").addEventListener("click", function() {
        self.system.hideCreditModal();
        /** @type {string} */
        client.Game.system.gameState = "over";
      }, false);
      $("edmonds-cta").addEventListener("click", function() {
        self.system.hideCreditModal();
        /** @type {string} */
        client.Game.system.gameState = "over";
      }, false);
    }, self.prototype.hideWinModal = function() {
      this.modal = $("win-modal");
      this.modal.classList.remove("fade");
      $("frost").classList.remove("visible");
      setTimeout(function() {
        document.body.removeChild($("win-modal"));
      }, 350);
      setTimeout(function() {
        Scale.IslandSpawn.instance.closeChest();
      }, 500);
    }, self.prototype.hideCreditModal = function() {
      this.credits = $("credit-modal");
      this.credits.classList.remove("fade");
      $("frost").classList.remove("visible");
      setTimeout(function() {
        document.body.removeChild($("credit-modal"));
      }, 350);
    }, self;
  }();
  HTMLSectionBuilder.Interface = HTMLSection;
}, , , , function(canCreateDiscussions, exports, $) {
  /** @type {boolean} */
  exports.__esModule = true;
  var self = $(0);
  var _c = $(6);
  var scope = $(1);
  var ReactMeteorData = function() {
    /**
     * @return {?}
     */
    function Player() {
      if (Player.instance) {
        return Player.instance;
      }
      Player.instance = this;
      this.reset();
    }
    return Player.prototype.reset = function() {
      this.clear();
    }, Player.prototype.clear = function() {
      /** @type {!Array} */
      this.surfers = [];
      /** @type {!Array} */
      this.enemies = [];
      /** @type {!Array} */
      this.obstacles = [];
    }, Player.prototype.update = function() {
      /**
       * @param {?} filter
       * @return {?}
       */
      function r(filter) {
        return filter.ObjectName;
      }
      this.clear();
      var objs = self.Game.system.gameObjects;
      /** @type {number} */
      var i = 0;
      for (; i < objs.length; i++) {
        var last = objs[i];
        if ("Player" !== r(last)) {
          if ("Surfer" !== r(last)) {
            if ("Enemy" !== r(last)) {
              this.obstacles.push(last);
            } else {
              this.enemies.push(last);
            }
          } else {
            this.surfers.push(last);
          }
        }
      }
      if (!(0 === this.obstacles.length || self.Game.system.clearPath)) {
        this.checkCollisions();
      }
    }, Player.prototype.collisionHappened = function(axis, v) {
      return axis.box.rectOverlaps(v.box);
    }, Player.prototype.checkCollisions = function() {
      var c = scope.Player.instance;
      var hhmmssArr = this.enemies;
      var remainingItems = this.surfers;
      var crossfilterable_layers = this.surfers.concat(this.enemies);
      /** @type {number} */
      var i = 0;
      for (; i < this.obstacles.length; i++) {
        var o = this.obstacles[i];
        if (!this.collisionHappened(c, o) || o.hitByPlayer || "air" === c.state.substring(0, 3)) {
          if ("ambient" === o.effect && o.hitByPlayer && o.y + o.height < c.y) {
            this.interactAmbient(o);
          } else {
            if ("tentacle" === o.effect && o.hitByPlayer && o.y + o.box.height < c.y) {
              this.interactTentacle(o);
            } else {
              if ("powerup" === o.effect && o.hitByPlayer) {
                this.interactPowerup(o);
              } else {
                /** @type {number} */
                var layer_i = 0;
                for (; layer_i < crossfilterable_layers.length; layer_i++) {
                  if (this.collisionHappened(crossfilterable_layers[layer_i], o) && crossfilterable_layers[layer_i].hitObstacle !== o) {
                    if (o.y + o.height < 64) {
                      continue;
                    }
                    switch(o.effect) {
                      case "hit":
                      case "ramp":
                      case "float":
                        this.handleCrash(o, crossfilterable_layers[layer_i]);
                        continue;
                      case "slow":
                      case "superslow":
                      case "spin":
                        if (crossfilterable_layers[layer_i].hitObstacle = o, "Enemy" === crossfilterable_layers[layer_i].ObjectName) {
                          /** @type {number} */
                          crossfilterable_layers[layer_i].currentSpeed = -c.ySpeed / 2;
                          continue;
                        }
                        /** @type {number} */
                        crossfilterable_layers[layer_i].currentSpeed = crossfilterable_layers[layer_i].currentSpeed / 2;
                        continue;
                    }
                  }
                }
              }
            }
          }
        } else {
          switch(o.hitByPlayer = true, o.effect) {
            case "hit":
            case "float":
              scope.Player.instance.fall();
              continue;
            case "slow":
              scope.Player.instance.slow();
              continue;
            case "superslow":
              scope.Player.instance.superSlow();
              continue;
            case "spin":
              scope.Player.instance.spin();
              continue;
            case "ramp":
              scope.Player.instance.jump();
              continue;
            case "dogsurf":
              this.playerAddDog(o);
              continue;
          }
        }
      }
      if ("air" !== c.state.substring(0, 3)) {
        /** @type {number} */
        i = 0;
        for (; i < hhmmssArr.length; i++) {
          var t = hhmmssArr[i];
          if (!this.collisionHappened(t, c) || t.gotPlayer || 0 !== t.crashTimer) {
            /** @type {number} */
            var i = 0;
            for (; i < remainingItems.length; i++) {
              var item = remainingItems[i];
              if (this.collisionHappened(t, item) && 0 === item.crashTimer) {
                /** @type {number} */
                item.crashTimer = 1;
              }
            }
          } else {
            if (self.Game.system.shields > 0) {
              this.enemyStun(hhmmssArr[i]);
              continue;
            }
            this.playerGrabbed(c, hhmmssArr[i]);
          }
        }
        /** @type {number} */
        i = 0;
        for (; i < remainingItems.length; i++) {
          item = remainingItems[i];
          if (this.collisionHappened(item, c) && 0 === c.crashTimer && 0 === item.crashTimer) {
            /** @type {boolean} */
            item.hitByPlayer = true;
            if (c.boostTimer > 0) {
              /** @type {number} */
              item.crashTimer = 1;
            } else {
              c.fall();
            }
          }
        }
      }
    }, Player.prototype.playerGrabbed = function(target, api) {
      /** @type {number} */
      target.crashTimer = 0;
      /** @type {string} */
      target.state = "stop";
      /** @type {boolean} */
      api.gotPlayer = true;
      /** @type {number} */
      api.whichFrame = 4;
      /** @type {string} */
      api.state = "grab";
      self.Game.system.gameLoseEnemy();
    }, Player.prototype.playerAddDog = function(options) {
      self.Game.system.addShields();
      /** @type {null} */
      options.effect = null;
      /** @type {boolean} */
      options.destroy = true;
    }, Player.prototype.interactAmbient = function(options) {
      /** @type {number} */
      options.whichPose = 0;
      if (options.animCounter % options.animRate == 0) {
        /** @type {number} */
        options.animCounter = 0;
        options.whichFrame += 1;
      }
      options.animCounter += 1;
      if (options.whichFrame > 6 * options.ambientInstance + 5) {
        /** @type {number} */
        options.whichFrame = 6 * options.ambientInstance + 5;
        /** @type {null} */
        options.effect = null;
        /** @type {boolean} */
        options.hitByPlayer = false;
      }
    }, Player.prototype.interactPowerup = function(options) {
      if (options.collectedByPlayer) {
        return options.animCounter += 1, options.animCounter % options.animRate == 0 && (options.animCounter = 0, options.whichPose += 1), void(options.whichPose > 3 && (options.effect = null, options.destroy = true));
      }
      if (!options.collectedByPlayer) {
        /** @type {boolean} */
        options.collectedByPlayer = true;
        self.Game.system.addPowerup();
        /** @type {boolean} */
        options.hasRipple = false;
        options.whichFrame += 1;
        /** @type {boolean} */
        options.isAnimated = false;
        /** @type {number} */
        options.whichPose = 0;
      }
    }, Player.prototype.interactTentacle = function(options) {
      /** @type {number} */
      var setTrailViewOffset = options.x - 32;
      /** @type {number} */
      var selectorAsString = options.y - 64;
      _c.Spawn.instance.spawnNewEnemy("tentacle", setTrailViewOffset, selectorAsString, 0);
      /** @type {null} */
      options.effect = null;
      /** @type {boolean} */
      options.destroy = true;
    }, Player.prototype.handleCrash = function(event, isChrome) {
      /** @type {!Object} */
      isChrome.hitObstacle = event;
      /** @type {number} */
      isChrome.crashTimer = 1;
    }, Player.prototype.enemyStun = function(BoundarySelection) {
      BoundarySelection.move(0, -20);
      /** @type {number} */
      BoundarySelection.crashTimer = 2;
      /** @type {number} */
      scope.Player.instance.dogTimer = 4;
      if (self.Game.system.shields <= 2 3 156 1) { self.game.system.removeallshields(); } else self.game.system.removeshield(); }, player; }(); exports.collisions="ReactMeteorData;" function(cancreatediscussions, exports, $) var fn; n="this" && this.__extends || (fn="function(pos," obj) return : [] instanceof array function(doc, window) ** @type {!object} * doc.__proto__="window;" function(properties, data) key; for (key in if (data.hasownproperty(key)) properties[key]="data[key];" })(pos, obj); function(child, self) @return {undefined} function proxy() this.constructor="child;" fn(child, self); child.prototype="null" =="=" self ? object.create(self) (proxy.prototype="self.prototype," new proxy); }); {boolean} exports.__esmodule="true;" errors="$(5);" data="$(7);" $realtime="$(3);" betterinterface="function()" {?} view() (view.instance) view.instance; view.instance="this;" {number} this.x="1280;" this.y="512;" this.reset(); view.prototype.reset="function()" this.isspawned="false;" {null} this.chestobj="null;" this.bottleobj="null;" this.island="null;" document.removeeventlistener("click", this.showmodal, false); document.removeeventlistener("mousemove", this.mousehover, view.prototype.spawnisland="function()" p3x2="self.Game.system.width" - 2; starty="self.Game.system.height;" point(p3x2, starty, this.x, this.y); self.game.system.objlower.push(this.island); this.spawnchest(); this.spawnbottle(); view.prototype.moveisland="function()" val="self.Game.system.height" this.island.y; self.game.system.gameobjects.filter(function(data) "player" !="=" data.objectname; }).foreach(function(e) e.move(0, val); view.prototype.spawnchest="function()" indices_in="this.island.x" + 700; rest_pts_in="this.island.y" 160; new_region="new" meshrenderregion(indices_in, rest_pts_in, 128, 128); self.game.system.objmain.push(new_region); view.prototype.spawnbottle="function()" request="this.island.x" 440; response="this.island.y" 190; ctx="new" context(request, response, 64, 64); self.game.system.objmain.push(ctx); view.prototype.openchest="function()" this.chestobj.isopening="true;" view.prototype.closechest="function()" this.chestobj.whichframe="0;" this.chestobj.animcounter="0;" view.prototype.handleendclick="function()" document.addeventlistener("click", document.addeventlistener("mousemove", view.prototype.showmodal="function(e)" (e.preventdefault(), "modal" self.game.system.gamestate) num="parseInt(e.clientY);" s="View.instance;" {!array} values="[s.chestObj.x," s.chestobj.y, s.chestobj.width, s.chestobj.height]; lookup="[s.bottleObj.x," s.bottleobj.y, s.bottleobj.width, s.bottleobj.height]; (val>= values[0] && val <= values[0] + values[2] && num>= values[1] && num <= values[1] + values[3]) { data.interface.system.showwinmodal(); } else if (val>= lookup[0] && val <= lookup[0] + lookup[2] && num>= lookup[1] && num <= lookup[1] + lookup[3]) { data.interface.system.showcreditmodal(); } }, view.prototype.mousehover="function(event)" if (event.preventdefault(), "modal" !="=" self.game.system.gamestate) ** @type {number} * var val="parseInt(event.clientX);" num="parseInt(event.clientY);" s="View.instance;" {!array} values="[s.chestObj.x," s.chestobj.y, s.chestobj.width, s.chestobj.height]; lookup="[s.bottleObj.x," s.bottleobj.y, s.bottleobj.width, s.bottleobj.height]; {string} document.body.style.cursor="val">= values[0] && val <= values[0] + values[2] && num>= values[1] && num <= values[1] + values[3] ? "pointer" : val>= lookup[0] && val <= lookup[0] + lookup[2] && num>= lookup[1] && num <= 0 lookup[1] + lookup[3] ? "pointer" : "default"; } }, view; }(); exports.islandspawn="BetterInterface;" var point="function(self)" { ** * @param {?} msg type {number} n cb @return function c(msg, type, n, cb) entity="self.call(this," "island", msg, cb, $realtime.island1280sprite(), 0) || this; return entity.box="new" errors.objectarea(entity, 0, 128, 2), entity.isinback="true," entity.reset(), entity; n(c, self), c.prototype.reset="function()" c.prototype.update="function()" self.prototype.update.call(this); c.prototype.draw="function(width)" self.prototype.draw.call(this, width); c; }(errors.gameobject); exports.island="Point;" meshrenderregion="function(self)" s next c(s, next) applyviewmodelsspy="self.call(this," "chest", s, next, $realtime.chestsprite()) applyviewmodelsspy.whichframe="0," applyviewmodelsspy.reset(), applyviewmodelsspy; @type this.whichsparkleframe="0;" this.animcounter="0;" this.animrate="self.Game.system.fps" 10; {boolean} this.isopening="false;" this.refreshcounter++; if (this.refreshcounter % this.refreshrate="=" this.refreshcounter="0;" 1) 3; (this.animcounter && true="==" this.isopening) this.whichframe (this.whichframe> 2) {
        /** @type {number} */
        this.whichFrame = 2;
        /** @type {boolean} */
        this.isOpening = false;
      }
      self.prototype.draw.call(this, p);
      this.sprite.draw(p, Math.floor(this.x), Math.floor(this.y), this.whichSparkleFrame, 1);
    }, c;
  }(errors.GameObject);
  exports.Chest = MeshRenderRegion;
  var Context = function(p) {
    /**
     * @param {?} type
     * @param {?} name
     * @param {?} f
     * @param {?} color
     * @return {?}
     */
    function c(type, name, f, color) {
      var applyViewModelsSpy = p.call(this, "Bottle", type, name, f, color, $realtime.bottleSprite(), 0) || this;
      return applyViewModelsSpy.reset(), applyViewModelsSpy;
    }
    return n(c, p), c.prototype.reset = function() {
      /** @type {number} */
      this.whichSparkleFrame = 0;
    }, c.prototype.update = function() {
      p.prototype.update.call(this);
    }, c.prototype.draw = function(e) {
      this.refreshCounter++;
      if (this.refreshCounter % this.refreshRate == 0) {
        /** @type {number} */
        this.refreshCounter = 0;
        /** @type {number} */
        this.whichSparkleFrame = (this.whichSparkleFrame + 1) % 3;
      }
      p.prototype.draw.call(this, e);
      $realtime.chestSprite().draw(e, Math.floor(this.x - 32), Math.floor(this.y - 32), this.whichSparkleFrame, 1);
    }, c;
  }(errors.GameObject);
  exports.Bottle = Context;
}, function(canCreateDiscussions, exports, i) {
  /** @type {boolean} */
  exports.__esModule = true;
  /** @type {number} */
  var duedate = Date.now();
  /** @type {number} */
  var row = 0;
  /**
   * @param {!Object} data
   * @param {!Event} e
   * @return {undefined}
   */
  exports.recordGameEnd = function(data, e) {
    var self = e.state || "lose";
    /** @type {number} */
    var STUB_RESULTS_DISTANCE = Math.round(data.distance) || 0;
    var n = data.tricks || 0;
    var r = data.boosts || 0;
    /** @type {boolean} */
    var a = !!e.collectedDog;
    var o = data.escapes || 0;
    var value = {
      endCondition : self,
      distance : STUB_RESULTS_DISTANCE,
      rampsHit : n,
      powerupsCollected : data.powerupsCollected || 0,
      powerupsUsed : r,
      dogSaved : a,
      krakensAvoided : o,
      konamiCodeUsed : !!e.usingKonamiSprite,
      msftCodeUsed : !!data.infiniteLives,
      edgeCodeUsed : !!data.infinitePowerups,
      krakenCodeUsed : !!data.krakenCodeUsed
    };
    if ("win" === self) {
      value.remainingLives = data.lives;
      value.remainingShields = data.shields;
      value.remainingPowerups = data.powerups;
    }
    if ("undefined" != typeof chrome && "function" == typeof chrome.send) {
      chrome.send("record-game-end", [value]);
    }
  };
  /**
   * @return {undefined}
   */
  exports.recordGameStart = function() {
    row = row + 1;
  };
  window.addEventListener("beforeunload", function() {
    /** @type {number} */
    var timeSubmittedDiff = Date.now() - duedate;
    if ("undefined" != typeof chrome && "function" == typeof chrome.send) {
      chrome.send("record-unload", [row, timeSubmittedDiff]);
    }
  });
}, , , , , , , , function(canCreateDiscussions, exports, FbmNoise2) {
  /** @type {boolean} */
  exports.__esModule = true;
  var elevationNoise = FbmNoise2(22);
  var ruggedNoise = FbmNoise2(28);
  /**
   * @return {undefined}
   */
  window.onload = function() {
    ruggedNoise.GameInput();
    elevationNoise.GameSetup();
  };
}, function(canCreateDiscussions, exports, require) {
  /** @type {boolean} */
  exports.__esModule = true;
  var Camera = require(0);
  /**
   * @return {undefined}
   */
  exports.GameSetup = function() {
    var canvas = $("game-canvas");
    var ep = new Camera.Game(canvas, 60);
    /** @type {number} */
    var pos = window.performance.now();
    /**
     * @return {undefined}
     */
    var tick = function() {
      requestAnimationFrame(tick);
      /** @type {number} */
      var d = window.performance.now() - pos;
      if (d > 1e3 / 60) {
        ep.gameLoop(d);
        /** @type {number} */
        pos = window.performance.now();
      }
    };
    requestAnimationFrame(tick);
    (function(saveNotifs, timeToFadeIn) {
      /** @type {null} */
      var _takingTooLongTimeout = null;
      window.addEventListener("resize", function() {
        if (null != _takingTooLongTimeout) {
          clearTimeout(_takingTooLongTimeout);
          /** @type {null} */
          _takingTooLongTimeout = null;
        }
        /** @type {number} */
        _takingTooLongTimeout = setTimeout(function() {
          /** @type {null} */
          _takingTooLongTimeout = null;
          saveNotifs();
        }, timeToFadeIn);
      });
    })(function() {
      ep.reflowCanvas();
    }, 50);
  };
}, function(canCreateDiscussions, exports, $) {
  var fn;
  var coerce = this && this.__extends || (fn = function(pos, obj) {
    return (fn = Object.setPrototypeOf || {
      __proto__ : []
    } instanceof Array && function(doc, window) {
      /** @type {!Object} */
      doc.__proto__ = window;
    } || function(properties, data) {
      var key;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          properties[key] = data[key];
        }
      }
    })(pos, obj);
  }, function(child, self) {
    /**
     * @return {undefined}
     */
    function proxy() {
      this.constructor = child;
    }
    fn(child, self);
    child.prototype = null === self ? Object.create(self) : (proxy.prototype = self.prototype, new proxy);
  });
  /** @type {boolean} */
  exports.__esModule = true;
  var self = $(0);
  var errors = $(5);
  var $realtime = $(3);
  var ReactMeteorData = function(handler) {
    /**
     * @param {?} val
     * @param {?} name
     * @return {?}
     */
    function self(val, name) {
      var self = handler.call(this, "Surfer", val, name, 64, 64, $realtime.surfer64Sprite()) || this;
      return self.box = new errors.ObjectArea(self, 16, 32, 32, 32), self.surferAngle = null, self.angleCounter = 0, self.crashCounter = 0, self.currentSpeed = 2, self.maxSpeed = 5, self.accel = .015, self.crashTimer = 0, self.surferInstance = 0, self.surfboardInstance = 6, self.surferSprite = $realtime.surfer64Sprite(), self.surferBottomPose = 1, self.surfboardFrame = 0, self.angleInterval = 20, self.updateInterval(), self;
    }
    return coerce(self, handler), self.prototype.updateInterval = function() {
      /** @type {number} */
      this.ySurfer = self.Game.system.interval * this.currentSpeed;
    }, self.prototype.update = function() {
      this.updateInterval();
      handler.prototype.update.call(this);
      if (this.crashTimer > 0) {
        this.surferCrash();
      } else {
        this.updatePosition();
        this.updateDirection();
        this.updateSprite();
      }
    }, self.prototype.updatePosition = function() {
      switch(self.Game.system.clearPath ? this.surferSlowdown() : this.currentSpeed < this.maxSpeed && (this.currentSpeed += this.accel), this.surferAngle) {
        case "left":
          this.move(.3 * -this.ySurfer, this.ySurfer);
          break;
        case "right":
          this.move(.3 * this.ySurfer, this.ySurfer);
      }
    }, self.prototype.updateDirection = function() {
      if (this.angleCounter % this.angleInterval == 0) {
        /** @type {number} */
        this.angleCounter = 0;
        this.angleInterval = self.Game.system.linearMap(30, 60);
        /** @type {number} */
        var dx = Math.random();
        /** @type {string} */
        this.surferAngle = dx > .5 ? "left" : "right";
      }
      this.angleCounter++;
    }, self.prototype.updateSprite = function() {
      switch(this.surferAngle) {
        case "left":
          /** @type {number} */
          this.whichFrame = 3 * this.surferInstance + 0;
          /** @type {number} */
          this.surfboardFrame = 3 * this.surfboardInstance + 0;
          break;
        case "right":
          /** @type {number} */
          this.whichFrame = 3 * this.surferInstance + 1;
          /** @type {number} */
          this.surfboardFrame = 3 * this.surfboardInstance + 1;
      }
    }, self.prototype.surferCrash = function() {
      /** @type {number} */
      this.whichFrame = 3 * this.surferInstance + 2;
      /** @type {number} */
      this.surfboardFrame = 3 * this.surferInstance + 2;
      this.crashCounter++;
      if (this.crashCounter % self.Game.system.fps == 0) {
        this.crashTimer -= 1;
      }
      if (0 === this.crashTimer) {
        /** @type {number} */
        this.currentSpeed = 1;
        /** @type {number} */
        this.crashTimer = 0;
        /** @type {number} */
        this.crashCounter = 0;
        /** @type {boolean} */
        this.hasRipple = false;
      }
    }, self.prototype.surferSlowdown = function() {
      if (this.currentSpeed > 0) {
        this.currentSpeed -= 2 * this.accel;
      }
    }, self.prototype.draw = function(e) {
      this.surferSprite.draw(e, Math.floor(this.x), Math.floor(this.y), this.surfboardFrame, this.surferBottomPose);
      handler.prototype.draw.call(this, e);
    }, self;
  }(errors.GameObject);
  exports.Surfer = ReactMeteorData;
}, function(canCreateDiscussions, module, require) {
  var fn;
  var coerce = this && this.__extends || (fn = function(pos, obj) {
    return (fn = Object.setPrototypeOf || {
      __proto__ : []
    } instanceof Array && function(doc, window) {
      /** @type {!Object} */
      doc.__proto__ = window;
    } || function(properties, data) {
      var key;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          properties[key] = data[key];
        }
      }
    })(pos, obj);
  }, function(child, self) {
    /**
     * @return {undefined}
     */
    function proxy() {
      this.constructor = child;
    }
    fn(child, self);
    child.prototype = null === self ? Object.create(self) : (proxy.prototype = self.prototype, new proxy);
  });
  /** @type {boolean} */
  module.__esModule = true;
  var client = require(0);
  var form_common = require(5);
  var scope = require(1);
  var TagHourlyStat = require(3);
  var Enemy = function(handler) {
    /**
     * @param {?} val
     * @param {?} name
     * @return {?}
     */
    function self(val, name) {
      var self = handler.call(this, "Enemy", val, name, 128, 128, TagHourlyStat.enemy128Sprite(), 0) || this;
      return self.box = new form_common.ObjectArea(self, 32, 80, 64, 40), self.angleInterval = 20, self.angleCounter = 0, self.angleToPlayer = null, self.chaseCounter = 0, self.crashCounter = 0, self.grabCounter = 0, self.currentSpeed = 0, self.maxSpeed = 1.5, self.gotPlayer = false, self.crashTimer = 0, self.updateInterval(), self;
    }
    return coerce(self, handler), self.prototype.updateInterval = function() {
      /** @type {number} */
      this.accel = .08 * client.Game.system.interval;
    }, self.prototype.update = function() {
      this.updateInterval();
      handler.prototype.update.call(this);
      if (this.gotPlayer) {
        this.enemyGrab();
      } else {
        if (this.crashTimer > 0) {
          this.enemyCrash();
        } else {
          this.updatePosition();
          this.updateDirection();
          this.updateSprite();
        }
      }
    }, self.prototype.updatePosition = function() {
      var scale = client.Game.system.interval;
      var c = scope.Player.instance;
      /** @type {boolean} */
      var i = this.y + this.height >= c.y + c.height;
      if (client.Game.system.clearPath) {
        this.enemySlowdown(scale);
      } else {
        if (this.currentSpeed > this.maxSpeed || i) {
          this.currentSpeed -= this.accel;
        } else {
          if (this.currentSpeed < this.maxSpeed && !i) {
            this.currentSpeed += this.accel;
          }
        }
      }
      /** @type {number} */
      var x = Math.abs(c.xSpeed) * scale;
      if (i) {
        /** @type {number} */
        x = x + this.currentSpeed * scale;
      }
      /** @type {number} */
      var deltaY = Math.min((c.ySpeed / 1.1 + this.currentSpeed) * scale, (c.maxSpeed + 1.5) * scale);
      switch(this.angleToPlayer) {
        case "left":
          if ("right-down" === c.state || "right" === c.state) {
            this.move(-x / 4, deltaY);
          } else {
            this.move(-x - this.currentSpeed * scale, deltaY);
          }
          break;
        case "right":
          if ("left-down" === c.state || "left" === c.state) {
            this.move(x / 4, deltaY);
          } else {
            this.move(x + this.currentSpeed * scale, deltaY);
          }
      }
    }, self.prototype.updateDirection = function() {
      if (this.angleCounter % this.angleInterval == 0) {
        /** @type {number} */
        this.angleCounter = 0;
        /** @type {number} */
        this.angleInterval = Math.round(client.Game.system.linearMap(10, 20) / client.Game.system.interval);
        /** @type {boolean} */
        var panelIsLeft = this.x + this.width / 2 >= scope.Player.instance.x + scope.Player.instance.width / 2;
        /** @type {string} */
        this.angleToPlayer = panelIsLeft ? "left" : "right";
      }
      this.angleCounter++;
    }, self.prototype.updateSprite = function() {
      this.chaseCounter++;
      if (this.chaseCounter % (client.Game.system.fps / 10) == 0) {
        /** @type {number} */
        this.chaseCounter = 0;
        /** @type {number} */
        this.whichFrame = (this.whichFrame + 1) % 3;
      }
    }, self.prototype.enemyGrab = function() {
      if (this.whichFrame < 4) {
        /** @type {number} */
        this.whichFrame = 4;
      }
      this.grabCounter += 1;
      if (this.grabCounter % (client.Game.system.fps / 10) == 0) {
        /** @type {number} */
        this.grabCounter = 0;
        this.whichFrame += 1;
      }
      if (this.whichFrame > 9) {
        /** @type {number} */
        this.whichFrame = 9;
        /** @type {boolean} */
        client.Game.system.updateEnding = false;
        /** @type {boolean} */
        this.gotPlayer = false;
      }
    }, self.prototype.enemyCrash = function() {
      /** @type {number} */
      this.whichFrame = 3;
      this.crashCounter++;
      if (this.crashCounter % client.Game.system.fps == 0) {
        this.crashTimer -= 1;
      }
      if (0 === this.crashTimer) {
        /** @type {number} */
        this.currentSpeed = 0;
        /** @type {number} */
        this.crashCounter = 0;
      }
    }, self.prototype.enemySlowdown = function(blockScale) {
      if (this.currentSpeed > 0) {
        this.currentSpeed -= this.accel * blockScale;
      }
    }, self;
  }(form_common.GameObject);
  module.Enemy = Enemy;
}, function(canCreateDiscussions, exports, $) {
  var fn;
  var _classCallCheck = this && this.__extends || (fn = function(pos, obj) {
    return (fn = Object.setPrototypeOf || {
      __proto__ : []
    } instanceof Array && function(doc, window) {
      /** @type {!Object} */
      doc.__proto__ = window;
    } || function(properties, data) {
      var key;
      for (key in data) {
        if (data.hasOwnProperty(key)) {
          properties[key] = data[key];
        }
      }
    })(pos, obj);
  }, function(child, self) {
    /**
     * @return {undefined}
     */
    function proxy() {
      this.constructor = child;
    }
    fn(child, self);
    child.prototype = null === self ? Object.create(self) : (proxy.prototype = self.prototype, new proxy);
  });
  /** @type {boolean} */
  exports.__esModule = true;
  var config = $(5);
  var self = $(0);
  var $realtime = $(3);
  var ReactMeteorData = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 64, 64, $realtime.objects64Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, 8, 36, 48, 20), me.hasRipple = true, me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.Objects64 = ReactMeteorData;
  var GetFlashVars = function(Tokenizer) {
    /**
     * @param {?} e
     * @param {?} n
     * @param {?} t
     * @return {?}
     */
    function consume(e, n, t) {
      var me = Tokenizer.call(this, e, n, 32, 32, $realtime.objects32Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, 2, 20, 28, 12), me.hasRipple = true, me.effect = "float", me;
    }
    return _classCallCheck(consume, Tokenizer), consume;
  }(config.Obstacle);
  exports.Objects32 = GetFlashVars;
  var BetterInterface = function(Tokenizer) {
    /**
     * @param {?} e
     * @param {?} f
     * @param {?} s
     * @return {?}
     */
    function onComplete(e, f, s) {
      var me = Tokenizer.call(this, e, f, 64, 64, $realtime.interactive64Sprite(), s) || this;
      return me.box = new config.ObjectArea(me, 8, 12, 48, 40), me.isAnimated = true, me.hasRipple = true, me.isInBack = true, me.effect = "ramp", me;
    }
    return _classCallCheck(onComplete, Tokenizer), onComplete;
  }(config.Obstacle);
  exports.Ramp64 = BetterInterface;
  var SearchFiles = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 64, 64, $realtime.interactive64Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, -64, -64, 192, 192), me.isAnimated = true, me.hasRipple = true, me.effect = "tentacle", me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.Tentacle64 = SearchFiles;
  var CreateSBTreeClass = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 64, 64, $realtime.interactive64Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, 4, 8, 56, 48), me.isAnimated = true, me.isInBack = true, me.effect = "slow", me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.Wake64 = CreateSBTreeClass;
  var NodeConstructor = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 192, 64, $realtime.interactive192Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, 8, 8, 176, 48), me.isAnimated = true, me.isInBack = true, me.effect = "slow", me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.Wake192 = NodeConstructor;
  var createNil = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 64, 64, $realtime.interactive64Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, 4, 8, 56, 48), me.isAnimated = true, me.isInBack = true, me.effect = "superslow", me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.Seaweed64 = createNil;
  var edgequad = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 192, 64, $realtime.interactive192Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, 8, 8, 176, 48), me.isAnimated = true, me.isInBack = true, me.effect = "superslow", me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.Seaweed192 = edgequad;
  var newAnonymousLambdaName = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function render(m, e, t) {
      var me = Tokenizer.call(this, m, e, 64, 64, $realtime.interactive64Sprite(), t) || this;
      return me.animCounter = 0, me.animRate = self.Game.system.fps / 10, me.isAnimated = true, me.hasRipple = true, me.isInBack = true, me.effect = "powerup", me;
    }
    return _classCallCheck(render, Tokenizer), render;
  }(config.Obstacle);
  exports.Powerup64 = newAnonymousLambdaName;
  var isLineComplete = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function render(m, e, t) {
      var me = Tokenizer.call(this, m, e, 128, 128, $realtime.swirl128Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, 16, 32, 96, 64), me.isAnimated = true, me.isInBack = true, me.effect = "spin", me;
    }
    return _classCallCheck(render, Tokenizer), render;
  }(config.Obstacle);
  exports.Whirlpool128 = isLineComplete;
  var VersionableList = function(t) {
    /**
     * @param {?} e
     * @param {?} text
     * @param {number} ratio
     * @return {?}
     */
    function draw(e, text, ratio) {
      var that = t.call(this, e, text, 64, 64, $realtime.ambient64Sprite(), 0) || this;
      return that.box = new config.ObjectArea(that, -128, -128, 320, 172), that.animCounter = 0, that.animRate = self.Game.system.fps / 10, that.whichFrame = 6 * ratio, that.whichPose = -1, that.ambientInstance = ratio, that.hasRipple = true, that.isInBack = true, that.effect = "ambient", that;
    }
    return _classCallCheck(draw, t), draw;
  }(config.Obstacle);
  exports.Ambient64 = VersionableList;
  var VersionableMap = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 256, 128, $realtime.sandbar256Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, 20, 72, 216, 24), me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.Sandbar256 = VersionableMap;
  var SuggestList = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 64, 64, $realtime.objects64Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, 8, 36, 48, 20), me.hasRipple = true, me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.Characters64 = SuggestList;
  var insertionBinarySort = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 64, 64, $realtime.interactive64Sprite(), t) || this;
      return me.box = new config.ObjectArea(me, -32, -32, 128, 128), me.isAnimated = true, me.hasRipple = true, me.effect = "dogsurf", me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.Dog64 = insertionBinarySort;
  var minCoinsChange = function(Tokenizer) {
    /**
     * @param {?} m
     * @param {?} e
     * @param {?} t
     * @return {?}
     */
    function onStart(m, e, t) {
      var me = Tokenizer.call(this, m, e, 64, 64, $realtime.interactive64Sprite(), t) || this;
      return me.isAnimated = true, me.hasRipple = true, me.effect = null, me;
    }
    return _classCallCheck(onStart, Tokenizer), onStart;
  }(config.Obstacle);
  exports.DogCrash64 = minCoinsChange;
}, function(canCreateDiscussions, exports, $) {
  /** @type {boolean} */
  exports.__esModule = true;
  var self = $(0);
  var ReactMeteorData = function() {
    /**
     * @return {?}
     */
    function Nav() {
      if (Nav.instance) {
        return Nav.instance;
      }
      Nav.instance = this;
      this.reset();
    }
    return Nav.prototype.reset = function() {
    }, Nav.prototype.update = function() {
      this.cleanObjects();
    }, Nav.prototype.cleanObjects = function() {
      /**
       * @param {!Object} x
       * @return {?}
       */
      function init(x) {
        return !!x && !((e = x).y + e.height < -200 || function(tx) {
          return tx.y > self.Game.system.height + 200;
        }(x) || x.destroy);
        var e;
      }
      self.Game.system.objUpper = self.Game.system.objUpper.filter(init);
      self.Game.system.objMain = self.Game.system.objMain.filter(init);
      self.Game.system.objLower = self.Game.system.objLower.filter(init);
      self.Game.system.objBack = self.Game.system.objBack.filter(init);
    }, Nav;
  }();
  exports.Cleanup = ReactMeteorData;
}, function(canCreateDiscussions, ChatworkExtension, i) {
  /** @type {boolean} */
  ChatworkExtension.__esModule = true;
  var Background = function() {
    /**
     * @return {?}
     */
    function callback() {
      if (callback.instance) {
        return callback.instance;
      }
      callback.instance = this;
      this.water = $("water");
      this.gradient = $("gradient");
      this.reset();
    }
    return callback.prototype.reset = function() {
      /** @type {number} */
      this.x = 0;
      /** @type {number} */
      this.y = 0;
      /** @type {number} */
      this.stepCount = 0;
      this.updateWater(0, 0, 0, 0, 0);
    }, callback.prototype.updateWater = function(b, buffer, pos, offset, duration) {
      /** @type {number} */
      this.x = (this.x + offset * pos - b) % 256;
      /** @type {number} */
      this.y = (this.y + duration * pos * 1.025 - buffer) % 256;
      /** @type {string} */
      this.water.style.backgroundPosition = -this.x + "px " + -this.y + "px";
    }, callback.prototype.setupGradient = function(frameCount) {
      /**
       * @param {(boolean|number|string)} i
       * @param {(boolean|number|string)} imageID
       * @return {?}
       */
      function makeWorkerBlob(i, imageID) {
        return (imageID - i) / frameCount;
      }
      /** @type {!Array} */
      this.startA = [56, 194, 238];
      /** @type {!Array} */
      this.stopA = [46, 195, 208];
      /** @type {!Array} */
      this.startB = [46, 195, 208];
      /** @type {!Array} */
      this.stopB = [248, 255, 214];
      /** @type {string} */
      this.gradient.style.background = "linear-gradient(180deg, rgb(" + this.startA + ") 0%, rgb(" + this.stopA + ") 100%)";
      /** @type {!Array} */
      this.stepStart = [0, 0, 0];
      /** @type {!Array} */
      this.stepStop = [0, 0, 0];
      /** @type {number} */
      var name = 0;
      for (; name < 3; name++) {
        this.stepStart[name] = makeWorkerBlob(this.startA[name], this.startB[name]);
        this.stepStop[name] = makeWorkerBlob(this.stopA[name], this.stopB[name]);
      }
    }, callback.prototype.updateGradient = function(height, top) {
      var m = this;
      if (!(this.stepCount >= height || this.stepCount > top)) {
        /** @type {number} */
        this.stepCount = height;
        var s = this.startA.map(function(canCreateDiscussions, _axisDimName) {
          return canCreateDiscussions + m.stepStart[_axisDimName] * m.stepCount;
        });
        var n = this.stopA.map(function(canCreateDiscussions, _axisDimName) {
          return canCreateDiscussions + m.stepStop[_axisDimName] * m.stepCount;
        });
        /** @type {string} */
        this.gradient.style.background = "linear-gradient(180deg, rgb(" + s + ") 0%, rgb(" + n + ") 100%)";
      }
    }, callback.prototype.gameLoseGradient = function() {
      /** @type {string} */
      this.gradient.style.background = "linear-gradient(180deg, rgb(" + [126, 126, 126] + ") 0%, rgb(" + [187, 187, 187] + ") 100%)";
    }, callback;
  }();
  ChatworkExtension.Background = Background;
}, function(canCreateDiscussions, exports, $) {
  /** @type {boolean} */
  exports.__esModule = true;
  var self = $(0);
  var data = $(7);
  var scope = $(1);
  var _c = $(6);
  var $realtime = $(13);
  /**
   * @return {undefined}
   */
  exports.GameInput = function() {
    window.addEventListener("keyup", function(e) {
      input.onKeyup(e);
    }, false);
    window.addEventListener("keydown", function(e) {
      input.onKeydown(e);
    }, false);
    /** @type {number} */
    var previousJ = 0;
    /** @type {null} */
    var _lastKey = null;
    /** @type {boolean} */
    var bCmd = false;
    /** @type {null} */
    var i = null;
    var input = {
      _pressed : {},
      UP : 38,
      DOWN : 40,
      LEFT : 37,
      RIGHT : 39,
      ENTER : 13,
      SPACE : 32,
      W : 87,
      A : 65,
      S : 83,
      D : 68,
      F : 70,
      ESC : 27,
      codes : [[38, 38, 40, 40, 37, 39, 37, 39, 66, 65], [77, 73, 67, 82, 79, 83, 79, 70, 84], [69, 68, 71, 69], [75, 82, 65, 75, 69, 78]],
      codePosition : 0,
      isDown : function(keyCode) {
        return this._pressed[keyCode];
      },
      onKeydownPlaying : function(type) {
        if (input.isDown(input.DOWN) || input.isDown(input.S)) {
          /** @type {!Date} */
          var j = new Date;
          if (j - previousJ <= 400) { scope.player.instance.boost(); ** @type {number} * j="0;" } {(date|number)} previousj="j;" if ("air"="==" scope.player.instance.state.substring(0, 3)) scope.player.instance.trick="(scope.Player.instance.trick" + 1) % scope.player.instance.maxtricks; self.game.system.tricks else {string} scope.player.instance.state="down" ; (input.isdown(input.left) || input.isdown(input.a)) ("left-down"="==" "left"="==" scope.player.instance.state) (input.isdown(input.right) input.isdown(input.d)) ("right-down"="==" "right"="==" (input.isdown(input.up) input.isdown(input.w)) (input.isdown(input.f)) }, onkeydownwinlose : function(type) (input.isdown(input.enter) input.isdown(input.space)) data.interface.system.clearscreen(); self.game.system.initializegame(); onkeydownwaiting function(event) data.interface.system.buildstartscreen(); _c.spawn.instance.spawnpoweruprow(); self.game.system.gamestate="ready" (scope.player.instance.character> 0) {
              scope.Player.instance.character -= 1;
            }
          } else {
            if ((input.isDown(input.RIGHT) || input.isDown(input.D)) && scope.Player.instance.character < scope.Player.instance.totalCharacters - 1) {
              scope.Player.instance.character += 1;
            }
          }
        }
        var keyCode = event.keyCode;
        if (bCmd && keyCode === this.codes[i][this.codePosition + 1]) {
          if (this.codePosition++, keyCode === this.codes[i][this.codes[i].length - 1]) {
            switch(i) {
              case 0:
                scope.Player.instance.konamiSprite();
                break;
              case 1:
                /** @type {boolean} */
                self.Game.system.infiniteLives = true;
                self.Game.system.lives = self.Game.system.maxLives;
                break;
              case 2:
                /** @type {boolean} */
                self.Game.system.infinitePowerups = true;
                self.Game.system.powerups = self.Game.system.maxPowerups;
                break;
              case 3:
                /** @type {boolean} */
                self.Game.system.krakenCodeUsed = true;
                /** @type {number} */
                _c.Spawn.instance.nextEnemy = 100;
                /** @type {number} */
                _c.Spawn.instance.freqEnemy = 50;
            }
            /** @type {boolean} */
            bCmd = false;
            /** @type {number} */
            this.codePosition = 0;
            /** @type {null} */
            i = null;
          }
        } else {
          if (bCmd && this.codePosition </=></=></=></=></=></=></=></=></=></=></=></=></=></=></=>