document.addEventListener('DOMContentLoaded', function () {

    var playButton = document.getElementById("play-button");

    playButton.addEventListener("click", function () {

        playButton.innerHTML = "Reset";

        function isEven(value) {
            if (value % 2 == 0) {
                return true;
            } else {
                return false;
            };
        };

        function isOdd(value) {
            if (value % 1 == 0) {
                return true;
            } else {
                return false;
            };
        };

        function allSame(array) {

            var first = array[0];

            if (array[0] == "") {
                return false;
            } else {
                return array.every(function (element) {
                    return element == first;
                });
            };
        };

        var boardSize = parseInt(document.getElementById("game-size").value);

        var gameBoard = [];

        var numSquares = (boardSize * boardSize);

        for (var i = 0; i < numSquares; i++) {
            gameBoard.push(i);
        };

        var game = document.getElementById("game")

        game.innerHTML = '<div id="board"><div id="winner-text"></div></div>';

        var board = document.getElementById("board");

        board.style.height = (102 * boardSize) + 'px';
        board.style.width = (102 * boardSize) + 'px';

        for (var i = 0; i < numSquares; i++) {
            board.innerHTML += '<div class="square"></div>';
        };

        var squares = document.getElementsByClassName("square");

        for (var i = 0; i < numSquares; i++) {
            squares[i].setAttribute("id", i.toString());
        };

        var turnStatus = document.getElementById("turn-status")
        turnStatus.style.fontSize = "20px";

        turnStatus.innerHTML = "X's Turn";

        var boardClicks = 0;

        board.addEventListener("click", function () {

            if (getWinner()) {
                turnStatus.style.fontSize = "48px";
                turnStatus.innerHTML = winner[0] + ' wins!';

            } else if (isEven(boardClicks)) {
                turnStatus.innerHTML = "O's Turn";
            } else {
                turnStatus.style.color = "black";
                turnStatus.innerHTML = "X's Turn";
            };


            boardClicks++;
        });

        var squareClicks = [];

        for (var i = 0; i < numSquares; i++) {
            squareClicks[i] = 0;
        };

        var winner;

        var getWinner = function () {

            //check winner by row
            for (i = 0; i < numSquares; i += 1) {
                if ((i % boardSize) == 0) {
                    var rowCheck = [];
                    for (var squareNum = i; squareNum < (i + boardSize); squareNum += 1) {
                        rowCheck.push(squares[squareNum].innerHTML);
                    };

                    if (allSame(rowCheck)) {
                        winner = rowCheck;
                        return true;
                    };
                };
            };

            //check winner by column
            for (i = 0; i < numSquares; i += 1) {
                if (i < boardSize) {
                    var colCheck = [];
                    for (var squareNum = i; squareNum < numSquares; squareNum += boardSize) {
                        colCheck.push(squares[squareNum].innerHTML);
                    };

                    if (allSame(colCheck)) {
                        winner = colCheck;
                        return true;
                    };
                };
            };

            //check winner by left diagonal
            var leftDiagonal = [];
            for (i = 0; i < numSquares; i += 1) {
                if ((i % (boardSize + 1)) == 0) {
                    leftDiagonal.push(squares[i].innerHTML);
                };
            };
            if (allSame(leftDiagonal)) {
                winner = leftDiagonal;
                return true;
            };

            //check winner by right diagonal
            var rightDiagonal = [];
            for (i = (boardSize - 1); i < (numSquares - 1); i += 1) {
                if ((i % (boardSize - 1)) == 0) {
                    rightDiagonal.push(squares[i].innerHTML);
                };
            };
            if (allSame(rightDiagonal)) {
                winner = rightDiagonal;
                return true;
            };
        };


        var countClicks = function () {
            var divID = this.getAttribute("id");
            squareClicks[divID] += 1;

            if (isEven(boardClicks) && squareClicks[divID] == 1) {
                this.innerHTML = 'X';

            } else if (isOdd(boardClicks) && squareClicks[divID] == 1) {
                this.innerHTML = 'O';
                this.style.color = "red";

            } else if (!getWinner()) {
                alert('square already taken');
                boardClicks -= 1;
            } else {
            };

            if (getWinner()) {

                for (var i = 0; i < numSquares; i++) {
                    squareClicks[i] = 2;
                };

                document.getElementById("play-button").innerHTML = "Play again?"
            };
        };


        for (var i = 0; i < numSquares; i++) {
            squares[i].addEventListener("click", countClicks);
        };

    });

});