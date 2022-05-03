import react from "react";

class ProfileArea extends react.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <react.Fragment>
        <div className="bg-glass d-flex justify-content-center align-items-center w-100 flex-column">
          <div
            id="avatar"
            className="m-4 d-flex justify-content-center align-items-center"
          >
            <h1>{this.props.username[0]}</h1>
          </div>
          <p>{this.props.username}</p>
          <div className="d-flex justify-contetn-center align-items-center flex-row">
            <a
              className="btn btn-secondary m-1"
              href={this.props.link}
              target="_blank"
            >
              open link
            </a>
            <button
              value={this.props.link}
              onClick={(e) => this.props.copyHandler(e)}
              className="btn btn-secondary m-1"
            >
              copy link
            </button>
          </div>
          <button
            className="btn btn-danger mb-4"
            onClick={this.props.logoutHandler}
          >
            logout
          </button>
        </div>
      </react.Fragment>
    );
  }
}

export default ProfileArea;
