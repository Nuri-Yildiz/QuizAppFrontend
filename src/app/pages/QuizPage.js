import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ApiCall from "../api/ApiCall";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { QuestionCard } from "../components/QuestionCard";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export default function QuizPage() {
  const location = useLocation();
  const quizId = location.state.quizId;
  cookies.set("quizId",quizId,{ path: "/" });


  const [questionList, setQuestionList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [question, setQuestion] = useState({});
  const [questionToDelete, setQuestionToDelete] = useState();

  const setModalIsOpenToTrue = () => {
    setModalIsOpen(true);
  };
  const setModalIsOpenToFalse = () => {
    setModalIsOpen(false);
  };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setQuestion((state) => ({ ...state, [id]: value }));
    console.log(question);
  };

  const getQuestions = async () => {
    const response = await ApiCall.getQuestions(quizId);
    if (response.status === 200) {
      setQuestionList(response.data);
    }
  };

  useEffect(() => {
    deleteQuestion(questionToDelete);
  }, [questionToDelete]);

  const deleteQuestion = async (questionId) => {
    await ApiCall.deleteQuestion(questionId).then((response) => {
      if (response.status === 200) {
        setQuestionList(response.data);
      }
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(question);
    // eslint-disable-next-line no-console
    let formData = {
      question: question.questionText,
      imageUrl: question.questionImage,
      answer1: question.answerText1,
      answer2: question.answerText2,
      answer3: question.answerText3,
      answer4: question.answerText4,
    };

    let questionData = {
      text: formData.question,
      imageUrl: formData.imageUrl,
      quiz: { id: quizId },
    };

    ApiCall.saveQuestion(questionData).then((response) => {
      console.log(response);
      let answerData = [
        {
          text: formData.answer1,
          question: { id: response.data.id },
          correct: "false",
        },
        {
          text: formData.answer2,
          question: { id: response.data.id },
          correct: "false",
        },
        {
          text: formData.answer3,
          question: { id: response.data.id },
          correct: "false",
        },
        {
          text: formData.answer4,
          question: { id: response.data.id },
          correct: "true",
        },
      ];
      response &&
        ApiCall.saveAnswers(answerData)
          .then((response) => {
            response && setModalIsOpenToFalse();
          })
          .catch((e) => console.log(e));
    });
    getQuestions();
    getQuestions();
    getQuestions();
    getQuestions();
  };

  return (
    <>
      <Container maxWidth="lg">
        
        <Modal
          open={modalIsOpen}
          onClose={setModalIsOpenToFalse}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          className="modal-xs"
        >
          <Box sx={style} component="form" onSubmit={handleSubmit} noValidate>
            <Grid container direction="row" spacing={1}>
              <Grid item xs={11}>
                <Typography variant="h5">Soru ekle</Typography>
              </Grid>
              <Grid item xs={1}>
                <Button onClick={setModalIsOpenToFalse}>x</Button>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={1} sx={{ mt: 3, mb: 2 }}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  id="questionText"
                  fullWidth
                  label="Soru"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  id="questionImage"
                  fullWidth
                  label="Görsel Linki"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="answerText1"
                  xs={12}
                  fullWidth
                  label="1. Seçenek"
                  required
                  name="answerText1"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="answerText2"
                  fullWidth
                  label="2. Seçenek"
                  required
                  name="answerText2"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="answerText3"
                  fullWidth
                  label="3. Seçenek"
                  required
                  name="answerText3"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="answerText4"
                  fullWidth
                  label="4. Seçenek(Doğru)"
                  required
                  name="answerText4"
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Ekle
            </Button>
          </Box>
        </Modal>

        <Box
          sx={{
            marginTop: 8,
            display: "inline-flex",
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-evenly",
            borderColor: "black",
            flexWrap: "wrap",
          }}
        >
          {questionList &&
            questionList.map((question) => {
              return (
                <QuestionCard
                  questionText={question.text}
                  imageUrl={question.imageUrl}
                  key={question.id}
                  questionId={question.id}
                  answers={question.answers}
                  deleteQuestion={setQuestionToDelete}
                />
              );
            })}
        </Box>
        <Button
          onClick={setModalIsOpenToTrue}
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Soru Ekle
        </Button>
      </Container>
    </>
  );
}
