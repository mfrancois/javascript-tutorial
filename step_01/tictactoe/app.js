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
    idReset: '#reset',
    idGrid: '#grid',
    idCurrentPlayer: '#currentPlayer',
    finished: false,

    // --------------------------------------------------------------------------------------------
    init: function () {
        jQuery(document).ready(jQuery.proxy(this.onReady,this))
    },


    // --------------------------------------------------------------------------------------------

    onReady: function(){
        this.init_event();
        this.nextPlayer();
    },

    // --------------------------------------------------------------------------------------------

    init_event: function () {
        jQuery(this.idGrid).off('click').on('click',jQuery.proxy(this.onClick,this))
        jQuery(this.idReset).off('click').on('click',jQuery.proxy(this.onReset,this))
    },

    // --------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------
    // --------------------------------------------------------------------------------------------


    onClick: function (event) {
        event.preventDefault();
        var $elt = jQuery(event.target);

        if (this.finished) {
            return false;
        }

        if (this.checkValidDom($elt) && $elt.prop("tagName").toUpperCase() == 'TD') {
            if (this.isAlreadyUse($elt)) {
                return false;
            }

            this.check($elt);
        }
    },

    onReset: function (event) {
        var $table = jQuery(this.idGrid);
        var $lines = jQuery('tr',$table);

        for (var i = 0; i < $lines.length; i++) {
            var $cols = jQuery('td',$lines[i]);
            for (var j = 0; j < $cols.length; j++) {
                jQuery($cols[j]).html('');
            }
        }

        this.currentPlayer = 1;
        this.nextPlayer();
    },

    isAlreadyUse: function ($elt) {

        if (this.checkValidDom($elt) && $elt.html() != '') {
            return true;
        }

        return false;
    },

    check: function ($elt) {
        if (this.checkValidDom($elt) === false) {
            return false;
        }

        $elt.css({
            "transform":"rotateY(180deg)",
            "transition": "0.6s",
            "transform-style": "preserve-3d"
        });
        $elt.html(this.symBole[this.currentPlayer]);

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

        jQuery(this.idCurrentPlayer).html("It's player " + (this.currentPlayer + 1) + "'s turn");
    },

    isWinGame: function () {
        var $table = jQuery(this.idGrid);
        var $lines = jQuery('tr',$table);

        if (this.isWinLines($lines)) {
            return true;
        }
        if (this.isWineCols($lines)) {
            return true;
        }
        if (this.isWinDiagonal($lines)) {
            return true;
        }
        return false;
    },

    isWineCols: function ($lines) {
        for (var col = 0; col < this.numWin; col++) {
            var isSame = true;

            for (var i = 0; i < $lines.length; i++) {
                var $cols = jQuery('td',$lines[i]);
                if (jQuery($cols[col]).html() != this.symBole[this.currentPlayer]) {
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

    isWinDiagonal: function ($lines) {
        for (var col = 0; col < this.numWin; col++) {
            var $cols = jQuery('td',$lines[col]);
            if (jQuery($cols[col]).html() != this.symBole[this.currentPlayer]) {
                return false;
            }
        }
        return true;
    },

    isWinLines: function ($lines) {
        if (this.checkValidDom($lines) === false) {
            return false;
        }

        for (var i = 0; i < $lines.length; i++) {
            if (this.isWinLine(jQuery($lines[i]))) {
                return true;
            }
        }

        return false;
    },

    isWinLine: function ($line) {
        if (this.checkValidDom($line) === false) {
            return false;
        }

        var $col = jQuery('td',$line);
        for (var i = 0; i < $col.length; i++) {
            if (jQuery($col[i]).html() != this.symBole[this.currentPlayer]) {
                return false;
            }
        }

        return true;
    },

    checkValidDom: function (domElement) {
        if (typeof(domElement) != 'undefined' && domElement != null && domElement != '') {
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
