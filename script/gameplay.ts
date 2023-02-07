var spanTagWithCurrentYear = document.getElementById('span_current_year_id') as HTMLSpanElement;
spanTagWithCurrentYear.innerText = new Date().getFullYear().toString();
var table = document.getElementById('table_game') as HTMLDivElement;
var opposingSide = document.getElementById('opposing_side') as HTMLDivElement;

var gameBoard : HTMLSpanElement[][] = new Array<Array<HTMLSpanElement>>;
var opposingBoard : HTMLSpanElement[][] = new Array<Array<HTMLSpanElement>>;

enum PositionType {
    HORIZONTAL,
    VERTICAL,
}

class Ship {
    constructor(public hitPoints: number, public xAxis : number, public yAxis : number, public positionType : PositionType) {}
}

// Player's board
createBoard();
displayBoard();

createOpposingBoard();

function createBoard() : void {
    for (var i = 0; i < 11; i++) {
        var rowOfSpans : HTMLSpanElement[] = new Array<HTMLSpanElement>;
        for (var j = 0; j < 11; j++) {
            let mySpan = document.createElement('span') as HTMLSpanElement;
            mySpan.className = 'grid_square';
            if (i === 0) {
                if (j === 0) {
                    mySpan.innerHTML = '&nbsp;';
                } else {
                    mySpan.innerText = String.fromCharCode(65 + (j - 1));
                }
            } else if (i !== 0 && j === 0) {
                mySpan.innerText = i.toString();
            } else if (i >= 1 && j >= 1) {
                var temp : string = String.fromCharCode(65 + (j - 1)) + ", " + i.toString(); 
                mySpan.innerText = temp;
            }
            rowOfSpans.push(mySpan);
        }
        gameBoard.push(rowOfSpans);
    }
}

function displayBoard() : void {
    for (var i = 0; i < gameBoard.length; i++) {
        for (var j = 0; j < gameBoard[i].length; j++) {
            table.appendChild(gameBoard[i][j]);
            if (j == 10) {
                table.appendChild(document.createElement('br'));
            }
        }
    }
}

function createOpposingBoard() : void {
    for (var i = 0; i < 11; i++) {
        var rowOfSpans : HTMLSpanElement[] = new Array<HTMLSpanElement>;
        for (var j = 0; j < 11; j++) {
            let mySpan = document.createElement('span') as HTMLSpanElement;
            mySpan.className = 'grid_square';
            if (i === 0) {
                if (j === 0) {
                    mySpan.innerHTML = '&nbsp;';
                } else {
                    mySpan.innerText = String.fromCharCode(65 + (j - 1));
                }
            } else if (i !== 0 && j === 0) {
                mySpan.innerText = i.toString();
            } else if (i >= 1 && j >= 1) {
                var temp : string = String.fromCharCode(65 + (j - 1)) + ", " + i.toString(); 
                mySpan.innerText = temp;
            }
            rowOfSpans.push(mySpan);
        }
        opposingBoard.push(rowOfSpans);
    }

    for (var i = 0; i < opposingBoard.length; i++) {
        for (var j = 0; j < opposingBoard[i].length; j++) {
            opposingSide.appendChild(opposingBoard[i][j]);
            if (j == 10) {
                opposingSide.appendChild(document.createElement('br'));
            }
        }
    }
}