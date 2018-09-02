import React, { Component } from "react";
import unique from "lodash.uniqueid";

class ShipSelect extends Component {
  shipHelper() {
    let arr = this.props.ships.map(cell => {
      let arr2 = [];
      for (let i = 0; i < cell; i++) {
        arr2.push(<div className="cell-select" key={unique()} />);
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
            ? { flexDirection: "row", width: "150px", height: "140px" }
            : { flexDirection: "column", width: "150px", height: "140px" }
        }
      >
        Select ship. Press 'Space' to switch direction.
        {arr.map(ship => {
          return (
            <div
              className="ship-container"
              onClick={e => this.props.shipSelect(e, ship.length)}
              style={
                this.props.vertical
                  ? { flexDirection: "column" }
                  : { flexDirection: "row" }
              }
              key={unique()}
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
