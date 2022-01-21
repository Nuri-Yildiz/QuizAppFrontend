import React from "react";
import { Navigate, useNavigate, Link, useHistory } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const UserQuizCard = (props) => {
  const { imageUrl, quizName, quizId } = props;
  const navigate = useNavigate();

  const getQuizPage = () => {
    navigate("/user-questions", { state: { quizId: quizId } });
  };
  return (
    <Card sx={{ maxWidth: 345, marginLeft: "10px" }}>
      <CardMedia component="img" height="140" image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {quizName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {quizName}sınavını çözmek için sınavı çöz butonuna tıklayınız.
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={getQuizPage}>
          Sınavı Çöz
        </Button>
      </CardActions>
    </Card>
  );
};
export default UserQuizCard;
