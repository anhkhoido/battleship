var spanTagWithCurrentYear = document.getElementById('span_current_year_id') as HTMLSpanElement;
spanTagWithCurrentYear.innerText = new Date().getFullYear().toString();

class Ship {
    constructor(public hitPoints: number, public xAxis : number, public yAxis : number) {}
}

var myFleet : Ship[] = createFleet();
var enemyFleet : Ship[] = createFleet();

function createFleet() : Ship[] {
    var carrier = new Ship(5, 0, 0);
    var battleship = new Ship(4, 0, 0);
    var cruiser = new Ship(3, 0, 0);
    var submarine = new Ship(3, 0, 0);
    var destroyer = new Ship(2, 0, 0);
    return new Array(carrier, battleship, cruiser, submarine, destroyer);
}