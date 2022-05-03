import react from "react";
import router from "next/router";
import Loading from "../components/loading";
import sw from "sweetalert2";
import withReactComponent from "sweetalert2-react-content";
import { toast } from "react-toastify";
import axios from "axios";
import Platforms from "../common/platforms";
import Links from "../components/links";
import DisplayInfo from "../components/displayInfo";
import ProfileArea from "../components/profileArea";
import "pattern.css/dist/pattern.min.css";
import HEAD from "next/head"

const swal = withReactComponent(sw);

class Dashboard extends react.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isLoggedIn: null,
      token: null,
      data: {
        displayName: "",
        username: "",
        discription: "",
        links: [],
        link: "",
      },
    };
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.linkEditHandler = this.linkEditHandler.bind(this);
    this.changeStatehandle = this.changeStatehandle.bind(this);
    this.linkDeleteHandler = this.linkDeleteHandler.bind(this);
    this.linkAddHandler = this.linkAddHandler.bind(this);
    this.validateLinks = this.validateLinks.bind(this);
    this.displayInfoChangeHandler = this.displayInfoChangeHandler.bind(this);
  }
  componentDidMount() {
    const localToken = localStorage.getItem("token");
    const sessionToken = sessionStorage.getItem("token");
    if (localToken) {
      this.setState({ token: localToken });
      axios({
        method: "POST",
        url: "http://127.0.0.1:5000/api/user/validate",
        data: {
          token: localToken,
        },
      }).then((res) => {
        if (res.data.success) {
          axios({
            method: "POST",
            url: "http://127.0.0.1:5000/api/links/get",
            data: {
              token: localToken,
            },
          }).then((res) => {
            if (res.data.success) {
              const data = {
                link: `http://${window.location.host}/${res.data.username}`,
                displayName: res.data.displayName,
                links: res.data.links,
                username: res.data.username,
                discription: res.data.discription,
              };
              this.setState({ data: data });
            }
            this.setState({ isLoading: false });
          });
        }
      });
    } else if (sessionToken) {
      this.setState({ token: sessionToken });
      axios({
        method: "POST",
        url: "http://127.0.0.1:5000/api/user/validate",
        data: {
          token: sessionToken,
        },
      }).then((res) => {
        if (res.data.success) {
          axios({
            method: "POST",
            url: "http://127.0.0.1:5000/api/links/get",
            data: {
              token: sessionToken,
            },
          }).then((res) => {
            if (res.data.success) {
              const data = {
                displayName: res.data.displayName,
                link: `http://${window.location.host}/${res.data.username}`,
                links: res.data.links,
                username: res.data.username,
                discription: res.data.discription,
              };
              this.setState({ data: data });
            }
            this.setState({ isLoading: false });
          });
        }
      });
    } else {
      router.push("/login");
    }
  }

  linkEditHandler(e, id, index) {
    const target = e.target.id;
    console.log(target, id, index);
    const input = document.getElementById(id);
    const icon = document.getElementById(target);
    if (input.disabled) {
      icon.setAttribute(
        "src",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAaBJREFUSEuNleuVwiAQhb+bCuxES9CKtoTVDrYjU4LpxAoyewKYDAGC+eHRCDP3NSABFj5oPP7Pw4WV/ULfbNnWpG8VVPU6YnnffVoNhCXiOcvw3mFJDTpcKuBbOzzBKFGx8hvhOsRLBlWPNvMTEi9LXaK8jvNgMeSjaVu1Vqaach1uyMSMUa6tN7MT8KNBj33cMw/6ypflY3F7gi4YDw2673GtsPpDl+s7m50ET+BiMAmukt57GHkDX6PouEXD5vkECsWBiVR8KZYFoW9aLtzya0FOQo4xoYg849cctITabL4Df+vGtCEZ+gS7gBzy+lxkMf2EPhbXL8YLcQtNBEeytE7L6mG3oDQYBWfgBdxC/BQNjZrbVRpC46OTODKoGBGkMEbE2eCVqGaGHqZunXzXYJ/faKaNhs4KDGwydB0GvXPUbRpu0Jzt7vJJpo7JwpgWv7SoXaZuPXj8WeSXpSYUUawGp9mgmLD1xSZdblZxOHpDPyxbDLf3JaLm9V1r0BqP1nW4uyDaIpUMDp3rFiri7q6UNAfpkKqE+3CWOhfhPwBh7B6l/pt9AAAAAElFTkSuQmCC"
      );
      input.disabled = false;
      const v = input.value;
      input.value = "";
      input.value = v;
      input.focus();
    } else {
      axios({
        method: "PUT",
        url: "http://127.0.0.1:5000/api/links/update",
        data: {
          token: this.state.token,
          username: this.state.data.links[index].username,
          platform: this.state.data.links[index].platform,
          linkId: this.state.data.links[index].linkId,
        },
      }).then((res) => {
        if (res.data.success) {
          console.log("edit ok");
        }
      });
      icon.setAttribute(
        "src",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAipJREFUSEuVVu11GzEMA24BtxO03cAjJBN0BD9vkI3iEbpBPUK6QbqBJxD6SOqDujs3jv74LEsgCYA8E2kRgPKGPxOE+v5nz9j5vvJlf64b+fk/pzepRXoJ3jPdpLgTZacMSRcAV3K5ZJwpgFSeALwC+u6xja/2kZ+BcwZScfBT5Cr/zVMXwJyMpHcA33pRDmr8mw59nUkaYMDJksEbgEPi6MyFFw9QdfRoRXKGaGtX8LjQjGDgJN+lcgR4TUFWAWoUqfjdil/R9jWotPyE8MyFb5KOEK6gXiaKsshFpVawcFhztmmlJXGOG4Bn0oN8IWnfh3WyBSW54Wn4d0wnFeP2lEUBcBPwY1mBew9lTj/SwMAFnlr06gHDScLP6k2ZegUbDbpbnJYE2mp08AZrWhhd7cetizJFlT+npfq8tkNYFDgvbtmAV9ERxG+SX+cA2UWrAHMTTcJsaJF0A3Qgl87M1MnDRVVk6+IStE1LCJ8Pr0QFleKFZLsUIlcC90Rul9rYgI+JAF8Px2LJEJgC5MyGyFZi5GB7ifdpTIwpEL1iCU4mmadpgMWBGmAzp9c5dyKayF6BT4K9YZcp2vCeJ8Z+F4ZeVCSYzncyRyfPoyLm7sfTb+qjbQVEUblROKzGQOi7aoB+Ju9HZX9IHnsfjMQ8wBMBc8h4J/j7mHOAOxRB+AviZSF/hTrTe+QeBzvsPEDXTgUZqI7oB4TNYo6s07+QTyTz4F+Y+T31D6q/ViqXCEqJAAAAAElFTkSuQmCC"
      );
      input.disabled = true;
    }
  }
  linkDeleteHandler(e, platform, username, linkId) {
    swal
      .fire({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this!",
        icon: "warning",
        showDenyButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: "Yes",
        confirmButtonColor: "#d9534f",
        denyButtonColor: "#0275d8",
      })
      .then((willDelete) => {
        if (willDelete.isConfirmed) {
          const index = this.findIndex(
            username,
            platform,
            this.state.data.links
          );
          axios({
            method: "DELETE",
            url: "http://127.0.0.1:5000/api/links/delete",
            data: {
              token: this.state.token,
              username: username,
              Platform: platform,
              linkId: linkId,
            },
          }).then((res) => {
            if (res.data.success) {
              console.log("delete ok");
            }
          });
          this.setState((prevState) => {
            let data = Object.assign({}, prevState.data);
            let links = [];
            data.links.map((link, i) => {
              const target = this.state.data.links[index];
              if (i !== index) {
                if (link.priority > target.priority) {
                  link.priority = links.length;
                }
                links.push(link);
              }
            });
            data.links = links;
            return { data };
          });
        }
      });
  }
  validateLinks(username, platform) {
    for (
      let i = 0;
      i < this.state.data.links ? this.state.data.links.length : 0;
      i++
    ) {
      if (
        this.state.data.links &&
        this.state.data.links[i].username === username &&
        this.state.data.links[i].platform === platform
      ) {
        return true;
      }
    }
    return false;
  }
  linkAddHandler() {
    let platforms = [];
    for (const plat in Platforms) {
      platforms.push(plat);
    }
    let out = "";
    platforms.forEach((platform) => {
      out += `<option value="${platform}">${platform}</option>`;
    });
    swal
      .fire({
        title: "Add Link",
        html:
          `<select required id="newPlatform" class="form-select mb-1" aria-label="Default select example">` +
          `<option selected>Platform</option>` +
          out +
          `</select>` +
          `<input required type="text" class="form-control mb-1" id="newUsername" placeholder="username"/>`,
      })
      .then((res) => {
        const newPlatform = document.getElementById("newPlatform").value;
        const newUsername = document.getElementById("newUsername").value;
        if (newPlatform !== "Platform" && newUsername !== "") {
          const newLink = {
            platform: newPlatform,
            username: newUsername,
            priority: this.state.data.links ? this.state.data.links.length : 0,
          };
          const isValid = this.validateLinks(newUsername, newPlatform);
          if (isValid) {
            toast.error("This username and platform already exist");
          } else {
            axios({
              method: "POST",
              url: "http://127.0.0.1:5000/api/links/insert",
              data: {
                token: this.state.token,
                username: newUsername,
                platform: newPlatform,
              },
            }).then((res) => {
              if (res.data.success) {
                console.log("insert ok");
              }
            });
            this.setState((prevState) => {
              const data = Object.assign({}, prevState.data);
              const copyOfLinks = this.state.data.links ? [...data.links] : [];
              copyOfLinks.push(newLink);
              data.links = copyOfLinks;
              return { data };
            });
          }
        } else {
          toast.info("To add a link, you must enter a username and platform");
        }
      });
  }

  findIndex(username, platform, links) {
    for (let i = 0; i < links.length; i++) {
      if (links[i].username === username && links[i].platform === platform) {
        return i;
      }
    }
  }
  changeStatehandle(prevState, t, target, index) {
    let data = Object.assign({}, prevState.data);
    data.links[index].platform === t
      ? (data.links[index].username = target)
      : null;
    return { data };
  }
  displayInfoChangeHandler() {
    const name = document.getElementById("displayName");
    const dis = document.getElementById("discription");
    const btn = document.getElementById("edit");
    if (name.disabled && dis.disabled) {
      dis.disabled = false;
      name.disabled = false;
      btn.innerText = "done";
    } else {
      axios({
        method: "PUT",
        url: "http://127.0.0.1:5000/api/user/update/displayinfo",
        data: {
          discription: this.state.data.discription,
          displayName: this.state.data.displayName,
          token: this.state.token,
        },
      }).then((res) => {
        if (res.data.success) {
          dis.disabled = true;
          name.disabled = true;
          btn.innerText = "edit";
          toast.success(res.data.message);
        } else {
          toast.success(res.data.message);
        }
      });
    }
  }
  onChangeHandler(e, t, i) {
    const target = e.target.value;
    switch (t) {
      case "displayName":
        this.setState((prevState) => {
          let data = Object.assign({}, prevState.data);
          data.displayName = target;
          return { data };
        });
        break;
      case "discription":
        this.setState((prevState) => {
          let data = Object.assign({}, prevState.data);
          data.discription = target;
          return { data };
        });
        break;
      case "instagram":
        this.setState((prevState) =>
          this.changeStatehandle(prevState, t, target, i)
        );
        break;
      case "twitter":
        this.setState((prevState) =>
          this.changeStatehandle(prevState, t, target, i)
        );
        break;
      case "twitch":
        this.setState((prevState) =>
          this.changeStatehandle(prevState, t, target, i)
        );
        break;
      case "email":
        this.setState((prevState) =>
          this.changeStatehandle(prevState, t, target, i)
        );
        break;
      case "linkedin":
        this.setState((prevState) =>
          this.changeStatehandle(prevState, t, target, i)
        );
        break;
    }
  }
  copyHandler(e) {
    const link = e.target.value;
    navigator.clipboard.writeText(link);
    toast.success("link succussfully copied.");
  }
  logoutHandler() {
    swal
      .fire({
        title: "Are you sure?",
        text: "After clicking Logout, you must log in again to access this area.",
        icon: "warning",
        showDenyButton: true,
        showCancelButton: false,
        showConfirmButton: true,
        denyButtonText: "Cancel",
        confirmButtonText: "Logout",
        confirmButtonColor: "#d9534f",
        denyButtonColor: "rgb(108, 117, 125)",
      })
      .then((isConfirmed) => {
        if (isConfirmed.isConfirmed) {
          localStorage.clear();
          sessionStorage.clear();
          toast.success("user successfuly logged out.");
          setTimeout(() => {
            router.push("/login");
          }, 6000);
        }
      });
  }
  render() {
    return (
      <react.Fragment>
        <HEAD>
          <title>Dashboard</title>
        </HEAD>
        {this.state.isLoading ? (
          <Loading />
        ) : (
          <div className="container-fluid vh-100 overflow-auto">
            <div className="row mvh-100 pattern-diagonal-stripes-lg text-bg">
              <div id="dashboard-left" className="col-md-4 p-0 d-flex flex-column justify-content-start align-items-center">
                <ProfileArea
                  username={this.state.data.username}
                  link={this.state.data.link}
                  copyHandler={this.copyHandler}
                  logoutHandler={this.logoutHandler}
                />
              </div>
              <div id="dashboard-right" className="col-md-8 p-0 d-flex flex-column">
                <DisplayInfo
                  onChangeHandler={this.onChangeHandler}
                  displayName={this.state.data.displayName}
                  discription={this.state.data.discription}
                  displayInfoChangeHandler={this.displayInfoChangeHandler}
                />
                <Links
                  links={this.state.data.links}
                  onChangeHandler={this.onChangeHandler}
                  linkDeleteHandler={this.linkDeleteHandler}
                  linkEditHandler={this.linkEditHandler}
                  linkAddHandler={this.linkAddHandler}
                />
              </div>
            </div>
          </div>
        )}
      </react.Fragment>
    );
  }
}

export default Dashboard;