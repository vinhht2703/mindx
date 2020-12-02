import React, { Component } from "react";
import PropTypes from "prop-types";
import Ex1Comp from "./components/Ex1Comp";
import Ex2Comp from "./components/Ex2Comp";
import Ex3Comp from "./components/Ex3Comp";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exerciseData: [
        { title: "Ex1", key: "1" },
        { title: "Ex2", key: "2" },
        { title: "Ex3", key: "3" },
      ],

      selectedKey: "1",
    };
  }

  _onClickKey = (key) => {
    this.setState({
      selectedKey: key,
    });
  };

  _renderExerciseTitles = () => {
    const { exerciseData } = this.state;
    if (!Array.isArray(exerciseData)) return <div></div>;

    return (
      <div>
        <ol>
          {exerciseData.map((ex) => {
            const { key, title } = ex || {};
            return (
              <li
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={() => this._onClickKey(key)}
              >
                {title}
              </li>
            );
          })}
        </ol>
      </div>
    );
  };

  _renderLayout = () => {
    const { selectedKey } = this.state;
    switch (selectedKey) {
      case "1":
        return <Ex1Comp />;
      case "2":
        return <Ex2Comp />;
      case "3":
        return <Ex3Comp />;

      default:
        return <div>Nothing</div>;
    }
  };

  render() {
    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "20%" }}>
          <div>Select Exercise: </div>
          {this._renderExerciseTitles()}
        </div>
        <div style={{ width: "80%", paddingTop: "10px" }}>
          {this._renderLayout()}
        </div>
      </div>
    );
  }
}

App.propTypes = {};

export default App;
