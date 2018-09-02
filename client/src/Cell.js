import React, { Component } from "react";

class Cell extends Component {
  state = {
    cellState: this.props.cellState,
    coords: this.props.coords
  };

  clickHelper() {
    let { coords } = this.state;
    this.props.boardModifier([coords[0], coords[1]]);
  }

  render() {
    let { cellState } = this.props;
    return (
      <div onClick={() => this.clickHelper()} className="cell">
        {cellState ? (
          <div className="unhit" />
        ) : cellState !== null ? (
          <div className="hit" />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Cell;
