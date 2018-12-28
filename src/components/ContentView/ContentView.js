import React, { Component } from "react";

class ContentView extends Component {
  state = {
    id: "init"
  };

  componentWillMount() {
    document.title = "ContentView";
  }

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
