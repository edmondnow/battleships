import React, { Component } from "react";

class ShipSelect extends Component {
  state = { ships: [5, 4, 3, 2] };

  shipHelper() {
    let arr = this.state.ships.map(cell => {
      let arr2 = [];
      for (let i = 0; i < cell; i++) {
        arr2.push(<div className="cell-select" />);
      }
      return arr2;
    });
    return arr;
  }

  render() {
    let arr = this.shipHelper();

    return (
      <div
        className="ships-container"
        style={
          this.props.vertical
            ? { flexDirection: "row" }
            : { flexDirection: "column" }
        }
      >
        {arr.map(ship => {
          return (
            <div
              className="ship-container"
              onClick={e => this.props.shipSelect(e, ship.length)}
              id={ship.length}
            >
              {ship.map(cell => cell)}
            </div>
          );
        })}
      </div>
    );
  }
}

export default ShipSelect;
