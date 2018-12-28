import React, { Component } from "react";
import "./ContentCard.css";

class ContentCard extends Component {
  render() {
    return (
      <a
        className="banner"
        href={`${window.location.href}?id=${this.props.course.id}`}
      >
        <p>{this.props.course.title}</p>
        <div
          style={{ backgroundImage: `url(${this.props.course.banner})` }}
          className="banner"
        />
      </a>
    );
  }
}

export default ContentCard;
