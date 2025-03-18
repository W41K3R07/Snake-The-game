var canvas = document.getElementById("plansza");
var context = canvas.getContext("2d");
var klatka; //ID funkcji do setInterval
var grid; //Rozmiar siatki
var snake; //Wąż
var apple; //Jabłko
var score; //Wynik
var counter; //Licznik klatek
var gameover; //TRUE gdy koniec gry.
var iapple; //Licznik zjedzonych jabłek
var snakeColor = "green"; // Domyślny kolor węża

function siatka() {
  context.lineWidth = 1;
  context.strokeStyle = "#111111";
  context.beginPath();
  for (let x = 16; x < 400; x += 16) {
    context.moveTo(x, 0);
    context.lineTo(x, 400);
  }
  for (let y = 16; y < 400; y += 16) {
    context.moveTo(0, y);
    context.lineTo(400, y);
  }
  context.stroke();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function init() {
  gameover = 0;
  document.getElementById("wynik").innerHTML = "Wynik: 0";
  document.getElementById("start").value = "RESTART";
  grid = 16; //Rozmiar siatki w pikselach
  snake = {
    x: 160, //Pozycja x
    y: 160, //Pozycja y
    dx: grid, //Kierunek wzdłuż osi X
    dy: 0, //Kierunek wzdłuż osi Y
    cells: [
      { x: 160, y: 160 },
      { x: 144, y: 160 },
    ], //Ciało węża pozycja startowa
    maxCells: 2, //Bieżąca długość węża
  };
  apple = {
    rarity: 0,
    x: 240, //Położenie początkowe
    y: 160, //Położenie początkowe
  };
  score = 0; //Bieżący wynik gry
  counter = 0; //Licznik kroków gry, przyda nam się później
  iapple = 0;

  console.log("Game started!");
}

function loop() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  siatka();
  counter++;

  snake.x += snake.dx;
  snake.y += snake.dy;

  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  snake.cells.unshift({ x: snake.x, y: snake.y });

  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  if (counter === 51) {
    apple.rarity = 0;
  }

  if (apple.rarity === 1) {
    context.fillStyle = "yellow";
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  } else {
    context.fillStyle = "red";
    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);
  }

  context.fillStyle = snakeColor; // Używamy zmiennej snakeColor
  snake.cells.forEach(function (cell, index) {
    context.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    if (cell.x === apple.x && cell.y === apple.y) {
      snake.maxCells++;
      if (apple.rarity === 1) {
        score += 10;
        apple.rarity = 0;
      } else {
        score++;
        iapple++;
      }
      if (iapple === 5) {
        apple.rarity = 1;
        iapple = 0;
      }

      counter = 0;
      apple.x = getRandomInt(0, 25) * grid;
      apple.y = getRandomInt(0, 25) * grid;
    }

    for (var i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        gameover = 1;
        document.getElementById("wynik").innerHTML =
          " GAME OVER! Wynik: " + score;
        clearInterval(klatka);
      }
    }
  });

  if (score >= 10) {
    let tak = document.getElementById("uno");
    tak.className = "jeden";
  }

  if (score >= 50) {
    let nie = document.getElementById("dos");
    nie.className = "dwa";
  }

  if (score >= 150) {
    let divka = document.getElementById("tres");
    divka.className = "trzy";
  }

  if (!gameover) {
    document.getElementById("wynik").innerHTML = "Wynik: " + score;
  }
}

function restart_game() {
  let cos = document.getElementById("uno");
  cos.className="uno";
  let ktos = document.getElementById("dos");
  ktos.className="dos";
  let gdzies = document.getElementById("tres");
  gdzies.className="tres"
  init();
  clearInterval(klatka);
  klatka = setInterval(loop, 100);
  
}

siatka();

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowLeft" && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  } else if (e.key === "ArrowUp" && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  } else if (e.key === "ArrowRight" && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  } else if (e.key === "ArrowDown" && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// Functions to change snake color
function change_colorB() {
  snakeColor = "blue";
}

function change_colorG() {
  snakeColor = "green";
}

function change_colorP() {
  snakeColor = "purple";
}

function change_colorA() {
  snakeColor = "aqua";
}