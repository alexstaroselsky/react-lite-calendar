# react-svelte-calendar

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]

React calendar component:

## Getting started

### Installation

```
npm install react-svelte-calendar
```

### Installation

Usage:

```js
import React, { Component } from "react";
import SvelteCalendar from "react-svelte-calendar";

class App extends Component {
  state = {
    date: new Date()
  };

  handleChange = value => this.setState({ date: value });
  handleOpened = () => console.log("opened");
  handleClosed = () => console.log("closed");

  render() {
    return (
      <div>
        <SvelteCalendar
          onOpened={this.handleOpened}
          onClosed={this.handleClosed}
          onChange={this.handleChange}
          value={this.state.date}
        />
      </div>
    );
  }
}

export default App;
```

## User guide

#### Props

|Prop name|Description|Example values|
|----|----|----|
|start|The beginning of a period that shall be selectable by default when no value is given. Defaults to `new Date(1987, 9, 29)`.|`new Date(2017, 5, 1)`|
|end|The ending of a period that shall be selectable by default when no value is given. Defaults to `new Date(2020, 9, 29)`.|`new Date(2020, 5, 1)`|
|onChange|Function called when the user clicks an item (day on month view, month on year view and so on) on the most detailed view available.|`(value) => console.log('New date is: ', value)`|
|onOpened|Function called when calendar is opened.|`(value) => console.log('onOpened')`|
|onClosed|Function called when calendar is closed.|`(value) => console.log('onClosed')`|
|value|Defines the value of the calendar. Defaults to `new Date()`.|Date: `new Date()`|
|format|[dayjs date format](https://github.com/iamkun/dayjs/blob/dev/docs/en/API-reference.md#format-formatstringwithtokens-string) string for default trigger button. Defaults to `"dddd, MMMM D, YYYY"`|`"dddd, MMMM D, YYYY"`|

## License

The MIT License.

## Author

<table>
  <tr>
    <td>
      <img src="https://github.com/alexstaroselsky.png?s=100" width="100">
    </td>
    <td>
      Alexander Staroselsky
    </td>
  </tr>
</table>

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
