var spanTagWithCurrentYear = document.getElementById('span_current_year_id') as HTMLSpanElement;
spanTagWithCurrentYear.innerText = new Date().getFullYear().toString();
var table = document.getElementById('table_game') as HTMLDivElement;
var opposingSide = document.getElementById('opposing_side') as HTMLDivElement;

var gameBoard : HTMLSpanElement[][] = new Array<Array<HTMLSpanElement>>;
var opposingBoard : HTMLSpanElement[][] = new Array<Array<HTMLSpanElement>>;

enum PositionType {
    HORIZONTAL = "Horizontal",
    VERTICAL = "Vertical",
}

class Ship {
    constructor(public hitPoints: number, public positionType : PositionType, public letterAxis : string, public yAxis : number) {}
}

// Player's board
createBoard();
displayBoard();

createOpposingBoard();
placeShipsOfEnemy();

function placeShipsOfEnemy() : void {
    const generateRandomNumber = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    var randomPositionForDestroyer : number = generateRandomNumber(1, 2);
    var destroyer = createEnemyShip(5, 
        randomPositionForDestroyer == 1 ? PositionType.HORIZONTAL : PositionType.VERTICAL);
}

function createEnemyShip(hitPoints : number, positionType : PositionType) : Ship {
    var yPosition : number = 1;

    const generateRandomNumber = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    // Starting position
    var charCode : number = generateRandomNumber(1, 10);
    var letter : string = String.fromCharCode(65 + charCode);
    var numberOnYAxis : number = generateRandomNumber(1, 10);

    var arrayOfCoordinates : string[] = new Array();   

    
    var ship = new Ship(hitPoints, positionType, letter, yPosition);
    var childNodesOfOpposingSide = opposingSide.childNodes;

    function excludeBrTags(element : HTMLElement) : boolean {
        return element.tagName !== 'BR';
    }

    var arrayOfChildrenForOpposingSide : any = Array.prototype
        .slice
        .call(childNodesOfOpposingSide)
        .filter(excludeBrTags);
    if (PositionType.HORIZONTAL === ship.positionType) {
        do {
            charCode++;
            letter = String.fromCharCode(65 + charCode);
            arrayOfCoordinates.push(letter + numberOnYAxis);
            hitPoints--;
        } while (hitPoints !== 0);
    } else if (PositionType.VERTICAL === ship.positionType) {
        do {
            hitPoints--;
        } while (hitPoints !== 0);
    }
    alert("Array of coordinates: " + arrayOfCoordinates);
    return ship;
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
            } else if (i >= 1 && j >= 1) {
                var temp : string = String.fromCharCode(65 + (j - 1)) + "," + i.toString(); 
                mySpan.innerText = temp;
                mySpan.title = temp;
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
                var temp : string = String.fromCharCode(65 + (j - 1)) + "," + i.toString(); 
                mySpan.title = temp;
                mySpan.innerHTML = '&nbsp;';
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