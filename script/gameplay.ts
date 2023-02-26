var spanTagWithCurrentYear = document.getElementById('span_current_year_id') as HTMLSpanElement;
spanTagWithCurrentYear.innerText = new Date().getFullYear().toString();
var table = document.getElementById('table_game') as HTMLDivElement;
var arrayAllCoordinatesOfShips = new Array<Array<string>>;
var arrayOfShips = new Array<Ship>;

var gameBoard : HTMLSpanElement[][] = new Array<Array<HTMLSpanElement>>;
var scoreHeading = document.getElementById('score') as HTMLHeadingElement;
var actualScore : number = 0;
var actualNumberOfSunkenShips : number = 0;
var shotsFired : number = 0;
var sunkenShipsHeading = document.getElementById('sunken_ships') as HTMLHeadingElement;
var shotsFiredHeading = document.getElementById('shots_fired') as HTMLHeadingElement;

let explosionSound = document.getElementById('explosion') as HTMLAudioElement;
let waterSplash = document.getElementById('waterSplash') as HTMLAudioElement;

const NUMBER_OF_RANKS_AND_FILES : number = 10;
const FIRST_CHARCODE_FOR_LETTERS : number = 65;
const BACKGROUND_COLOR_SQUARES_OUT_OF_RANGE : string = '#333';
const SYMBOL_SHIP_HIT = 'O';
const SYMBOL_MISS = 'X';

enum PositionType {
    HORIZONTAL = "Horizontal",
    VERTICAL = "Vertical",
}

class Ship {
    constructor(public hitPoints: number, public positionType : PositionType, public coordinates : Array<String>, public isSunken : boolean) {}
}

// Player's board
placeShipsOfEnemy();
createBoard();
displayBoard();

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
    var ship = new Ship(hitPoints, positionType, new Array(), false);
    var foundDuplicate : boolean = false;
    var flattennedArrayOfCoordinatesAllShips = arrayAllCoordinatesOfShips.reduce((accumulator, value) => accumulator.concat(value), []);
    var remainingHitPointsForDoWhile = hitPoints;
    if (PositionType.HORIZONTAL === ship.positionType) {
        var charCode : number = generateRandomNumber(1, NUMBER_OF_RANKS_AND_FILES - hitPoints - 1);
        var letter : string = String.fromCharCode(FIRST_CHARCODE_FOR_LETTERS + charCode);
        var numberOnYAxis : number = generateRandomNumber(1, NUMBER_OF_RANKS_AND_FILES);
        do {
            charCode++;
            letter = String.fromCharCode(FIRST_CHARCODE_FOR_LETTERS + charCode);
            foundDuplicate = flattennedArrayOfCoordinatesAllShips.indexOf(letter + numberOnYAxis) >= 0;
            if (!foundDuplicate) {
                ship.coordinates.push(letter + numberOnYAxis);
                arrayOfCoordinates.push(letter + numberOnYAxis);
                remainingHitPointsForDoWhile--;
            }
        } while (remainingHitPointsForDoWhile !== 0 && !foundDuplicate);
    } else if (PositionType.VERTICAL === ship.positionType) {
        var charCode : number = generateRandomNumber(1, NUMBER_OF_RANKS_AND_FILES - hitPoints - 1);
        var letter : string = String.fromCharCode(FIRST_CHARCODE_FOR_LETTERS + charCode);
        var numberOnYAxis : number = generateRandomNumber(1, NUMBER_OF_RANKS_AND_FILES - hitPoints);
        do {
            numberOnYAxis++;
            letter = String.fromCharCode(FIRST_CHARCODE_FOR_LETTERS + charCode);
            foundDuplicate = flattennedArrayOfCoordinatesAllShips.indexOf(letter + numberOnYAxis) >= 0;
            if (!foundDuplicate) {
                ship.coordinates.push(letter + numberOnYAxis);
                arrayOfCoordinates.push(letter + numberOnYAxis);
                remainingHitPointsForDoWhile--;
            }
        } while (remainingHitPointsForDoWhile !== 0 && !foundDuplicate);
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
                    mySpan.innerText = String.fromCharCode(FIRST_CHARCODE_FOR_LETTERS + (j - 1));
                    mySpan.style.backgroundColor = BACKGROUND_COLOR_SQUARES_OUT_OF_RANGE;
                }
            } else if (i !== 0 && j === 0) {
                mySpan.innerText = i.toString();
                mySpan.style.backgroundColor = BACKGROUND_COLOR_SQUARES_OUT_OF_RANGE;
            } else if (i >= 1 && j >= 1) {
                var temp : string = String.fromCharCode(FIRST_CHARCODE_FOR_LETTERS + (j - 1)) + i.toString(); 
                mySpan.innerText = temp;
                mySpan.title = temp;
                mySpan.addEventListener("click", function() {
                    var result = flattennedArrayOfCoordinatesAllShips.indexOf(mySpan.title);
                    if (result >= 0 && mySpan.innerText !== SYMBOL_SHIP_HIT) {
                        updateNumberOfSunkenShips(mySpan.innerText);
                        mySpan.innerText = SYMBOL_SHIP_HIT;
                        mySpan.style.backgroundColor = '#FF0808';
                        explosionSound.play();
                        actualScore++;
                        shotsFired++;
                        scoreHeading.innerText = 'Your score: ' + actualScore;
                        shotsFiredHeading.innerText = 'Shots fired: ' + shotsFired;
                    } else if (mySpan.innerText !== SYMBOL_MISS && mySpan.innerText !== SYMBOL_SHIP_HIT && result === -1) {
                        mySpan.innerText = SYMBOL_MISS;
                        mySpan.style.backgroundColor = '#339';
                        waterSplash.play();
                        shotsFired++;
                        shotsFiredHeading.innerText = 'Shots fired: ' + shotsFired;
                    }

                    actualNumberOfSunkenShips = arrayOfShips.map(s => s.isSunken).filter(condition => condition).length;
                    sunkenShipsHeading.innerText = 'Sunken ships: ' + actualNumberOfSunkenShips + "/5";
                });
            }
            rowOfSpans.push(mySpan);
        }
        gameBoard.push(rowOfSpans);
    }
}

function updateNumberOfSunkenShips(input : string) : void {
    var numberOfHitsTaken : number = 0;
    arrayOfShips.forEach(function(ship) {
        for (var i = 0; i < ship.coordinates.length; i++) {
            if (ship.coordinates[i] === input) {
                ship.coordinates[i] = SYMBOL_SHIP_HIT;
            }
        }
        numberOfHitsTaken = ship.coordinates.filter(value => value === SYMBOL_SHIP_HIT).length;
        if (ship.hitPoints === numberOfHitsTaken) {
            ship.isSunken = true;
        }
    });
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