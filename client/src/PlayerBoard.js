import React, { Component } from "react";
import Cell from "./Cell";
import ShipSelect from "./ShipSelect";

let boardArray = [
  [1, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null],
  [0, 0, 0, null, null, null, null, null, null, null, null, null]
];

class PlayerBoard extends Component {
  state = {
    board: boardArray,
    vertical: false,
    ship: 5
  };

  setBoard(x, y) {
    let { board } = this.state;
    board[x][y] = 0;
    this.setState({ board });
    this.winCheck();
  }

  componentWillMount() {
    document.addEventListener("keypress", this.switchDirection.bind(this));
  }

  componentWillUnmount() {
    document.removeEventListener("keypress", this.switchDirection.bind(this));
  }

  shipSelect(e, data) {
    this.setState({ ship: data });
    console.log(data);
  }

  switchDirection(e) {
    if (e.keyCode === 32) {
      this.setState({ vertical: !this.state.vertical });
      console.log(this.state.vertical);
    }
  }

  boardModifier(coords) {
    let { ship, board } = this.state;
    let start;
    this.state.vertical ? (start = coords[1]) : (start = coords[0]);
    if (start + ship <= 12)
      for (var i = start; i < start + ship; i++) {
        this.state.vertical
          ? (board[i][coords[0]] = 1)
          : (board[coords[0]][i] = 1);
      }

    console.table(board);

    this.setState({ board });
  }

  winCheck() {
    let count = 0;
    this.state.board.forEach(arr => {
      arr.forEach(cell => {
        if (cell) count++;
      });
    });
    if (!count) console.log("PC WINS W00T");
  }
  render() {
    let { board } = this.state;

    return (
      <div tabIndex="0" onKeyPress={this.switchDirection.bind(this)}>
        <ShipSelect
          vertical={this.state.vertical}
          shipSelect={this.shipSelect.bind(this)}
        />
        <div className="board-container">
          {board.map((arr, y) => {
            return arr.map((cell, x) => {
              return (
                <Cell
                  cellState={cell}
                  coords={[x, y]}
                  setBoard={this.setBoard.bind(this)}
                  boardModifier={this.boardModifier.bind(this)}
                />
              );
            });
          })}
        </div>
      </div>
    );
  }
}

export default PlayerBoard;
