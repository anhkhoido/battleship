var spanTagWithCurrentYear = document.getElementById('span_current_year_id') as HTMLSpanElement;
spanTagWithCurrentYear.innerText = new Date().getFullYear().toString();
var table = document.getElementById('table_game') as HTMLDivElement;
var gameBoard : HTMLSpanElement[][] = new Array<Array<HTMLSpanElement>>;

class Ship {
    constructor(public hitPoints: number, public xAxis : number, public yAxis : number) {}
}

var myFleet : Ship[] = createFleet();
var enemyFleet : Ship[] = createFleet();
createBoard();
displayBoard();

function createFleet() : Ship[] {
    var carrier = new Ship(5, 0, 0);
    var battleship = new Ship(4, 0, 0);
    var cruiser = new Ship(3, 0, 0);
    var submarine = new Ship(3, 0, 0);
    var destroyer = new Ship(2, 0, 0);
    return new Array(carrier, battleship, cruiser, submarine, destroyer);
}

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
            } else {
                mySpan.innerHTML = '&nbsp;';
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