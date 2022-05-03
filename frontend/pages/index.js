import React from "react";
import Loading from "../components/loading";
import router from "next/router";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
  }
  componentDidMount() {
    if (
      localStorage.getItem("token") !== null ||
      sessionStorage.getItem("token") !== null
    ) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }
  render() {
    return (
      <React.Fragment>
        {this.state.isLoading ? <Loading /> : null}
      </React.Fragment>
    );
  }
}

export default Home;
