import react from "react";

class DisplayInfo extends react.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <react.Fragment>
        <div
          id="dashboard-right-top"
          className="h-100 d-flex flex-column bg-glass p-md-4 p-2 justify-content-center align-items-center input-box"
        >
          <div className="w-100 form-group m-1">
            <label className="label" htmlFor="displayName">
              display name :
            </label>
            <input
              id="displayName"
              className="form-control"
              disabled
              onChange={(e) => this.props.onChangeHandler(e, "displayName")}
              value={this.props.displayName}
            />
            <small className="form-text text-muted">
              displayed with links.
            </small>
          </div>
          <div className="form-group m-1 w-100">
            <label className="label" htmlFor="discription">
              discription :
            </label>
            <textarea
              onChange={(e) => this.props.onChangeHandler(e, "discription")}
              maxLength="200"
              disabled
              className="form-control"
              id="discription"
              rows="3"
              value={this.props.discription}
            ></textarea>
            <small className="form-text text-muted">
              Maximum 200 characters.
            </small>
          </div>
          <button
            type="button"
            id="edit"
            className="btn btn-primary w-100 m-1"
            onClick={this.props.displayInfoChangeHandler}
          >
            edit
          </button>
        </div>
      </react.Fragment>
    );
  }
}

export default DisplayInfo;
