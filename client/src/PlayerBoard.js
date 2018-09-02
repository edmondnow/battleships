import React, { Component } from "react";
import unique from "lodash.uniqueid";
import Cell from "./Cell";
import axios from "axios";
import ShipSelect from "./ShipSelect";
import boardArray from "./boardArray";

class PlayerBoard extends Component {
  state = {
    board: boardArray,
    vertical: false,
    ships: [5, 4, 3, 3, 2],
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

  componentDidMount() {
    //hard coded server here (wouldn't do this normally)
    (async () => {
      let {
        data: { coords }
      } = await axios.get("http://localhost:5000/shoot");
      console.log(coords);
      this.shoot(coords);
    })();
  }

  shoot(coords) {
    if (!this.props.turn) {
      let { board } = this.state;
      if (board[coords[1]][coords[0]]) {
        board[coords[1]][coords[0]] = 0;
        this.setState({ board });
        this.winCheck();
      }
    }
    this.props.setTurn();
  }

  shipSelect(e, data) {
    this.setState({ ship: data });
  }

  switchDirection(e) {
    if (e.keyCode === 32) {
      this.setState({ vertical: !this.state.vertical });
    }
  }

  boardModifier(coords) {
    let { ship, board, ships } = this.state;
    let start; //where to start
    let check = this.state.vertical ? (start = coords[1]) : (start = coords[0]);
    if (start + ship <= 12)
      for (let j = start; j < start + ship; j++) {
        // eslint-disable-next-line
        this.state.vertical
          ? board[j][coords[0]] === 1
            ? (check = false)
            : true
          : board[coords[1]][j] === 1
            ? (check = false)
            : true;
      }

    if (start + ship <= 12 && check) {
      for (let i = start; i < start + ship; i++) {
        this.state.vertical
          ? (board[i][coords[0]] = 1)
          : (board[coords[1]][i] = 1);
      }
      ships = ships.filter(shipCheck => {
        if (shipCheck !== ship) {
          return true;
        } else {
          ship = null;
          return false;
        }
      });
      ship = ships[0];
      if (ships.length === 0) this.props.setStart();
      this.setState({ board, ships, ship });
    }
  }

  winCheck() {
    let count = 0;
    this.state.board.forEach(arr => {
      arr.forEach(cell => {
        if (cell) count++;
      });
    });
    if (!count) alert("PC WINS W00T");
  }
  render() {
    let { board } = this.state;

    return (
      <div
        className="player-container"
        tabIndex="0"
        onKeyPress={this.switchDirection.bind(this)}
      >
        <div
          style={
            this.state.ships.length === 0
              ? { display: "none" }
              : { display: "initial" }
          }
        >
          <ShipSelect
            vertical={this.state.vertical}
            shipSelect={this.shipSelect.bind(this)}
            ships={this.state.ships}
          />
        </div>
        <div className="board-container">
          {board.map((arr, y) => {
            return arr.map((cell, x) => {
              return (
                <Cell
                  key={unique()}
                  cellState={cell}
                  coords={[x, y]}
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
