import React, { Component } from "react";

class ContentView extends Component {
  state = {
    id: "init"
  };

  handleBack = () => {
    window.location.search = "";
  };

  render() {
    return (
      <div>
        <p>ContentView {this.props.id}</p>
        <button onClick={this.handleBack}>back</button>
      </div>
    );
  }
}

export default ContentView;
