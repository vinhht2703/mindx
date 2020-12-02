import React, { Component } from "react";
import PropTypes from "prop-types";

class Ex1Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstArr: [1, 2, "a"],
      secondArr: [1, 3, "b"],
      handledArr: [],
    };
  }

  componentDidMount() {
    this._handleArr();
  }

  _handleArr = () => {
    const { firstArr, secondArr } = this.state;
    let handledArr = [];
    firstArr.forEach((k) => {
      if (secondArr.includes(k)) return;

      handledArr.push(k);
    });

    secondArr.forEach((k) => {
      if (firstArr.includes(k)) return;

      handledArr.push(k);
    });

    this.setState({ handledArr });
  };

  _renderInput = () => {
    const { handledArr } = this.state;

    if (!Array.isArray(handledArr)) return null;

    return (
      <div>
        <span></span>
      </div>
    );
  };

  render() {
    const { handledArr } = this.state;
    return (
      <div>
        <div>EX1</div>
        <div>{handledArr.join(', ')}</div>
      </div>
    );
  }
}

Ex1Comp.propTypes = {};

export default Ex1Comp;
