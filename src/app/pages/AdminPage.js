import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import ApiCall, { getQuiz } from "../api/ApiCall";
import { BaseCard } from "../components/BaseCard";
import { Button } from "@mui/material";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@material-ui/core/Typography";

export const AdminPage = () => {
  const [quizList, setQuizList] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [newQuiz, setNewQuiz] = useState({});

  useEffect(() => {
    getQuiz();
  }, []);

  const getQuiz = async () => {
    const response = await ApiCall.getQuiz();
    console.log(response);
    if (response.status === 200) {
      setQuizList(response.data);
    }
  };

  const deleteQuiz = (quizId) => {
    ApiCall.deleteQuiz(quizId).then((response) => {
      response && response.data && setQuizList(response.data)
    })
  } 

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
  const handleChange = (event) => {
    event.preventDefault();
    const { id, value } = event.target;
    setNewQuiz((state) => ({ ...state, [id]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    // eslint-disable-next-line no-console
    let formData = {
      name: newQuiz.quizText,
      imageUrl: newQuiz.quizImage
    };
    console.log(formData)
    ApiCall.addQuiz(formData).then(response => {
      if (response.status === 200) {
        setQuizList(response.data);
        setModalIsOpenToFalse();
      }
    })
  }

  return (
    <>
      <Container maxWidth="sm">
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
                <Typography variant="h5">Quiz ekle</Typography>
              </Grid>
              <Grid item xs={1}>
                <Button onClick={setModalIsOpenToFalse}>x</Button>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={1} sx={{ mt: 3, mb: 2 }}>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  id="quizText"
                  fullWidth
                  label="Quiz İsmi"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  onChange={handleChange}
                  id="quizImage"
                  fullWidth
                  label="Görsel Linki"
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
            display: "flex",
            flexDirection: "row",
            alignItems: "start",
            justifyContent: "space-evenly",
          }}
        >
          {quizList &&
            quizList.map((quiz) => {
              return (
                <BaseCard
                  quizName={quiz.name}
                  imageUrl={quiz.imageUrl}
                  key={quiz.id}
                  quizId={quiz.id}
                  deleteQuiz={deleteQuiz}
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
          Quiz Ekle
        </Button>
      </Container>
    </>
  );
};
export default AdminPage;
