import React, { Component } from "react";
import LoadIcon from "../LoadIcon/LoadIcon";
import NavBar from "../NavBar/NavBar";
import ContentCard from "../ContentCard/ContentCard";
import "./ListView.css";

class ListView extends Component {
  state = {
    loaded: false,
    db: [],
    display: []
  };

  componentDidMount() {
    if (!this.state.loaded) {
      //   console.log("load");
      document.addEventListener("updateDB", this.updateDB);
      this.loadDB();
    }
  }

  componentWillMount() {
    document.title = "Lista de Cursos";
  }

  componentWillUnmount() {
    document.removeEventListener("updateDB", this.updateDB);
  }

  updateDB = data => {
    // console.log(data.detail);
    document.removeEventListener("updateDB", this.updateDB);
    this.state.db = data.detail;
    this.state.display = data.detail;
    this.state.loaded = true;
    this.setState(this.state);
  };

  loadDB = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText).data;

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

  handleSelectChange = event => {
    if (event.target.selectedIndex === 0) {
      this.setState({ display: this.state.db });
    } else {
      let temp = [];
      this.state.db.forEach(element => {
        if (element.categories[0] === event.target.selectedIndex) {
          temp.push(element);
        }
      });
      this.setState({ display: temp });
    }
  };

  render() {
    const content = this.state.display.map(course => {
      // console.log(course.id);
      return (
        <div key={course.id} className="card">
          <ContentCard course={course} key={course.id} />
        </div>
      );
    });

    console.log(this.state.db);

    if (this.state.loaded) {
      return (
        <div>
          <NavBar />
          <br />
          <br />
          <br />
          <br />
          <label
            className="category-selector-label"
            htmlFor="category-selector"
          >
            Categoria:
            <select
              id="category-selector"
              defaultValue="Todas"
              onChange={this.handleSelectChange}
              className="category-selector"
            >
              <option>Todas</option>
              <option>Fiscal</option>
              <option>Contábil</option>
              <option>Trabalhista</option>
            </select>
          </label>
          <div className="container">
            <div id="list-view">{content}</div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <NavBar />
          <LoadIcon />
        </div>
      );
    }
  }
}

export default ListView;
