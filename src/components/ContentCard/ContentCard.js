import React, { Component } from "react";
import { Grid, Row } from "react-bootstrap";
import "./ContentCard.css";

class ContentCard extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <p>card {this.props.course.id}</p>
          <a href={`${window.location.href}?id=${this.props.course.id}`}>
            <img className="banner" src={this.props.course.banner} />
          </a>
        </Row>
      </Grid>
    );
  }
}

export default ContentCard;
