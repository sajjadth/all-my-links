import react from "react";
import Link from "./link";

class Links extends react.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.links.length);
  }
  render() {
    return (
      <react.Fragment>
        <div
          id="dashboard-right-bottom"
          className="mw-100 bg-glass p-md-4 p-2 d-flex flex-column justify-content-center align-items-center input-box"
        >
          {this.props.links ? (
            this.props.links.map((link, index) => {
              return (
                <Link
                  link={link}
                  index={index}
                  onChangeHandler={this.props.onChangeHandler}
                  linkDeleteHandler={this.props.linkDeleteHandler}
                  linkEditHandler={this.props.linkEditHandler}
                  key={index}
                />
              );
            })
          ) : (
            <h5>Just click the button below to add the link</h5>
          )}
          <button
            className="w-100 btn btn-primary m-1"
            type="button"
            onClick={this.props.linkAddHandler}
          >
            Add Link
          </button>
        </div>
      </react.Fragment>
    );
  }
}

export default Links;
