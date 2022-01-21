import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";

export const QuestionCard = (props) => {
  const { imageUrl, questionText, questionId, answers, deleteQuestion } = props;

  const Demo = styled("div")(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));

  const handleDelete = () => {
    deleteQuestion(questionId);
  }

  return (
    <Card
      sx={{ maxWidth:100, marginLeft: "5px", minWidth: 300, marginTop: 8 }}
    >
      <CardMedia component="img" height="140" image={imageUrl} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {questionText}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={12}>
            <Demo>
              <List>
                {answers &&
                  answers.map((answer, i) => {
                    return (
                      <ListItem key={i.toString()}>
                        <ListItemText primary={answer.text} />
                      </ListItem>
                    );
                  })}
              </List>
            </Demo>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={handleDelete}>
          Sil
        </Button>
      </CardActions>
    </Card>
  );
};
export default QuestionCard;
