import axios from "axios";

export const signup = (body) => {
  return axios.post("/api/user/register", body);
};

export const login = (body , config) => {
  return axios.post("/api/login",body,config)

}

export const deleteAxiosDefaultHeaders = () => {
  delete axios.defaults.headers["Authorization"]
}

export const setAuthorizationHeader = (token , isLoggedIn) => {

  let headers = {
          "Content-type": "application/json; charset=UTF-8",
          "Authorization": 'Bearer ' + token
   };

  if(isLoggedIn){
    axios.defaults.headers = headers;
    
  }else{
    delete axios.defaults.headers["Authorization"]
  }
}

export const getUserByEmail = (email) => {
  return axios.get(`/api/user/${email}`)
}

export const getQuiz = () => {
  return axios.get("/api/quiz/getQuiz");
};
export const getQuestions = (quizId) => {
  return axios.get(`/api/question/${quizId}`);
};

export const saveQuestion = (body) => {
  return axios.post("/api/question/addQuestion", body);
};

export const saveAnswers = (body) => {
  return axios.post("/api/answers", body);
};

export const deleteQuestion = (questionId) => {
  return axios.delete(`api/question/${questionId}`);
};

export const addQuiz = (body) => {
  return axios.post("api/quiz/addQuiz", body);
};
export const deleteQuiz = (quizId) => {
  return axios.delete(`api/quiz/${quizId}`);
};

export const getResultList = () => {
  return axios.get("/api/results");
};

export const saveResult = (body) => {
  return axios.post("/api/results", body);
};

export default {
  signup,
  getQuiz,
  login,
  getQuestions,
  saveQuestion,
  saveAnswers,
  deleteQuestion,
  setAuthorizationHeader,
  addQuiz,
  deleteQuiz,
  getResultList,
  saveResult
};
