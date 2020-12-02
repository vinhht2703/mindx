import React, { Component } from "react";
import PropTypes from "prop-types";

class Ex2Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        { name: "Arsenal", point: 99, GD: 45 },
        { name: "Chelsea", point: 75, GD: 39 },
        { name: "Manchester United", point: 60, GD: 29 },
        { name: "Liverpool", point: 88, GD: 30 },
      ],
    };
  }

  componentDidMount() {
    this._handleRankingData();
  }

  _handleRankingData = () => {
    const { data } = this.state;

    if (!Array.isArray(data)) return;

    let handledData = data.sort((clubA, clubB) =>
      clubA.point > clubB.point
        ? 1
        : clubA.GD > clubB.GD
        ? 1
        : clubA.name > clubB.name
        ? 1
        : -1
    );

    return handledData;
  };

  _renderRanking = () => {
    const { data } = this.state;
    if (!Array.isArray(data)) return;

    return (
      <div>
        {data.map((club) => {
          const { name } = club || {};
          return <div style={{ paddingTop: "20px" }}>{name}</div>;
        })}
      </div>
    );
  };

  render() {
    return (
      <div>
        <div></div>
        <div>{this._renderRanking()}</div>
      </div>
    );
  }
}

Ex2Comp.propTypes = {};

export default Ex2Comp;
