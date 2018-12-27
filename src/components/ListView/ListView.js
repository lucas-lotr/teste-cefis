import React, { Component } from "react";
import LoadIcon from "../LoadIcon/LoadIcon";

class ListView extends Component {
  state = {
    loaded: false,
    db: {}
  };

  componentDidMount() {
    if (!this.state.loaded) {
      //   console.log("load");
      document.addEventListener("updateDB", this.updateDB);
      this.loadDB();
    }
  }

  componentWillUnmount() {
    document.removeEventListener("updateDB", this.updateDB);
  }

  updateDB = data => {
    // console.log(data.detail);
    document.removeEventListener("updateDB", this.updateDB);
    this.state.db = data.detail;
    this.state.loaded = true;
    this.setState(this.state);
  };

  loadDB = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        // console.log(JSON.parse(this.responseText).data);
        // updateDB(JSON.parse(this.responseText).data);
        // this.state.db = JSON.parse(this.responseText).data
        // this.stat
        // this.setState()
        let response = JSON.parse(this.responseText).data;

        // console.log("done");

        document.dispatchEvent(
          new CustomEvent("updateDB", {
            detail: response
          })
        );
      }
    };
    xhttp.open("GET", "https://cefis.com.br/api/v1/event", true);
    xhttp.send();
  };

  handleContentClick = event => {
    window.location.search = `?id=${event.target.id}`;
  };

  render() {
    console.log(this.state.db);
    if (this.state.loaded) {
      return (
        <div id="list-view">
          <p>ListView</p>
          <button id="1" onClick={this.handleContentClick}>
            id 1
          </button>
          <button id="2" onClick={this.handleContentClick}>
            id 2
          </button>
        </div>
      );
    } else {
      return <LoadIcon />;
    }
  }
}

export default ListView;
