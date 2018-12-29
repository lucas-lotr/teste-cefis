import React, { Component } from "react";
import LoadIcon from "../LoadIcon/LoadIcon";
import NavBar from "../NavBar/NavBar";
import { Grid, Row, Col } from "react-bootstrap";
import "./ContentView.css";

class ContentView extends Component {
  state = {
    course: {},
    loaded: false
  };

  componentWillMount() {
    document.title = "Carregando curso...";
  }

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
    this.state.course = data.detail;
    this.state.loaded = true;
    this.setState(this.state);
  };

  loadDB = () => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState === 4 && this.status === 200) {
        let response = JSON.parse(this.responseText).data;

        document.title = response.title;

        console.log(response);

        document.dispatchEvent(
          new CustomEvent("updateDB", {
            detail: response
          })
        );
      }
    };
    xhttp.open(
      "GET",
      `https://cefis.com.br/api/v1/event/${this.props.id}?include=classes`,
      true
    );
    xhttp.send();
  };

  capitalizeFirstLetter = string => {
    const temp = string.split(" ").map(word => {
      return word[0].toUpperCase() + word.slice(1).toLowerCase();
    });

    return temp.join(" ");
  };

  render() {
    if (this.state.loaded) {
      const { course } = this.state;

      console.log(course.classes.length);

      var classes = "Não há aulas disponiveis para este curso.";

      if (course.classes.length > 0) {
        classes = course.classes.map(element => {
          return <p key={element.id}>{element.title}</p>;
        });
      }

      const teacher = this.capitalizeFirstLetter(course.teachers_names);

      // const classes = course.classes.map(class => {});

      // if (course.classes.length())

      return (
        <div>
          <NavBar />
          <div>
            <br />
            <br />
            <div className="course">
              <h3 className="course-title">{course.title}</h3>
              <br />
              <Grid fluid={true}>
                <Row>
                  <Col lg={4}>
                    <h4 className="course-subtitle">Objetivo:</h4>
                    <p className="course-description">{course.goal}</p>
                  </Col>
                  <Col lg={8}>
                    <h4 className="course-subtitle">Descrição:</h4>
                    <p className="course-description">{course.resume}</p>
                  </Col>
                </Row>
              </Grid>
              <br />

              <div>
                <h4>Professor:</h4>
                <p className="teacher">{teacher}</p>
              </div>
              <br />
              <div>
                <h4>Aulas:</h4>
                <div className="classes">{classes}</div>
              </div>
            </div>
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

export default ContentView;
