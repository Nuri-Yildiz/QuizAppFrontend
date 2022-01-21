import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ApiCall from "../api/ApiCall";
import "./userQuestions.css";
import CardMedia from "@mui/material/CardMedia";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const UserQuestions = (props) => {
  const location = useLocation();
  const quizId = location.state.quizId;
  const userId = cookies.get("userId");

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([
    {
      questionText: "",
      answerOptions: [
        { answerText: "", isCorrect: false },
        { answerText: "", isCorrect: false },
        { answerText: "", isCorrect: true },
        { answerText: "", isCorrect: false },
      ],
    },
  ]);

  useEffect(() => {
    getQuestionEntities();
  }, []);

  const getQuestionEntities = async () => {
    const response = await ApiCall.getQuestions(quizId);
    if (response.status === 200) {
      console.log(response.data);
      setQuestions(
        response.data.map((question) => {
          return {
            questionText: question.text,
            imageUrl: question.imageUrl,
            answerOptions: question.answers.map((answer) => {
              return { answerText: answer.text, isCorrect: answer.correct };
            }),
          };
        })
      );
    }
  };
  const handleScore  = (isCorrect) => {
    if (isCorrect) {
      setScore(score + 1);
    }

  }
  const handleAnswerOptionClick = (isCorrect) => {
    handleScore(isCorrect)
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      let userResult = {
        userId: userId,
        quizId: quizId,
        correctAnswers: score,
        incorrectAnswers: questions.length - (score) 
      }
      setShowScore(true);
      
      ApiCall.saveResult(userResult).then();
    }
  };
  return (
    <div>
      <div className="image-section">
        <CardMedia
          component="img"
          image={questions[currentQuestion].imageUrl}
        />
      </div>

      <div className="app">
        {showScore ? (
          <div className="score-section">
            {questions.length} sorudan {score} tanesini doğru yaptınız.
          </div>
        ) : questions ? (
          <>
            <div className="question-section">
              <div className="question-count">
                <span>Soru {currentQuestion + 1}</span>/{questions.length}
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {questions[currentQuestion].answerOptions.map((answerOption) => (
                <button
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
};
export default UserQuestions;
