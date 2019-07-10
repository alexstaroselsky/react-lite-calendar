import React, { Component } from "react";
import { render } from "react-dom";

import LiteCalendar from "../../src";

class Demo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date()
    };
  }

  handleChange = e => this.setState({ date: e });
  handleOpened = () => console.log("opened");
  handleClosed = () => console.log("closed");

  render() {
    return (
      <div>
        <LiteCalendar
          onOpened={this.handleOpened}
          onClosed={this.handleClosed}
          onChange={this.handleChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
