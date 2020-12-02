import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.css";

class Ex3Comp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      score: 0,
      message: "",
    };
  }

  componentDidMount() {
    this._fetchData();
  }

  _selectAnw(e, index) {
    let { data, score, message } = this.state;
    console.log("_selectAnw", e, e.target.value, e.target.checked);

    if (data[index]) {
      if (
        e.target.checked &&
        data[index].correct_answer &&
        data[index].correct_answer === e.target.value
      ) {
        score += 10;
        message = "Correct :D";
      } else if (
        !e.target.checked &&
        data[index].correct_answer &&
        data[index].correct_answer === e.target.value
      ) {
        score -= 10;
        message = "Incorrect :(";
      } else {
        message = "Incorrect :(";
      }
    }

    this.setState({ score, message });
  }

  _handleStatus = (title, question) => {
    const { correct_answer, incorrect_answers, selectedAnswers } =
      question || {};

    if (!Array.isArray(selectedAnswers)) return;

    const isSelected = selectedAnswers.includes(title);
    const isCorrect = isSelected && correct_answer === title;
    const isIncorrect = isSelected && incorrect_answers.includes(title);
    const status = isCorrect ? "green" : isIncorrect ? "red" : "";

    return status;
  };

  _handleFetchedData = (data) => {
    return data.map((question) => ({ ...question, selectedAnswers: [] }));
  };

  _fetchData = () => {
    fetch(
      "https://opentdb.com/api.php?amount=5&category=21&difficulty=easy&type=multiple"
    )
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("result", result);
          if (result && Array.isArray(result.results)) {
            const handledData = this._handleFetchedData(result.results);
            this.setState({ data: handledData });
          }
        },
        (error) => {
          console.log("error", error);
        }
      );
  };

  _renderQuestions = () => {
    const { data } = this.state;
    if (!Array.isArray(data)) return;

    return data.map((ques, index) => {
      const { question } = ques || {};

      return (
        <label className="question-wrapper" style={{ paddingTop: 10 }}>
          <span className="title">
            {index + 1}. {question}:
          </span>
          <br />
          <span className="answers-wrapper">
            {this._renderAnswers(ques, index)}
          </span>
        </label>
      );
    });
  };

  _renderAnswers = (question, index) => {
    const { correct_answer, incorrect_answers, selectedAnswers } =
      question || {};

    if (!correct_answer || !Array.isArray(incorrect_answers)) return null;

    console.log("_renderAnswers", incorrect_answers);
    const answers = [correct_answer, ...incorrect_answers];

    if (!Array.isArray(answers)) return null;

    return answers.map((title) => {
      return (
        <label
          className={`answer`}
          style={{ width: 500, paddingLeft: 10, paddingTop: 5 }}
        >
          <input
            onChange={(e) => {
              this._selectAnw(e, index);
            }}
            value={title}
            name={title}
            type="checkbox"
          />
          {title}
          <br />
        </label>
      );
    });
  };

  _renderScore = () => {
    const { score, message } = this.state;
    return (
      <div style={{ padding: "20px" }}>
        <span>SCORE: {score}</span>{" "}
        <span style={{ paddingLeft: "10px", color: "red" }}>{message}</span>
      </div>
    );
  };

  render() {
    return (
      <form className="ex3-container">
        {this._renderScore()}
        {this._renderQuestions()}
      </form>
    );
  }
}

Ex3Comp.propTypes = {};

export default Ex3Comp;
