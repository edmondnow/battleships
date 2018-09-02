import React, { Component } from "react";
import axios from "axios";
import unique from "lodash.uniqueid";
import Cell from "./Cell";
//import boardArray from "./boardArray";

class PlayerBoard extends Component {
  state = {
    board: [],
    vertical: false,
    ships: [5, 4, 3, 3, 2],
    ship: 5
  };

  boardModifier(coords) {
    this.props.setTurn();
    if (this.props.turn) {
      let { board } = this.state;
      if (board[coords[1]][coords[0]]) {
        board[coords[1]][coords[0]] = 0;
        this.setState({ board });
        this.winCheck();
      }
    }
  }

  winCheck() {
    let count = 0;
    this.state.board.forEach(arr => {
      arr.forEach(cell => {
        if (cell) count++;
      });
    });
    if (!count) alert("HUMAN WINS W00T");
  }

  componentWillMount() {
    //hard coded server here (wouldn't do this normally)
    (async () => {
      let {
        data: { board }
      } = await axios.get("http://localhost:5000/board");
      this.setState({ board });
    })();
  }

  render() {
    return (
      <div className="pc-container" tabIndex="0">
        <div className="board-container">
          {this.state.board.map((arr, y) => {
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
