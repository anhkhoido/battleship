var spanTagWithCurrentYear = document.getElementById('span_current_year_id') as HTMLSpanElement;
spanTagWithCurrentYear.innerText = new Date().getFullYear().toString();
var table = document.getElementById('table_game') as HTMLDivElement;
var arrayAllCoordinatesOfShips = new Array<Array<string>>;
var arrayOfShips = new Array<Ship>;
let resetButton = document.getElementById('reset_button') as HTMLButtonElement;

var gameBoard : HTMLSpanElement[][] = new Array<Array<HTMLSpanElement>>;

let explosionSound = document.getElementById('explosion') as HTMLAudioElement;
let waterSplash = document.getElementById('waterSplash') as HTMLAudioElement;

enum PositionType {
    HORIZONTAL = "Horizontal",
    VERTICAL = "Vertical",
}

class Ship {
    constructor(public hitPoints: number, public positionType : PositionType, public coordinates : Array<String>) {}
}

// Player's board
placeShipsOfEnemy();
createBoard();
displayBoard();

resetButton.addEventListener('click', function() {
    arrayOfShips.length = 0;
    arrayAllCoordinatesOfShips.length = 0;
    table.innerHTML = '';
    gameBoard.length = 0;

    placeShipsOfEnemy();
    createBoard();
    displayBoard();
});

function placeShipsOfEnemy() : void {
    const generateRandomNumber = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    
    var randomPositionForDestroyer : number = generateRandomNumber(1, 2);
    var destroyer = createEnemyShip(5, 
        randomPositionForDestroyer == 1 ? PositionType.HORIZONTAL : PositionType.VERTICAL);

    var randomPositionForBattleShip : number = generateRandomNumber(1, 2);
    var battleShip = createEnemyShip(4, randomPositionForBattleShip == 1 ? PositionType.HORIZONTAL : PositionType.VERTICAL);

    var randomPositionForCruiser : number = generateRandomNumber(1, 2);
    var cruiser = createEnemyShip(3, randomPositionForCruiser == 1 ? PositionType.HORIZONTAL : PositionType.VERTICAL);

    var randomPositionSubmarine : number = generateRandomNumber(1, 2);
    var submarine = createEnemyShip(3, randomPositionSubmarine == 1 ? PositionType.HORIZONTAL : PositionType.VERTICAL);

    var randomPositionPatrolBoat : number = generateRandomNumber(1, 2);
    var patrolBoat = createEnemyShip(2, randomPositionPatrolBoat == 1 ? PositionType.HORIZONTAL : PositionType.VERTICAL);

    arrayOfShips.push(destroyer);
    arrayOfShips.push(battleShip);
    arrayOfShips.push(cruiser);
    arrayOfShips.push(submarine);
    arrayOfShips.push(patrolBoat);
}

function createEnemyShip(hitPoints : number, positionType : PositionType) : Ship {
    const generateRandomNumber = (min: number, max: number) => {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    var arrayOfCoordinates : string[] = new Array();   
    var ship = new Ship(hitPoints, positionType, new Array());
    var foundDuplicate : boolean = false;
    var flattennedArrayOfCoordinatesAllShips = arrayAllCoordinatesOfShips.reduce((accumulator, value) => accumulator.concat(value), []);

    if (PositionType.HORIZONTAL === ship.positionType) {
        var charCode : number = generateRandomNumber(1, 10 - hitPoints - 1);
        var letter : string = String.fromCharCode(65 + charCode);
        var numberOnYAxis : number = generateRandomNumber(1, 10);
        do {
            charCode++;
            letter = String.fromCharCode(65 + charCode);
            foundDuplicate = flattennedArrayOfCoordinatesAllShips.indexOf(letter + numberOnYAxis) >= 0;
            if (!foundDuplicate) {
                ship.coordinates.push(letter + numberOnYAxis);
                arrayOfCoordinates.push(letter + numberOnYAxis);
                hitPoints--;
            }
        } while (hitPoints !== 0 && !foundDuplicate);
    } else if (PositionType.VERTICAL === ship.positionType) {
        var charCode : number = generateRandomNumber(1, 10 - hitPoints - 1);
        var letter : string = String.fromCharCode(65 + charCode);
        var numberOnYAxis : number = generateRandomNumber(1, 10 - hitPoints);
        do {
            numberOnYAxis++;
            letter = String.fromCharCode(65 + charCode);
            foundDuplicate = flattennedArrayOfCoordinatesAllShips.indexOf(letter + numberOnYAxis) >= 0;
            if (!foundDuplicate) {
                ship.coordinates.push(letter + numberOnYAxis);
                arrayOfCoordinates.push(letter + numberOnYAxis);
                hitPoints--;
            }
        } while (hitPoints !== 0 && !foundDuplicate);
    }
    if (!foundDuplicate) {
        arrayAllCoordinatesOfShips.push(arrayOfCoordinates);
    }
    return !foundDuplicate ? ship : createEnemyShip(hitPoints, positionType);
}

function createBoard() : void {
    var flattennedArrayOfCoordinatesAllShips = arrayAllCoordinatesOfShips.reduce((accumulator, value) => accumulator.concat(value), []);
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
                var temp : string = String.fromCharCode(65 + (j - 1)) + i.toString(); 
                mySpan.innerText = temp;
                mySpan.title = temp;
                mySpan.addEventListener("click", function() {
                    var result = flattennedArrayOfCoordinatesAllShips.indexOf(mySpan.title);
                    if (result >= 0) {
                        mySpan.innerText = 'O';
                        mySpan.style.backgroundColor = '#FF0808';
                        explosionSound.play();
                    } else {
                        mySpan.innerText = 'X';
                        waterSplash.play();
                    }
                });
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