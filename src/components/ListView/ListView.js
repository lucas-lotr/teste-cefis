import React, { Component } from "react";

class ListView extends Component {
  handleContentClick = event => {
    window.location.search = `?id=${event.target.id}`;
  };

  render() {
    return (
      <div>
        <p>ListView</p>
        <button id="1" onClick={this.handleContentClick}>
          id 1
        </button>
        <button id="2" onClick={this.handleContentClick}>
          id 2
        </button>
      </div>
    );
  }
}

export default ListView;
