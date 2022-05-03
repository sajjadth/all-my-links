import react from "react";
import router from "next/router";
import Loading from "../components/loading";
import axios from "axios";
import platforms from "../common/platforms";
import "pattern.css/dist/pattern.min.css";
import HEAD from "next/head";

class UserPage extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      isLoading: true,
      data: {
        displayName: "",
        discription: "",
        links: [],
      },
    };
  }
  componentDidMount() {
    setTimeout(() => {
      let username = router.router.state.query.username;
      let l = "http://127.0.0.1:5000/api/user/" + username;
      axios({
        method: "GET",
        url: l,
      }).then((res) => {
        if (res.data.success) {
          this.setState((prevState) => {
            const data = Object.assign({}, prevState.data);
            data.displayName = res.data.displayName;
            data.links = res.data.links;
            data.discription = res.data.discription;
            return { data };
          });
          this.setState({ username: username });
        } else {
          router.push("/404");
        }
        this.setState({ isLoading: false });
      });
    }, 1000);
  }
  capitalize(name) {
    const username = name.toLowerCase();
    const first = username.charAt(0);
    const firstUpper = first.toUpperCase();
    const rem = username.slice(1, name.length);
    return firstUpper + rem;
  }
  render() {
    return (
      <react.Fragment>
        <HEAD>
          <title>{this.capitalize(this.state.username)}</title>
        </HEAD>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center pattern-zigzag-md text-bg">
            <h1 className="m-4">{this.state.data.displayName}</h1>
            <p className="text">{this.state.data.discription}</p>
            <div
              id="link-box"
              className="d-flex flex-row justify-content-center align-items-center"
            >
              {this.state.data.links.map((link, index) => {
                return (
                  <a
                    key={index}
                    target="_blank"
                    href={platforms[link.platform].prefix + link.username}
                    class="d-flex justify-content-start align-items-center button m-3  text-lowercase"
                  >
                    <img src={platforms[link.platform].icon} /> /{link.username}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </react.Fragment>
    );
  }
}

export default UserPage;
