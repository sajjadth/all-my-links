import react from "react";
import Platforms from "../common/platforms";

class Link extends react.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        id={this.props.link.platform + "-" + this.props.link.username}
        className="input-group m-1"
      >
        <img
          className="input-group-text"
          src={Platforms[this.props.link.platform].icon}
        />
        <input
          id={
            this.props.link.platform +
            "-" +
            this.props.link.username +
            "-" +
            this.props.link.platform
          }
          className="form-control"
          type="text"
          onChange={(e) =>
            this.props.onChangeHandler(
              e,
              this.props.link.platform,
              this.props.index
            )
          }
          value={this.props.link.username}
          disabled
        />
        <input
          className="btn btn-danger"
          type="image"
          onClick={(e) =>
            this.props.linkDeleteHandler(
              e,
              this.props.link.platform,
              this.props.link.username,
              this.props.link.linkId
            )
          }
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAeZJREFUSEuNVdFVwzAMPOebuiMwAmUTRoANGIFNYAQ2ATaAEeL2u+LJlm3JcpvmJ3mOrdPpTnLA+AQAZBfd0tUF+alet0W7JajLFuBjlwECQGt6BvBeNzG5ciiAQC9LjB8tQE7CZlL3urLwITqdDjifv3QGAwDCsjyGu913DrAFcE4p41+jRCAEnaQEzetyMMTYwpi9lJLIm+lP6leI1tP5W2ctwEuMofrEJzwR6paljmPpKYBQZOPap0Qu0wnKyKCUZsumArCdtQ3EYMs+co7lMX0weLxr0ew41cPZQQMIihG5ItN6pOrb6ogCKuJzIXbFKToZ7R7LwLLqh3KgfeCwbOHGmysgVtTApUQXRe4otHaRQ9xzP5tMOTtmwKEKsJRd+b8KYTq5YlOSErlS9P5owMdENesw00AL1QEkKw2QA0mjudKVdW4wLmO1e/m2kyqXmUtUBWcNXIlEg1wizcABzKbp0GhNTM3AiWw16DIbBt0jo/XGTHN3RO2uCYDMjum41qNi6qIJg66BNnO/O8x90Bi4sawbxv80jaa2uvFPa/oFcO+GinJRc5S4gUA/S4wHNYbKn2EM5UVK6QnAG4AHhz6bZoQ/AK8hxs9xv7ovRv+2/pkRGeec33NNZEez3eUbSUy69h8wdTQyLoxOHAAAAABJRU5ErkJggg=="
        />
        <input
          id={this.props.link.platform + "-" + this.props.index}
          className="btn btn-secondary"
          type="image"
          onClick={(e) =>
            this.props.linkEditHandler(
              e,
              this.props.link.platform +
                "-" +
                this.props.link.username +
                "-" +
                this.props.link.platform,
              this.props.index
            )
          }
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAipJREFUSEuVVu11GzEMA24BtxO03cAjJBN0BD9vkI3iEbpBPUK6QbqBJxD6SOqDujs3jv74LEsgCYA8E2kRgPKGPxOE+v5nz9j5vvJlf64b+fk/pzepRXoJ3jPdpLgTZacMSRcAV3K5ZJwpgFSeALwC+u6xja/2kZ+BcwZScfBT5Cr/zVMXwJyMpHcA33pRDmr8mw59nUkaYMDJksEbgEPi6MyFFw9QdfRoRXKGaGtX8LjQjGDgJN+lcgR4TUFWAWoUqfjdil/R9jWotPyE8MyFb5KOEK6gXiaKsshFpVawcFhztmmlJXGOG4Bn0oN8IWnfh3WyBSW54Wn4d0wnFeP2lEUBcBPwY1mBew9lTj/SwMAFnlr06gHDScLP6k2ZegUbDbpbnJYE2mp08AZrWhhd7cetizJFlT+npfq8tkNYFDgvbtmAV9ERxG+SX+cA2UWrAHMTTcJsaJF0A3Qgl87M1MnDRVVk6+IStE1LCJ8Pr0QFleKFZLsUIlcC90Rul9rYgI+JAF8Px2LJEJgC5MyGyFZi5GB7ifdpTIwpEL1iCU4mmadpgMWBGmAzp9c5dyKayF6BT4K9YZcp2vCeJ8Z+F4ZeVCSYzncyRyfPoyLm7sfTb+qjbQVEUblROKzGQOi7aoB+Ju9HZX9IHnsfjMQ8wBMBc8h4J/j7mHOAOxRB+AviZSF/hTrTe+QeBzvsPEDXTgUZqI7oB4TNYo6s07+QTyTz4F+Y+T31D6q/ViqXCEqJAAAAAElFTkSuQmCC"
        />
      </div>
    );
  }
}

export default Link;
