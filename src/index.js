import { render } from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import LoginPage from "./app/pages/LoginPage";
import SignUpPage from "./app/pages/SignUpPage";
import AdminPage from "./app/pages/AdminPage";
import QuizPage from "./app/pages/QuizPage";
import UserQuiz from "./app/pages/UserQuiz";
import UserQuestions from "./app/pages/UserQuestions";
import Navbar from "./app/components/Navbar";
import ResultPage from "./app/pages/ResultPage";
import Cookies from 'universal-cookie';

const rootElement = document.getElementById("root");

const cookies = new Cookies();
const role = cookies.get("userRole");
render(
  <BrowserRouter>
    <Navbar></Navbar>

    <Routes>
      <Route path="/" element={<App />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="admin" element={<AdminPage />} />
      <Route path="quiz" element={<QuizPage />} />
      <Route path="user-quiz" element={<UserQuiz />} />
      <Route path="user-questions" element={<UserQuestions />} />
      <Route path="results" element={<ResultPage />} />
    </Routes>
  </BrowserRouter>,
  rootElement
);
