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
                    if (i && this.codePosition </=>