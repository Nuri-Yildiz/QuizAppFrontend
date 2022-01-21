import React from "react";
import { Navigate, useNavigate, Link, useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const BaseCard = (props) => {
  const { imageUrl, quizName, quizId, deleteQuiz } = props;
  const navigate = useNavigate();

  const getQuizPage = () => {
    navigate("/quiz", { state: { quizId: quizId } });
  };

  const handleDelete = () => {
    deleteQuiz(quizId)
  }
  return (
    <Card sx={{ maxWidth: 345, marginLeft: "10px" }}>
      <CardMedia component="img" height="140" image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {quizName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {quizName} sınavını düzenlemek ve silmek için gerekli butonlara
          tıklayınız.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={getQuizPage}>
          Düzenle
        </Button>
        <Button size="small" onClick={handleDelete}>Sil</Button>
      </CardActions>
    </Card>
  );
};
export default BaseCard;
