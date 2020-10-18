import { Component, render, createElement } from "./toy-react.js";

class MyComponent extends Component {
  render() {
    return (
      <div id="a" className="test">
        <p>aaa</p>
        <p>sss</p>
        <p>ddd</p>
        {this.children}
      </div>
    );
  }
}

render(
  <MyComponent>
    <h1>h1</h1>
    <h2>h2</h2>
  </MyComponent>,
  document.body
);
