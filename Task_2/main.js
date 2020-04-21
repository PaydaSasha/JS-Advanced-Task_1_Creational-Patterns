var ticTacToe = (function () {
    /*----- constants -----*/
    var player_1;
    var player_2;
    var score_1 = 0;
    var score_2 = 0;
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    /*----- app's state (variables) -----*/
    var board;
    var turn = 'X';
    var win;





    /*----- cached element references -----*/
    var squares = Array.from(document.getElementsByClassName('square'));
    var message = document.getElementById('message')
    var player_1_name = document.getElementById('player_1_name');
    var player_2_name = document.getElementById('player_2_name');
    var player_1_score = document.getElementById('player_1_score');
    var player_2_score = document.getElementById('player_2_score');
    var boardDOM = document.getElementById('board');



    /*----- event listeners -----*/
    document.getElementById('board').addEventListener('click', handleTurn);
    document.getElementById('reset-button').addEventListener('click', reset);
    document.getElementById('newGame-button').addEventListener('click', newGame);

    /*----- functions -----*/

    function handleTurn(event) {
        var idx = squares.findIndex(square => square === event.target);
        if (board[idx] === '') {
            board[idx] = turn;
            turn = turn === 'X' ? 'O' : 'X';
        }


        var playerTurn = turn === 'X' ? player_1 : player_2;
        win = getWinner();
        message.textContent = win ? win === 'Tie' ? 'It`s Tie' : `Winner is ${win}!` : `It's ${playerTurn} turn!`;
        win ? setTimeout(() => {
            init()
        }, 1500) : null;
        render();
    }

    function getWinner() {
        let winner = null;
        winningCombos.forEach(function (combo, index) {
            if (board[combo[0]] && board[combo[0]] === board[combo[1]] && board[combo[0]] === board[combo[2]]) {
                if (board[combo[0]] === 'X') {
                    winner = player_1;
                    score_1++;
                    player_1_score.textContent = `Score = ${score_1}`;
                    player_1_score.style.transform = 'scale(1.5)';
                    boardDOM.style.transform = 'scale(1.1)';
                    // boardDOM.style.transform ='rotateY(180deg)';

                    setTimeout(() => {
                        player_1_score.style.transform = 'scale(1.0)';
                        boardDOM.style.transform = 'scale(1.0)';
                        boardDOM.style.transform = 'rotateY(180deg)';
                    }, 300);
                } else {
                    winner = player_2;
                    score_2++;
                    player_2_score.textContent = `Score = ${score_2}`;
                    player_2_score.style.transform = 'scale(1.5)';
                    boardDOM.style.transform = 'scale(1.1)';
                    boardDOM.style.transform = 'rotateY(180deg)';
                    setTimeout(() => {
                        player_2_score.style.transform = 'scale(1.0)';
                        boardDOM.style.transform = 'scale(1.0)';
                    }, 300);

                }
            }
        });
        return winner ? winner : board.includes('') ? null : 'Tie';
    }

    function init() {
        turn = 'X';
        message.textContent = `It's ${player_1} turn!`;
        board = ['', '', '', '', '', '', '', '', ''];

        render();
    };



    function render() {

        board.forEach(function (mark, index) {
            squares[index].textContent = mark;
        });

    };

    function newGame() {
        setTimeout(() => {
            player_1 = prompt('Enter first player name, you gonna play with `X`', 'Player_1');
            player_2 = prompt('Enter first player name, you gonna play with `O`', 'Player_2');

            init();
            player_1_name.textContent = `${player_1}`;
            player_2_name.textContent = `${player_2}`;

        }, 500);
        reset();

    }

    function reset() {
        score_1 = 0;
        score_2 = 0;
        player_1_score.textContent = `Score = ${score_1}`;
        player_2_score.textContent = `Score = ${score_2}`;

        init();
    }
    return {
        newGame: newGame
    }
})();

ticTacToe.newGame();