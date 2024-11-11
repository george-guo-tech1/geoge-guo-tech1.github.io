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
    exports.Interface = a</=>