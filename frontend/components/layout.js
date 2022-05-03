import react from "react";

class Layout extends react.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <react.Fragment>
        <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center w-100 vh-100">
          {this.props.children}
        </div>
      </react.Fragment>
    );
  }
}

export default Layout;
