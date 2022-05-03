import react from "react";

class Custom404 extends react.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div
        id="not-found-box"
        className="d-flex align-items-center justify-content-center"
      >
        <h1 id="not-found-code">404</h1>
        <span id="hr"></span>
        <h2 id="not-found-text">This page could not be found</h2>
      </div>
    );
  }
}

export default Custom404;
