import react from "react";
import Link from "next/link";
import { toast } from "react-toastify";
import axios from "axios";
import router from "next/router";
import Loading from "../components/loading";
import HEAD from "next/head"

class Signup extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      username: "",
      password: "",
      email: "",
      showPassword: false,
      isPageLoading: true,
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
    this.onShowPasswordHandler = this.onShowPasswordHandler.bind(this);
  }
  componentDidMount() {
    if (
      localStorage.getItem("token") !== null ||
      sessionStorage.getItem("token") !== null
    ) {
      router.push("/dashboard");
    } else {
      this.setState({ isPageLoading: false });
    }
  }
  onChangeHandler(e, s) {
    const target = e.target.value;
    switch (s) {
      case "username":
        this.setState({ username: target });
        break;
      case "password":
        this.setState({ password: target });
        break;
      case "email":
        this.setState({ email: target });
        break;
    }
  }
  onSubmitHandler(e) {
    e.preventDefault();
    this.setState({ isLoading: true });
    const user = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
    };
    axios({
      method: "POST",
      url: "http://127.0.0.1:5000/api/user/signup",
      data: user,
    }).then((res) => {
      this.setState({ isLoading: false });
      if (res.data.success) {
        toast.success(res.data.message);
        setTimeout(() => {
          router.push("/login");
        }, 6000);
      } else {
        toast.error(res.data.message);
      }
    });
  }
  onShowPasswordHandler() {
    this.setState({ showPassword: !this.state.showPassword });
    const el = document.getElementById("password");
    if (el.getAttribute("type").toLowerCase() === "text") {
      el.setAttribute("type", "password");
    } else {
      el.setAttribute("type", "text");
    }
  }
  render() {
    return (
      <react.Fragment>
        <HEAD>
          <title>Sign up</title>
        </HEAD>
        {this.state.isPageLoading ? (
          <Loading />
        ) : (
          <div className="d-flex flex-column flex-lg-row align-items-center justify-content-center w-100 vh-100 pattern-diagonal-stripes-lg text-bg">
            <div className="left-side d-flex justify-content-center align-items-center w-100 my-5">
              <h1 className="header my-1">all my links</h1>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center w-100 vh-100">
              <div className="bg-glass text-center">
                <h1 className="mt-4">sign up</h1>
                <form
                  id="signup-box"
                  className="d-flex flex-column justify-content-center align-items-center"
                  onSubmit={(e) => this.onSubmitHandler(e)}
                >
                  <input
                    type="email"
                    placeholder="Email"
                    className="m-1 w-100 form-control"
                    value={this.state.email}
                    onChange={(e) => this.onChangeHandler(e, "email")}
                    required
                  />
                  <input
                    type="text"
                    placeholder="Username"
                    className="m-1 w-100 form-control"
                    value={this.state.username}
                    onChange={(e) => this.onChangeHandler(e, "username")}
                    required
                  />
                  <div className="input-group m-1">
                    <input
                      id="password"
                      type="password"
                      className="form-control"
                      placeholder="password"
                      value={this.state.password}
                      required
                      onChange={(e) => this.onChangeHandler(e, "password")}
                    />
                    <button
                      className="input-group-append btn btn-light"
                      type="button"
                      onClick={this.onShowPasswordHandler}
                    >
                      {this.state.showPassword ? (
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAlZJREFUSEuNlYF500AMhX9t4A2aTpAwQckG7QQkG8AElA1ggmaEMAHpBIQNwgZhAvFJ1tm686Xg70vinHX3pPeeZKG9BFD/mp7U/4DFQiz11ue1/LQTucikXsjnCBo5iueSr2fgK3DtFNKE2uZ8kKaa59AEIM+gn4EzsBW4ziQVWm5xc4uiUsG4bxA4KawNRGCrwtVq9Uw9qXz/D86m+DpuAE4ECPAEPACPwApkE+KfQa6CHhS+T5TGWa2abSoOIrB+m6LqGKP3mwG11hs1iNi0JVdiEZ8QjiiXOGAFvI/PhzjgjLBFE4hTuqTINh6Blq5tlWHRQ9igcgB17SaDlKSbPjD+jfMngaM6iJxis2VvoEbDAfiSzDiAFu3s15KZyCn3O4EXhd/AZrapjJuFtVkp0WgA1jflMnAT/w50H0lUFFmGd8AevOSs16CzuwqKxd+PiJOIO5QXcK3uXd5E0QU0AJyC2hDCgFbu+hOU5dAdOICxYEaoKigUGfq7LGhKMgvfxg0IP1FZVRQ1zW9cP6CjG/BOzmPAo3vusmR/mHbAq9t36SKvNIRyLczXewPrTKDsLhPWgO3wX9Eb0XDLPiggxXLG4kHQkwqvqFzSBK3ctTx8YdNqkNng+6hg03WOnOnaR3N16JKrO/BGozWN7Y32KOhO3UWyDvuag6zjTat5dgln1JvsTYoakDyoajVuzK7RIAGShl098f77BTp72Gx6iiqfYjjWw67/mux4aJoy1UAvBhmHZRzWTtNJ0fkt1hV5niQdBvMArd4HObF+Na0Hev/riv8CS7QCMAm8v+QAAAAASUVORK5CYII=" />
                      ) : (
                        <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAlZJREFUSEudlkFuE0EQRV8dAGkW7O1wAZsT2N7BCm5AzAXiGxBu4EjsY6QcIGzYxjkB9gkwBwBZLFlQqLprxt3TPVbESOPYMzX1q/7/VRMRQMMH2ZFeOsX41SJeELTLk8bb92rmAsCjCrChBOG6IJXizz5S3EyBPWlKR9bBU8CGAM4x0d07AfwnVFWbSNWQ0g3KG+ASaECm3v4OOAIb4AvIsU9L9MygBtKAXgHXIShxSEFzrPoauImgqdPs2fKwSh8Enbp9PwPbeMrBKx0D83AK79zi1tWi66bF6dmuAb5D6GCPcIliD3aFVYwydaomEGIXAsd2rPou2irMgL1X2Lb8AvgEvAJ+Idyhskp4bwTsWQOxbhctMSmACXkL/ACsqmNLJ/AVeN1j80ZglVTaqLBDGQksVdgYdSnAQWCksPSWU/v+1ah1evwUeN7bMKFIgYMKF7Y7MgBghAP0ZuI38CwXggiQr6eUBTOCA8Sg9uYBeOk+bzVdq3DV6yChKCQwg3wDGYMuKSkKQSbQDGQHakKdfA1r4L3AH4U7YJU40Fz34No9Csw7bXrT3eBCueVMj8Sm1RVihjBz2N/EfT7JFV9bq1uBiVexCRYUHlGMPjvGIDNQGzSbFeN6r8Ic9bWRaNMt3LAS4i8DWQEfesImLsq6+Siw1rifspjERXn7/suA3ibLbuJ7aY+GtXEP2BkTuyjZ2614cw1t1q7Pdn6rBVW3Sk5RZacXL2xPc6r0PFg6sa5BZUUPdVBQMKhBkaG3elrbtf895CNcNXA3yZVUT75UaObde4J/k2D1IiuGecMAAAAASUVORK5CYII=" />
                      )}
                    </button>
                  </div>
                  {this.state.isLoading ? (
                    <button
                      className="btn btn-primary m-1 w-100"
                      type="button"
                      disabled
                    >
                      <span
                        className="spinner-border spinner-border-sm"
                        role="status"
                        aria-hidden="true"
                      ></span>
                      Loading...
                    </button>
                  ) : (
                    <button type="submit" className="btn btn-primary m-1 w-100">
                      Sign up
                    </button>
                  )}
                </form>
                <p className="in">
                  By signing up, you agree to our Terms . Learn how we collect,
                  use and share your data in our Data Policy and how we use
                  cookies and similar technology in our Cookies Policy .
                </p>
                <p className="m-1">
                  Don't have an account? <Link href="/login">log in</Link>
                </p>
              </div>
            </div>
          </div>
        )}
      </react.Fragment>
    );
  }
}

export default Signup;
