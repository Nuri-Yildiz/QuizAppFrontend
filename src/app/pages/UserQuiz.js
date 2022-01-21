import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ApiCall, { getQuiz } from "../api/ApiCall";
import { UserQuizCard } from "../components/UserQuizCard";

export const UserQuiz = () => {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    getQuiz();
  }, []);

  const getQuiz = async () => {
    const response = await ApiCall.getQuiz();
    if (response.status === 200) {
      setQuizList(response.data);
    }
  };

  return (
    <>
      <Container maxWidth="sm">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-evenly",
          }}
        >
          {quizList &&
            quizList.map((quiz, i) => {
              return (
                <UserQuizCard
                  quizName={quiz.name}
                  imageUrl={quiz.imageUrl}
                  key={i.toString()}
                  quizId={quiz.id}
                />
              );
            })}
        </Box>
      </Container>
    </>
  );
};
export default UserQuiz;
