if (typeof dist == "undefined" || !dist) {
    var dist = {};
}
if (typeof dist.Game == "undefined" || !dist.Game) {
    dist.Game = {};
}

dist.Game.Global = function () {
    this.init();
};

// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Prototype
dist.Game.Global.prototype = {

    symBole: ['X', 'O'],
    currentPlayer: 1,
    numWin: 3,
    idReset: 'reset',
    idGrid: 'grid',
    idCurrentPlayer: 'currentPlayer',
    finished: false,

    // --------------------------------------------------------------------------------------------
    init: function () {
        window.addEventListener('load', function () {
            app.init_event();
            app.nextPlayer();
        });
    },

    // --------------------------------------------------------------------------------------------

    init_event: function () {
        document.getElementById(this.idGrid).addEventListener('click', function (event) {
            app.onClick(event);
        });
        document.getElementById(this.idReset).addEventListener('click', function (event) {
            app.onReset(event);
        });
    },

    // --------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------


    onClick: function (event) {
        event.preventDefault();
        var elt = event.target;

        if (this.finished) {
            return false;
        }

        if (this.checkValidDom(elt) && elt.tagName.toUpperCase() == 'TD') {
            if (this.isAlreadyUse(elt)) {
                return false;
            }

            this.check(elt);
        }
    },

    onReset: function (event) {
        var table = document.getElementById(this.idGrid);
        var lines = table.getElementsByTagName('TR');

        for (var i = 0; i < lines.length; i++) {
            var cols = lines[i].getElementsByTagName('TD');
            for (var j = 0; j < cols.length; j++) {
                cols[j].innerHTML = '';
            }
        }

        this.currentPlayer = 1;
        this.nextPlayer();
    },

    isAlreadyUse: function (elt) {

        if (this.checkValidDom(elt) && elt.innerHTML != '') {
            return true;
        }

        return false;
    },

    check: function (elt) {
        if (this.checkValidDom(elt) === false) {
            return false;
        }
        elt.innerHTML = this.symBole[this.currentPlayer];

        if (this.isWinGame()) {
            this.finished = true;
            alert('Player ' + (this.currentPlayer + 1) + ' wins !!!');
        } else {
            this.nextPlayer();
        }

    },

    nextPlayer: function () {
        if (this.currentPlayer == 1) {
            this.currentPlayer = 0;
        } else {
            this.currentPlayer = 1;
        }

        document.getElementById(this.idCurrentPlayer).innerHTML = "It's player " + (this.currentPlayer + 1) + "'s turn";
    },

    isWinGame: function () {
        var table = document.getElementById(this.idGrid);
        var lines = table.getElementsByTagName('TR');

        if (this.isWinLines(lines)) {
            return true;
        }
        if (this.isWineCols(lines)) {
            return true;
        }
        if (this.isWinDiagonal(lines)) {
            return true;
        }
        return false;
    },

    isWineCols: function (lines) {
        for (var col = 0; col < this.numWin; col++) {
            var isSame = true;

            for (var i = 0; i < lines.length; i++) {
                var cols = lines[i].getElementsByTagName('TD');
                if (cols[col].innerHTML != this.symBole[this.currentPlayer]) {
                    isSame = false;
                    break;
                }
            }

            if (isSame === true) {
                return isSame;
            }
        }

        return false;
    },

    isWinDiagonal: function (lines) {
        for (var col = 0; col < this.numWin; col++) {
            var cols = lines[col].getElementsByTagName('TD');
            if (cols[col].innerHTML != this.symBole[this.currentPlayer]) {
                return false;
            }
        }
        return true;
    },

    isWinLines: function (lines) {
        if (this.checkValidDom(lines) === false) {
            return false;
        }

        for (var i = 0; i < lines.length; i++) {
            if (this.isWinLine(lines[i])) {
                return true;
            }
        }

        return false;
    },

    isWinLine: function (line) {
        if (this.checkValidDom(line) === false) {
            return false;
        }

        var col = line.getElementsByTagName('TD');
        for (var i = 0; i < col.length; i++) {
            if (col[i].innerHTML != this.symBole[this.currentPlayer]) {
                return false;
            }
        }

        return true;
    },

    checkValidDom: function (domElement) {
        if (typeof(domElement) != 'undefined' && domElement != null) {
            return true;
        }
        return false;
    }


};


// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------------
// Run instance
var app = new dist.Game.Global();
