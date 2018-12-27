import React, { Component } from "react";
import ContentView from "./components/ContentView/ContentView";
import ListView from "./components/ListView/ListView";

const NO_QUERY = "none";

class App extends Component {
  getQuery = search => {
    if (window.location.search === "") return NO_QUERY;

    let query = search.split("?")[1];

    let parameters = {};

    parameters[query.split("=")[0]] = query.split("=")[1];

    return parameters;
  };

  render() {
    let query = this.getQuery(window.location.search);

    return (
      <div className="App">
        {query === NO_QUERY ? <ListView /> : <ContentView id={query.id} />}
      </div>
    );
  }
}

export default App;
