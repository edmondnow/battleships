import React, { Component } from "react";
import PlayerBoard from "./PlayerBoard";
import PCBoard from "./PCBoard";

class App extends Component {
  state = { start: false, human: false };
  render() {
    return (
      <div className="app-container">
        <div className="game-board">
          {this.state.start
            ? this.state.human
              ? "Your turn"
              : "PC's turn"
            : "Set your board"}
        </div>
        <div className="all-boards-container">
          <PlayerBoard
            setStart={() => this.setState({ start: true, human: true })}
            turn={this.state.human}
            setTurn={() => {
              this.setState({ human: true });
            }}
          />
          <PCBoard
            setTurn={() => this.setState({ human: false })}
            turn={this.state.human}
          />
        </div>
      </div>
    );
  }
}

export default App;
