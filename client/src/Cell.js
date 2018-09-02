import React, { Component } from "react";

class Cell extends Component {
  state = {
    cellState: this.props.cellState,
    coords: this.props.coords
  };

  clickHelper() {
    //refactor this to take into view difference in PC/HUMAN boards
    //if PC than no need to set board modifier
    //if human, no need to have state at all I thinK, can be functional comp, no need to set cellState
    let { coords } = this.state;
    /* this code is for the PC Board
    if (this.state.cellState) {
      this.setState({ cellState: 0 });
      this.props.setBoard(coords[0], coords[1]);
    }*/
    this.props.boardModifier([coords[0], coords[1]]);
  }

  render() {
    let { cellState } = this.props;
    return (
      <div onClick={() => this.clickHelper()} className="cell">
        {cellState ? (
          <div className="hit" />
        ) : cellState !== null ? (
          <div className="unhit" />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Cell;
