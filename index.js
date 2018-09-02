const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");
let board = require("./boardArray.js");

const app = express();

app.use(bodyParser.json());
app.use(cors());

function genRand(max) {
  return Math.floor(Math.random() * max);
}

function setBoard(ships, board) {
  if (ships.length === 0) return board;
  let x = genRand(11);
  let y = genRand(11);
  let ship = ships[0];
  let vertical = genRand(1);
  let check = vertical ? (start = y) : (start = x);
  if (start + ship <= 12)
    for (let j = start; j < start + ship; j++) {
      // eslint-disable-next-line
      vertical
        ? board[j][x] === 1
          ? (check = false)
          : true
        : board[y][j] === 1
          ? (check = false)
          : true;
    }

  if (start + ship <= 12 && check) {
    for (let i = start; i < start + ship; i++) {
      vertical ? (board[i][x] = 1) : (board[y][i] = 1);
    }
    ships = ships.filter(shipCheck => {
      if (shipCheck !== ship) {
        return true;
      } else {
        ship = null;
        return false;
      }
    });
  }

  setBoard(ships, board);
}

app.get("/board", (req, res) => {
  let ships = [5, 4, 3, 3, 2];
  board = board.map(el => el.map(el => (el = null)));
  setBoard(ships, board);

  res.send({ board });
});

app.get("/shoot", (req, res) => {
  let coords = [genRand(11), genRand(11)];
  res.send({ coords });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT);

console.log("Connected to port 5000.");
