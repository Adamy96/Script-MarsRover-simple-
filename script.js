// Iteration 1 | The Rover Object (OK)
// Iteration 2 | Turning the Rover (OK)
// Iteration 3 | Moving the Rover (OK)
// Iteration 4 | Commands (OK)
// Iteration 5 | Tracking (OK)
// Bonus 1 | Enforce Boundaries (OK)
// Bonus 2 | Move Backwards (OK)
// Bonus 3 | Validate Inputs (OK)
// Bonus 4 | Obstacles fixed (OK)
// Bonus 4 | Obstacles bots

// VARIABLES
let directions = ['W', 'N', 'E', 'S'];
let values = [-1, -1, 1, 1]; // x y x y
let gridArr = new Array();
let rovers = []; // Bots

let rover = {
  name: 'myRover',
  direction: 'N',
  x: 0,
  y: 0,
  travelLog: []
};

// FUNÇÕES DE INICIALIZAÇÃO (OBRIGATÓRIO)
function createGrid(x, y) {
  for (let row = 0; row < x; row++) {
    gridArr.push([]);
    for (let column = 0; column < y; column++) {
      gridArr[row][column] = 'o';
    }
  }
  gridArr[rover.x][rover.y] = 'r';
}

function createRovers(num) {
  let roversIncluded = 0;
  while (roversIncluded !== num) {
    let x = Math.floor(Math.random() * Math.floor(gridArr.length));
    let y = Math.floor(Math.random() * Math.floor(gridArr[0].length));
    if (gridArr[x][y] === 'o' && x + y !== 0) { // Garantindo que os erros não serão sobrepostos e que não pegarão a posição [0,0]
      gridArr[x][y] = 'r';
      roversIncluded += 1;

      rovers.push({
        name: 'R' + roversIncluded,
        direction: generateRandomDirection(),
        x: x,
        y: y,
        travelLog: []
      });
    }
  }
}

function createObstacles(num) {
  let obstaclesIncluded = 0;
  while (obstaclesIncluded !== num) {
    let x = Math.floor(Math.random() * Math.floor(gridArr.length));
    let y = Math.floor(Math.random() * Math.floor(gridArr[0].length));
    if (gridArr[x][y] === 'o' && x + y !== 0) { // Garantindo que os erros não serão sobrepostos e que não pegarão a posição [0,0]
      gridArr[x][y] = 'x';
      obstaclesIncluded += 1;
    }
  }
}

// FUNÇÕES DE COMANDOS
function turnLeft(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = 'W';
      break;
    case 'E':
      rover.direction = 'N';
      break;
    case 'S':
      rover.direction = 'E';
      break;
    case 'W':
      rover.direction = 'S';
      break;
  }
  console.log(`${rover.name} is now facing: ${rover.direction}`);
}

function turnRight(rover) {
  switch (rover.direction) {
    case 'N':
      rover.direction = 'E';
      break;
    case 'E':
      rover.direction = 'S';
      break;
    case 'S':
      rover.direction = 'W';
      break;
    case 'W':
      rover.direction = 'N';
      break;
  }
  console.log(`${rover.name} is now facing: ${rover.direction}`);
}

function moveForward(rover) {
  switch (rover.direction) {
    case 'N':
      if (checkLimit(rover.y, -1, 0) && checkPath(rover.x, rover.y - 1)) updateRover(rover, 'y', -1);
      break;
    case 'E':
      if (checkLimit(rover.x, 1, gridArr.length) && checkPath(rover.x + 1, rover.y)) updateRover(rover, 'x', 1);
      break;
    case 'S':
      if (checkLimit(rover.y, 1, gridArr[0].length) && checkPath(rover.x, rover.y + 1)) updateRover(rover, 'y', 1);
      break;
    case 'W':
      if (checkLimit(rover.x, -1, 0) && checkPath(rover.x - 1, rover.y)) updateRover(rover, 'x', -1);
      break;
  }
  console.log(`Posição atual do ${rover.name}: [${rover.x}, ${rover.y}]`);
}

function moveBackwards(rover) {
  switch (rover.direction) {
    case 'N':
      if (checkLimit(rover.y, 1, gridArr[0].length) && checkPath(rover.x, rover.y + 1)) updateRover(rover, 'y', 1);
      break;
    case 'E':
      if (checkLimit(rover.x, -1, 0) && checkPath(rover.x - 1, rover.y)) updateRover(rover, 'x', -1);
      break;
    case 'S':
      if (checkLimit(rover.y, -1, 0) && checkPath(rover.x, rover.y - 1)) updateRover(rover, 'y', -1);
      break;
    case 'W':
      if (checkLimit(rover.x, 1, gridArr.length) && checkPath(rover.x + 1, rover.y)) updateRover(rover, 'x', 1);
      break;
  }
  console.log(`Posição atual do ${rover.name}: [${rover.x}, ${rover.y}]`);
}

function exeCommands(rover, str) {
  let validInputs = str.match(/[lrfb]/gi);
  for(let i = 0; i < validInputs.length; i++) {
    switch (validInputs[i]) {
      case 'l':
        turnLeft(rover);
        break;
      case 'r':
        turnRight(rover);
        break;
      case 'f':
        moveForward(rover);
        break;
      case 'b':
        moveBackwards(rover);
        break;
    }
  }
  console.log(`${rover.name} travelLog: ${rover.rover.travelLog}`);
}

// FUNÇÕES AUXILIARES
function checkLimit(currentPos, value, limit) {
  if (value === -1) {
    if (currentPos + value >= limit) {
      return true
    } else {
      console.log(`Função 'moveForward' não executada pois o rover '${rover.name}' iria sair do grid.`);
      return false
    };
  } else { // value === 1
    if (currentPos + value < limit) {
      return true
    } else {
      console.log(`Função 'moveForward' não executada pois o rover '${rover.name}' iria sair do grid.`);
      return false
    };
  }
}

function checkPath(x, y) {
  if (gridArr[x][y] === 'o') {
    return true;
  } else {
    console.log(`Função 'moveForward' não executada pois o rover '${rover.name}' encontrou um obstáculo
    nas coordenadas [${x}, ${y}].`);
    return false;
  }
}

function updateRover(rover, axis, value) {
  rover.travelLog.push([rover.x, rover.y]);
  if (axis === 'x') {
    rover.x += value;
  } else {
    rover.y += value;
  }
}

function generateRandomDirection() {
  return directions[Math.floor(Math.random() * 4)];
}
