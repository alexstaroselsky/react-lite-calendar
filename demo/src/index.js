import React, { Component } from "react";
import { render } from "react-dom";

import ReactSvelteDatepicker from "../../src";

class Demo extends Component {
  render() {
    return (
      <div>
        <h1>react-svelte-calendar Demo</h1>
        <ReactSvelteDatepicker
          onOpened={() => console.log("onOpened")}
          onClosed={() => console.log("onClosed")}
          onChange={e => console.log(e)}
        />
      </div>
    );
  }
}

render(<Demo />, document.querySelector("#demo"));
